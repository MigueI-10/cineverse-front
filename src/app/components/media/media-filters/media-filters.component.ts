import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from '../../../material/material/material.module';
import { PrimeNgModule } from '../../../prime-ng/prime-ng/prime-ng.module';
import { MediaService } from '../../../services/media.service';
import { Filter } from '../../../interfaces/filter.interface';
import { Media } from '../../../interfaces';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-media-filters',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, MaterialModule, ReactiveFormsModule, InfiniteScrollModule, RouterLink, RouterLinkActive, ReactiveFormsModule, FormsModule, TranslateModule],
  templateUrl: './media-filters.component.html',
  styleUrl: './media-filters.component.css'
})
export class MediaFiltersComponent implements OnInit {

  filtroTipo: boolean = false;
  selectedGenre!: string;
  aGeneros: string[] = [];
  aMedia: Media[] = []
  isMaxSkip: boolean = false
  public showMessage = false

  filtros!: Filter;

  isCollapsed: boolean = true;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  constructor(private _mediaService: MediaService) {

  }

  ngOnInit(): void {

    this.resetFilters()
    this.cargarGeneros()
    //this.cargarMedia()

  }

  cargarGeneros() {

    const saveGenres = localStorage.getItem('genres')

    if (saveGenres) {
      this.aGeneros = JSON.parse(saveGenres);
    }else{
      this._mediaService.getGenres().subscribe(
        res => {
          this.aGeneros = res
          localStorage.setItem('genres', JSON.stringify(res));
        }
      )
    }
  }

  cargarMedia() {
    this._mediaService.filterByQuery(this.filtros).subscribe(
      res => {
        if(res.length > 0){
          this.aMedia = this.aMedia.concat(res)
        }else{
          this.showMessage = true
        }   
      }
    )
  }

  resetFilters() {
    this.filtros = {
      limit: this.filtros?.limit ?? 10,
      skip: this.filtros?.skip ?? 0,
      tipo: this.filtros?.tipo ?? [],
      nota: this.filtros?.nota ?? 0,
      generos: this.filtros?.generos ?? [],
      anyo: this.filtros?.anyo ?? [],
      episodios: this.filtros?.episodios ?? [],
      duracion: this.filtros?.duracion ?? '0',

    }

    this.isMaxSkip = false
    this.aMedia = []
  }

  resetFull(){
    this.filtros = {
      limit: this.filtros?.limit ?? 10,
      skip: this.filtros?.skip ?? 0,
      tipo: [],
      nota:  0,
      generos: [],
      anyo: [],
      episodios: [],
      duracion: 0,

    }
    this.showMessage = false
    this.aMedia = []
  }

  onScrolled() {
    if (this.isMaxSkip) return

		this.filtros.skip += this.filtros.limit

		this.cargarMedia()

  }

  public changeFilter() {

    this.filtros.skip = 0

     this.resetFilters()
     this.cargarMedia()
  }
}
