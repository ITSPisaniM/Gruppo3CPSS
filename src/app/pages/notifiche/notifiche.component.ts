import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notifica } from 'src/app/models/notifica';
import { Prodotto } from 'src/app/models/prodotto';

@Component({
  selector: 'app-notifiche',
  templateUrl: './notifiche.component.html',
  styleUrls: ['./notifiche.component.scss']
})
export class NotificheComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public notifiche: Notifica[]) { }

  ngOnInit(): void {
  }

}
