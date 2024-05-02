import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from '../../../material/material/material.module';
import { PrimeNgModule } from '../../../prime-ng/prime-ng/prime-ng.module';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-media-filters',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, MaterialModule, ReactiveFormsModule, InfiniteScrollModule,  RouterLink, RouterLinkActive, ReactiveFormsModule, FormsModule],
  templateUrl: './media-filters.component.html',
  styleUrl: './media-filters.component.css'
})
export class MediaFiltersComponent implements OnInit{

  filtroTipo: boolean = false;
  cities!: City[];

  selectedCities!: City[];
  constructor(){

  }

  ngOnInit(): void {
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
  console.log(this.cities);
  }


}
