import { Component, OnInit } from '@angular/core';
import { Notifica } from 'src/app/models/notifica';
import { Prodotto } from 'src/app/models/prodotto';

@Component({
  selector: 'app-notifiche',
  templateUrl: './notifiche.component.html',
  styleUrls: ['./notifiche.component.scss']
})
export class NotificheComponent implements OnInit {

  constructor() { }

  notifiche: Notifica[];

  ngOnInit(): void {
  }

}
