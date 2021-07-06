import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import {
  DateRange,
  MatDateRangeSelectionStrategy,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AnalisiService } from 'src/app/services/analisi.service';
import { ProdottiService } from 'src/app/services/prodotti.service';
import { Prodotto } from '../prodotti/prodotti-dettaglio/prodotto';
import { Day } from './day';

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
  itemList: any[] = [];
  filteredItemlist: Observable<any[]>;
  rangeBar = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  rangeLine = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
    item: new FormControl(),
  });

  public barChartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 3,
    scales: {
      xAxes: [{ ticks: { fontColor: 'white' }, gridLines: { display: false } }],
      yAxes: [
        { ticks: { fontColor: 'white' }, gridLines: { color: '#999999' } },
      ],
    },
  };
  public barChartLabels: string[] = [];
  public barChartLegend = false;
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

  public lineChartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 3,
  };
  public lineChartLabels: string[] = [];
  public lineChartLegend = false;
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Quantità' },
    { data: [], label: 'Ricavi' },
  ];

  constructor(
    private analisiService: AnalisiService,
    private prodottiService: ProdottiService
  ) {}

  ngOnInit(): void {
    this.prodottiService.getProdotti().subscribe((res) => {
      res.data.forEach((item: Prodotto) => {
        var sItem = {
          title: item.title,
          asin: item.asin,
        };
        this.itemList.push(sItem);
      });
    });
    this.filteredItemlist = this.rangeLine.get('item').valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    var d = new Date();
    d.setDate(d.getDate() - 7);
    this.searchBar(d.toISOString());
  }

  public searchBar(date?: string): void {
    this.barChartLabels.length = 0;
    this.analisiService
      .getTotQandR(this.fixDate(date || this.rangeBar.get('start').value))
      .subscribe((res) => {
        res.data.forEach((day: Day) => {
          this.barChartLabels.push(day.startDate.split('T')[0]);
          this.barChartData[0].data.push(day.quantitaTot);
          this.barChartData[1].data.push(day.ricaviTot);
        });
      });
  }

  public searchLine(date?: string, asin?: string): void {
    this.lineChartLabels.length = 0;
    this.analisiService
      .getTotQandRperItem(
        this.fixDate(date || this.rangeLine.get('start').value),
        asin || this.rangeLine.get('item').value
      )
      .subscribe((res) => {
        res.data.forEach((day: Day) => {
          console.log(day);
          this.lineChartLabels.push(day.startDate.split('T')[0]);
          this.lineChartData[0].data.push(day.quantitaTot);
          this.lineChartData[1].data.push(day.ricaviTot);
        });
      });
  }

  fixDate(dateToFix: string): string {
    var date = new Date(dateToFix);
    date.setTime(date.getTime() + 2 * 60 * 60 * 1000);

    return date.toISOString().split('T')[0];
  }

  private _filter(value: string): Prodotto[] {
    const filterValue = value.toLowerCase();
    return this.itemList.filter((item) =>
      item.title.toLowerCase().includes(filterValue)
    );
  }
}
