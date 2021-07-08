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
import { Page } from 'src/app/models/page';

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
  length: number;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    private acquistiService: AcquistiService,
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private commons: CommonsService
  ) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      purchaseId: new FormControl(''),
      supplierId: new FormControl(''),
      billDate: new FormControl(''),
    });
    this.acquistiService.getAcquistiPagination(0, this.pageSize).subscribe((res: Page<Acquisto[]>) => {
      this.populateTable(res.data.content, res.data.totalElements)
    })
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
        .subscribe((res: Page<Acquisto[]>) => {
          this.populateTable(res.data.content, res.data.totalElements)
        });
    } else {
      this.acquistiService.getAcquistiPagination(0, this.pageSize).subscribe((res: Page<Acquisto[]>) => {
        this.populateTable(res.data.content, res.data.totalElements)
      })
    }
  }


  openDettaglio(acquisto: Acquisto): void {
    this.dialog.open(AcquistiDettaglioComponent, {
      data: acquisto,
    });
  }

  pageEvent(event: PageEvent): void {
    this.acquistiService.getAcquistiPagination(event.pageIndex, event.pageSize).subscribe((res:Page<Acquisto[]>)=>{
      this.populateTable(res.data.content,res.data.totalElements)
    })
  }

  populateTable(acquisti: Acquisto[], elementiTotali: number): void {
    this.dataSource = new MatTableDataSource<Acquisto>(acquisti);
    this.changeDetectorRef.detectChanges();
    this.obs = this.dataSource.connect();
    this.length = elementiTotali;
  }
}
