import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import {
  DateRange,
  MatDateRangeSelectionStrategy,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AnalisiService } from 'src/app/services/analisi.service';
import { CommonsService } from 'src/app/services/commons.service';
import { ProdottiService } from 'src/app/services/prodotti.service';
import { Prodotto } from '../../models/prodotto';
import { Day } from '../../models/day';
import { BaseResponse } from 'src/app/models/spring-response';
import { formatDate } from '@angular/common';

@Injectable()
export class FiveDayRangeSelectionStrategy<D>
  implements MatDateRangeSelectionStrategy<D>
{
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this._createFiveDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createFiveDayRange(activeDate);
  }

  private _createFiveDayRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, -3);
      const end = this._dateAdapter.addCalendarDays(date, 3);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}

@Component({
  selector: 'app-analisi',
  templateUrl: './analisi.component.html',
  styleUrls: ['./analisi.component.scss'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: FiveDayRangeSelectionStrategy,
    },
  ],
})
export class AnalisiComponent implements OnInit {
  // Gestione exp panel
  isOpen: boolean;

  // Fuck
  latestAsin: string;

  // Filtro autocomplete
  itemList: any[] = [];
  filteredItemlist: Observable<any[]>;

  //Form
  rangeBar = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  rangeLine = new FormGroup({
    start: new FormControl('', [Validators.required]),
    end: new FormControl(),
    item: new FormControl('', [Validators.required]),
  });

  //Common chart
  public chartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 3.1,
    scales: {
      xAxes: [{ ticks: { fontColor: 'white' }, gridLines: { display: false } }],
      yAxes: [
        {
          ticks: { fontColor: 'white', beginAtZero: true },
          gridLines: { color: '#999999' },
        },
      ],
    },
  };
  public chartLegend: boolean = false;

  //Bar Chart
  public barChartLabels: string[] = [];
  public barChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Quantità',
      backgroundColor: '#7B1FA2',
      hoverBackgroundColor: '#805194',
    },
    {
      data: [],
      label: 'Ricavi',
      backgroundColor: '#69F0AE',
      hoverBackgroundColor: '#b8f2d6',
    },
  ];

  //Line Chart
  public lineChartLabels: string[] = [];
  public lineChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Quantità',
      fill: false,
      borderColor: '#7B1FA2',
      pointBackgroundColor: '#7B1FA2',
    },
    {
      data: [],
      label: 'Ricavi',
      fill: false,
      borderColor: '#69F0AE',
      pointBackgroundColor: '#69F0AE',
    },
  ];

  constructor(
    private analisiService: AnalisiService,
    private prodottiService: ProdottiService,
    private commons: CommonsService
  ) {}

  //Inizializzazione
  ngOnInit(): void {
    // Inizializzazione grafico a barre
    var d = new Date();
    d.setDate(d.getDate() - 6);
    this.rangeBar.get('start').setValue(d);
    this.rangeBar.get('end').setValue(new Date());
    this.searchBar(d.toISOString());

    //Prendi prodotti per autocomplete
    this.prodottiService
      .getProdotti()
      .subscribe((res: BaseResponse<Prodotto[]>) => {
        res.data.forEach((item: Prodotto) => {
          var sItem = {
            title: item.title,
            asin: item.asin,
          };
          this.itemList.push(sItem);
        });
        //Inizializzazione grafico a linee
        this.rangeLine.get('item').setValue(this.itemList[0].title);
        this.rangeLine.get('start').setValue(d);
        this.rangeLine.get('end').setValue(new Date());
        this.searchLine(d.toISOString(), this.itemList[0].asin);
      });
    // Funzione per autocomplete
    this.filteredItemlist = this.rangeLine.get('item').valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  // Ricerca grafico a barre
  public searchBar(date?: string): void {
    this.analisiService
      .getTotQandR(
        this.commons.fixDate(date || this.rangeBar.get('start').value)
      )
      .subscribe((res: BaseResponse<Day[]>) => {
        // Reset
        this.barChartLabels = [];
        this.barChartData[0].data = [];
        this.barChartData[1].data = [];

        //Aggiunta dati
        res.data.forEach((day: Day) => {
          this.barChartLabels.push(
            formatDate(day.startDate, 'dd/MM/yyyy', 'it')
          );
          this.barChartData[0].data.push(day.quantitaTot);
          this.barChartData[1].data.push(day.ricaviTot);
        });
      });
    console.log(this.barChartData[0].data);
  }

  //Ricerca grafico a linee
  public searchLine(date?: string, asin?: string): void {
    if (asin) {
      this.latestAsin = asin;
    }
    if (this.rangeLine.get('start').valid && this.latestAsin) {
      this.analisiService
        .getTotQandRperItem(
          this.commons.fixDate(date || this.rangeLine.get('start').value),
          this.latestAsin
        )
        .subscribe((res) => {
          //Reset
          this.lineChartLabels = [];
          this.lineChartData[0].data = [];
          this.lineChartData[1].data = [];

          //Aggiunta dati
          res.data.forEach((day: Day) => {
            this.lineChartLabels.push(
              formatDate(day.startDate, 'dd/MM/yyyy', 'it')
            );
            this.lineChartData[0].data.push(day.quantitaTot);
            this.lineChartData[1].data.push(day.ricaviTot);
          });
        });
    }
  }

  // Funzione di filtro per l'autocomplete
  private _filter(value: string): Prodotto[] {
    const filterValue = value.toLowerCase();
    return this.itemList.filter((item) =>
      item.title.toLowerCase().includes(filterValue)
    );
  }
}
