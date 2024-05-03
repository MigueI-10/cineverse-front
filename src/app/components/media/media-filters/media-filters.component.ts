import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from '../../../material/material/material.module';
import { PrimeNgModule } from '../../../prime-ng/prime-ng/prime-ng.module';
import { MediaService } from '../../../services/media.service';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-media-filters',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, MaterialModule, ReactiveFormsModule, InfiniteScrollModule, RouterLink, RouterLinkActive, ReactiveFormsModule, FormsModule],
  templateUrl: './media-filters.component.html',
  styleUrl: './media-filters.component.css'
})
export class MediaFiltersComponent implements OnInit {

  filtroTipo: boolean = false;
  selectedGenre!: string;
  aGeneros: string[] = [];

  isCollapsed: boolean = true;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  constructor(private _mediaService: MediaService) {

  }

  ngOnInit(): void {

    this.cargarGeneros()

  }

  cargarGeneros(){
    this._mediaService.getGenres().subscribe(
      res => {
        console.log(res);
        this.aGeneros = res
      }
    )
  }


}
