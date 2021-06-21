import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Observable } from 'rxjs';
import { OrdiniService } from 'src/app/services/ordini.service';

export interface Card {
  title: string;
  subtitle: string;
  text: string;
  items: Item[];
}

export interface Item {
  title: string;
  text: string;
}

const DATA: Card[] = [
  {
    title: 'Shiba Inu 1',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.',
    items: [
      {
        title: 'Ciao',
        text: 'come stai',
      },
      {
        title: 'Ciao2',
        text: 'come stai2',
      },
    ],
  },
  {
    title: 'Shiba Inu 1',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.',
    items: [
      {
        title: 'Ciao',
        text: 'come stai',
      },
      {
        title: 'Ciao2',
        text: 'come stai2',
      },
    ],
  },
  {
    title: 'Shiba Inu 1',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.',
    items: [
      {
        title: 'Ciao',
        text: 'come stai',
      },
      {
        title: 'Ciao2',
        text: 'come stai2',
      },
    ],
  },
  {
    title: 'Shiba Inu 1',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.',
    items: [
      {
        title: 'Ciao',
        text: 'come stai',
      },
      {
        title: 'Ciao2',
        text: 'come stai2',
      },
    ],
  },
  {
    title: 'Shiba Inu 1',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.',
    items: [
      {
        title: 'Ciao',
        text: 'come stai',
      },
      {
        title: 'Ciao2',
        text: 'come stai2',
      },
    ],
  },
  {
    title: 'Shiba Inu 1',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.',
    items: [
      {
        title: 'Ciao',
        text: 'come stai',
      },
      {
        title: 'Ciao2',
        text: 'come stai2',
      },
    ],
  },

  {
    title: 'Shiba Inu 1',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.',
    items: [
      {
        title: 'Ciao',
        text: 'come stai',
      },
      {
        title: 'Ciao2',
        text: 'come stai2',
      },
    ],
  },
  {
    title: 'Shiba Inu 1',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.',
    items: [
      {
        title: 'Ciao',
        text: 'come stai',
      },
      {
        title: 'Ciao2',
        text: 'come stai2',
      },
    ],
  },
  {
    title: 'Shiba Inu 1',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.',
    items: [
      {
        title: 'Ciao',
        text: 'come stai',
      },
      {
        title: 'Ciao2',
        text: 'come stai2',
      },
    ],
  },
];

@Component({
  selector: 'app-ordini',
  templateUrl: './ordini.component.html',
  styleUrls: ['./ordini.component.scss'],
})
export class OrdiniComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Card> = new MatTableDataSource<Card>(DATA);
  response: any;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ordiniService: OrdiniService
  ) {}

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
    this.ordiniService.getOrdini().subscribe((res) => (this.response = res));
    console.log(this.response);
  }
  ngOnDestroy(): void {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}
