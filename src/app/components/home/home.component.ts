import { Component, OnInit, inject, CUSTOM_ELEMENTS_SCHEMA, effect, signal, AfterViewInit } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { Media } from '../../interfaces/media.interface';
import { CommonModule } from '@angular/common';
import { SwiperOptions } from 'swiper/types';
import { SwiperContainer, register } from 'swiper/element/bundle';
import { RouterLink, RouterLinkActive } from '@angular/router';
// register Swiper custom elements
register();


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {


  public aMedia: Media[] = [];
  public aFilms: Media[] = [];
  public aSeries: Media[] = []
  public listAvailable: boolean = false

  swiperElement: SwiperContainer | null = null

  public swiperOptions: SwiperOptions = {
    slidesPerView: 2,
    breakpoints: {
      550: { slidesPerView: 2 },
      800: { slidesPerView: 3 },
      1300: { slidesPerView: 5 }
    }
  };

  //swiperElement = signal<SwiperContainer | null>(null)

  constructor(private _mediaService: MediaService) {

  }

  //oninit
  ngOnInit(): void {
    this.getFilmsList()
    this.getSeriesList()
    this.getAllMedia()

  }

  getFilmsList() {

    const saveFilms = localStorage.getItem('films')

    if (saveFilms) {

      this.aFilms = JSON.parse(saveFilms);

      if (this.aFilms.length > 0) {
        this.listAvailable = true;
        this.inicializarSwiper();
      }

    } else {
      this._mediaService.getPeliculas().subscribe(
        res => {
          this.aFilms = res

          localStorage.setItem('films', JSON.stringify(res));
          if (this.aFilms.length > 0) {

            this.listAvailable = true;
            this.inicializarSwiper();
          }
        }
      );
    }
  }

  getSeriesList() {

    const saveSeries = localStorage.getItem('series')

    if (saveSeries) {

      this.aSeries = JSON.parse(saveSeries);

      if (this.aSeries.length > 0) {
        this.listAvailable = true;
        this.carruselSeries();
      }

    } else {
      this._mediaService.getSeries().subscribe(
        res => {
          this.aSeries = res

          localStorage.setItem('series', JSON.stringify(res));
          if (this.aSeries.length > 0) {

            this.listAvailable = true;
            this.carruselSeries();
          }
        }
      );
    }
  }

  getAllMedia() {
    const saveMedia = localStorage.getItem('media')

    if (saveMedia) {
      this.aMedia = JSON.parse(saveMedia);
      console.log(saveMedia);
      if (this.aMedia.length > 0) {
        console.log(this.aMedia);
        this.listAvailable = true;
        this.carruselActual();
      }
    } else {
      this._mediaService.getAllMedia().subscribe(
        res => {
          this.aMedia = res;

          localStorage.setItem('media', JSON.stringify(res));
          if (this.aMedia.length > 0) {
            console.log(this.aMedia);
            this.listAvailable = true;
            this.carruselActual();
          }
        }
      );
    }
  }

  inicializarSwiper(): void {

    const swiperElemConstructor = document.querySelector('#contFilms');
    if (swiperElemConstructor) {

      Object.assign(swiperElemConstructor, this.swiperOptions);
      const swiperElement = swiperElemConstructor as SwiperContainer;
      if (swiperElement) {
        swiperElement.initialize();
      }
    } else {
      console.log("El elemento swiper-container no se encontró en el DOM.");
    }
  }

  carruselSeries(): void {
    const swiperElemConstructor = document.querySelector('#contSeries');
    if (swiperElemConstructor) {

      Object.assign(swiperElemConstructor, this.swiperOptions);
      const swiperElement = swiperElemConstructor as SwiperContainer;
      if (swiperElement) {
        swiperElement.initialize();
      }
    } else {
      console.log("El elemento swiper-container no se encontró en el DOM.");
    }
  }

  carruselActual(): void {

    const swiperElemConstructor = document.querySelector('#cont24');
    if (swiperElemConstructor) {

      Object.assign(swiperElemConstructor, this.swiperOptions);
      const swiperElement = swiperElemConstructor as SwiperContainer;
      if (swiperElement) {
        swiperElement.initialize();
      }
    } else {
      console.log("El elemento swiper-container no se encontró en el DOM.");
    }
  }




}
