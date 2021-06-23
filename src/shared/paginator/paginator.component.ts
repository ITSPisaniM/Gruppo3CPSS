import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ProdottiService } from 'src/app/services/prodotti.service';
import { Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  //properties paginator
  length = 100;
  pageSize = 2;
  pageSizeOptions: number[] = [2, 5, 10, 25, 100];

  constructor(
    private prod:ProdottiService,
  ) { }

  // @Input()
  // pageIndex:number;
  //emitter per paginator
  @Output() pageSizeEvent = new EventEmitter<number>()
  sendPageSize(value: number) {
    this.pageSizeEvent.emit(value);
  }



  ngOnInit(): void {
  }
  pageEvent: Observable<PageEvent>;
  paginatorProperties: PageEvent;

  event(){
    this.pageEvent.subscribe((res)=>{
      this.sendPageSize(res.pageIndex);
    })
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}

