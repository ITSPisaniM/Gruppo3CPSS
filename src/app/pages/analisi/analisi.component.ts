import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  // Filtro autocomplete
  itemList: any[] = [];
  filteredItemlist: Observable<any[]>;

  //Form
  rangeBar = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  rangeLine = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
    item: new FormControl(),
  });

  //Common chart
  public chartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 3,
    scales: {
      xAxes: [{ ticks: { fontColor: 'white' }, gridLines: { display: false } }],
      yAxes: [
        { ticks: { fontColor: 'white' }, gridLines: { color: '#999999' } },
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
      hoverBackgroundColor: '#805194',
      borderColor: '#7B1FA2',
    },
    {
      data: [],
      label: 'Ricavi',
      fill: false,
      hoverBackgroundColor: '#b8f2d6',
      borderColor: '#69F0AE',
    },
  ];

  constructor(
    private analisiService: AnalisiService,
    private prodottiService: ProdottiService,
    private commons: CommonsService
  ) {}

  //Inizializzazione
  ngOnInit(): void {
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
        this.searchLine(d.toISOString(), this.itemList[0].asin);
      });
    // Funzione per autocomplete
    this.filteredItemlist = this.rangeLine.get('item').valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    // Inizializzazione grafico a barre
    var d = new Date();
    d.setDate(d.getDate() - 7);
    this.searchBar(d.toISOString());
  }

  // Ricerca grafico a barre
  public searchBar(date?: string): void {
    // Reset
    this.barChartLabels.length = 0;
    this.barChartData[0].data.length = 0;
    this.barChartData[1].data.length = 0;

    this.analisiService
      .getTotQandR(
        this.commons.fixDate(date || this.rangeBar.get('start').value)
      )
      .subscribe((res: BaseResponse<Day[]>) => {
        res.data.forEach((day: Day) => {
          this.barChartLabels.push(day.startDate.split('T')[0]);
          this.barChartData[0].data.push(day.quantitaTot);
          this.barChartData[1].data.push(day.ricaviTot);
        });
      });
    console.log(this.barChartData[0].data);
  }

  //Ricerca grafico a linee
  public searchLine(date?: string, asin?: string): void {
    //Reset
    this.lineChartLabels.length = 0;
    this.lineChartData[0].data.length = 0;
    this.lineChartData[1].data.length = 0;

    this.analisiService
      .getTotQandRperItem(
        this.commons.fixDate(date || this.rangeLine.get('start').value),
        asin || this.rangeLine.get('item').value
      )
      .subscribe((res) => {
        res.data.forEach((day: Day) => {
          this.lineChartLabels.push(day.startDate.split('T')[0]);
          this.lineChartData[0].data.push(day.quantitaTot);
          this.lineChartData[1].data.push(day.ricaviTot);
        });
      });
  }

  // Funzione di filtro per l'autocomplete
  private _filter(value: string): Prodotto[] {
    const filterValue = value.toLowerCase();
    return this.itemList.filter((item) =>
      item.title.toLowerCase().includes(filterValue)
    );
  }
}
