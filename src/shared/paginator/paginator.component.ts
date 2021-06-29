import { Component, Input, OnInit } from '@angular/core';
import { ProdottiService } from 'src/app/services/prodotti.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  //properties paginator
  pageSize = 5;
  pageSizeOptions: number[] = [2, 5, 10, 25, 100];

  constructor(
    private prod:ProdottiService
  ) { }

  totalRecords:any;
  //emitter per paginator....SIZE
  @Output() pageSizeEvent = new EventEmitter<number>()

  sendPageSize(value: number) {
    this.pageSizeEvent.emit(value);    
  }

   //emitter per paginator...INDEX
   @Output() indexEvent = new EventEmitter<number>()
   sendindexPage(value: number) {
     this.indexEvent.emit(value);
   }

  ngOnInit(): void {    
    this.onPageChange(this.pageSize);
  }
  onPageChange(event){
    this.sendPageSize(event.rows);
    
  }

}

