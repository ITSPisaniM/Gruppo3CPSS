import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ProdottiService } from 'src/app/services/prodotti.service';
import { Output, EventEmitter } from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';

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
    private mat: MatPaginatorModule
  ) { }

  //emitter per paginator....SIZE
  @Output() pageSizeEvent = new EventEmitter<number>()
  sendPageSize(value: number) {
    this.pageSizeEvent.emit(value);
    console.log("AAAAAAAAAAAAAAAAAAAA1: " + this.pageSize);
  }
   //emitter per paginator...INDEX
   @Output() indexEvent = new EventEmitter<number>()
   sendindexPage(value: number) {
     this.indexEvent.emit(value);
   }


   getIndex(){
    
   }

  pageEvent:PageEvent;

  ngOnInit(): void {
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}

