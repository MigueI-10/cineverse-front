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
  aMedia: Media[] = []
  isMaxSkip: boolean = false

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
    this._mediaService.getGenres().subscribe(
      res => {
        console.log(res);
        this.aGeneros = res
      }
    )
  }

  cargarMedia() {
    this._mediaService.filterByQuery(this.filtros).subscribe(
      res => {
        console.log(res);
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
      anyo: this.filtros?.anyo ?? 0,
      episodios: this.filtros?.episodios ?? [],
      duracion: this.filtros?.duracion ?? 0,

    }

    this.isMaxSkip = false
    this.aMedia = []
  }

  onScrolled() {
    if (this.isMaxSkip) return

		this.filtros.skip += this.filtros.limit

		// this.loadDomains2()

    // if (this.maxSkip === null || this.filters.skip < this.maxSkip) {
    //   this.filters.skip += this.filters.limit;
    //   this.searchMedia();
    // }
  }

  public changeFilter() {

    // let {  skip, limit, activo, planes, sort, order, searchTerm } = this.filters

    console.log(this.filtros);
    this.filtros.skip = 0

     this.resetFilters()
     this.cargarMedia()
  }

  // resetFilters(filters?: Partial<Filter>): void {
  // 	this.filters = {
  // 		sort: filters?.sort ?? 'dominio',
  // 		order: filters?.order ?? -1,
  // 		limit: filters?.limit ?? 30,
  // 		skip: filters?.skip ?? 0,
  // 		activo: filters?.activo ?? [],
  //     planes: filters?.planes ?? [],
  //     searchTerm: filters?.searchTerm ?? ''
  // 	}

  //   this.isMaxSkip = false
  // 	this.domains = []
  // }


}
