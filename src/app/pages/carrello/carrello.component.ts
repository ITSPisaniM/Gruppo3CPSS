import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.scss']
})
export class CarrelloComponent implements OnInit {

  animal: string;
  name: string;

  constructor() { }

  ngOnInit(): void {
  }

}
