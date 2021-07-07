import { ChangeDetectorRef, ViewChild, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AcquistiService } from 'src/app/services/acquisti.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { AcquistiDettaglioComponent } from './acquisti-dettaglio/acquisti-dettaglio.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { Acquisto } from 'src/app/models/acquisto';
import { CommonsService } from 'src/app/services/commons.service';

@Component({
  selector: 'app-acquisti',
  templateUrl: './acquisti.component.html',
  styleUrls: ['./acquisti.component.scss'],
  providers: [MatMomentDateModule],
})
export class AcquistiComponent implements OnInit {
  filterForm: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Acquisto>;
  public listaAcquisti: Acquisto[];
  private index: number = 0;
  length: number;
  pageSize: number = 2;
  pageSizeOptions: number[] = [2, 5, 10, 25, 100];

  constructor(
    private acquistiService: AcquistiService,
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private commons: CommonsService
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      purchaseId: new FormControl(''),
      supplierId: new FormControl(''),
      billDate: new FormControl(''),
    });
    this.getElPagination(this.index, this.pageSize);
  }

  filter(): void {
    if (this.filterForm.valid) {
      this.acquistiService
        .getByFilters(
          this.filterForm.get('purchaseId').value,
          this.filterForm.get('supplierId').value,
          this.filterForm.get('billDate').value
            ? this.commons.fixDate(this.filterForm.get('purchaseDate').value)
            : ''
        )
        .subscribe((res) => {
          this.dataSource = new MatTableDataSource<Acquisto>(res.data);
          this.changeDetectorRef.detectChanges();
          this.dataSource.paginator = this.paginator;
          this.obs = this.dataSource.connect();
        });
    } else {
      this.getAll();
    }
  }

  getAll(): void {
    this.acquistiService.getAcquisti().subscribe((res) => {
      console.log(res.data);
      this.dataSource = new MatTableDataSource<Acquisto>(res.data);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
      // set paginator settings
    });
  }

  openDettaglio(acquisto: Acquisto): void {
    this.dialog.open(AcquistiDettaglioComponent, {
      data: acquisto,
    });
  }

  pageEvent(event: PageEvent): void {
    this.getElPagination(event.pageIndex, event.pageSize);
  }

  getElPagination(index: number, size: number) {
    this.acquistiService.getAcquistiPagination(index, size).subscribe((res) => {
      this.listaAcquisti = res.data.content;
      this.dataSource = new MatTableDataSource<Acquisto>(this.listaAcquisti);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
      console.log('lis', this.listaAcquisti);
    });
  }
}
