import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  filterForm: FormGroup;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ordiniService: OrdiniService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      amazonOrderId: new FormControl(''),
      buyerEmail: new FormControl(''),
      purchaseDate: new FormControl(''),
    });
    this.getAll();
  }

  getAll(): void {
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

  filter(): void {
    if (this.filterForm.valid) {
      this.ordiniService
        .getByFilters(
          this.filterForm.get('amazonOrderId')
            ? this.filterForm.get('amazonOrderId').value
            : null,
          this.filterForm.get('buyerEmail')
            ? this.filterForm.get('buyerEmail').value
            : null,
          this.filterForm.get('purchaseDate') ? this.fixDate() : null
        )
        .subscribe((res) => {
          this.dataSource = new MatTableDataSource<Ordine>(res.data);
          this.changeDetectorRef.detectChanges();
          this.dataSource.paginator = this.paginator;
          this.obs = this.dataSource.connect();
        });
    } else {
      this.getAll();
    }
  }

  fixDate(): string {
    var date = new Date(this.filterForm.get('purchaseDate').value);
    date.setTime(date.getTime() + 2 * 60 * 60 * 1000);

    return date.toISOString().split('T')[0];
  }

  openDettaglio(): void {}
}
