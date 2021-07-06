import { ChangeDetectorRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AcquistiService } from 'src/app/services/acquisti.service';
import { Acquisto } from './Acquisto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { DettaglioComponent } from './dettaglio/dettaglio.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-acquisti',
  templateUrl: './acquisti.component.html',
  styleUrls: ['./acquisti.component.scss'],
  providers:[MatMomentDateModule]
})
export class AcquistiComponent implements OnInit {

  filterForm: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Acquisto>;
  public listaAcquisti;
  private index = 0;
  length: number;
  pageSize: number = 2;
  pageSizeOptions: number[] = [2, 5, 10, 25, 100];

  constructor(
    private acquistiService:AcquistiService,
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder,
  ) { }

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
          this.filterForm.get('billDate').value ? this.fixDate() : ''
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

  fixDate(): string {
    var date = new Date(this.filterForm.get('purchaseDate').value);
    date.setTime(date.getTime() + 2 * 60 * 60 * 1000);

    return date.toISOString().split('T')[0];
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
    this.dialog.open(DettaglioComponent, {
      data: acquisto,
    });
  }

  pageEvent(event: PageEvent): void {
    this.getElPagination(event.pageIndex, event.pageSize);
  }

  getElPagination(index: number, size:number){
    this.acquistiService.getAcquistiPagination(index, size).subscribe((res)=>{
      this.listaAcquisti = res.data.content;
      this.dataSource = new MatTableDataSource<Acquisto>(this.listaAcquisti);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();  
      console.log("lis", this.listaAcquisti);    
    });
  }


}
