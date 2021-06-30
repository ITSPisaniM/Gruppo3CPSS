import { Component, Input, OnInit } from '@angular/core';
import { ProdottiService } from 'src/app/services/prodotti.service';
import { Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  //properties paginator
  pageSize = 5;
  pageSizeOptions: number[] = [2, 5, 10, 25, 100];

  @Input() root: string;

  constructor(private shared: SharedService) {}

  totalRecords: any;
  //emitter per paginator....SIZE
  @Output() pageSizeEvent = new EventEmitter<number>();
  //emitter per paginator...INDEX
  @Output() indexEvent = new EventEmitter<number>();
  sendPageSize(r: number, i: number) {
    this.pageSizeEvent.emit(r);
    this.indexEvent.emit(i);
  }

  //  sendindexPage(value: number) {
  //    this.indexEvent.emit(value);
  //  }

  ngOnInit(): void {
    this.shared.getNumElementi(this.root).subscribe((res) => {
      console.log(res);
      this.totalRecords = res;
    });
    this.onPageChange(this.pageSize);
  }
  onPageChange(event) {
    this.sendPageSize(event.rows, event.page);
  }
}
