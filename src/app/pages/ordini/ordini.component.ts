import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Observable } from 'rxjs';
import { OrdiniService } from 'src/app/services/ordini.service';

export interface Ordine {
  amazonOrderId: string;
  buyerEmail: string;
  purchaseDate: Date;
  ordersItems: Prodotto[];
}

export interface Prodotto {
  title: string;
  asin: string;
}

@Component({
  selector: 'app-ordini',
  templateUrl: './ordini.component.html',
  styleUrls: ['./ordini.component.scss'],
})
export class OrdiniComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Ordine>;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ordiniService: OrdiniService
  ) {}

  ngOnInit(): void {
    this.ordiniService.getOrdini().subscribe((res) => {
      console.log(res.data);
      this.dataSource = new MatTableDataSource<Ordine>(res.data);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    });
  }

  ngOnDestroy(): void {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}
