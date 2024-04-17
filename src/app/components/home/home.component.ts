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
  public aSeries: Media[] = []
  public listAvailable: boolean = false

  swiperElement: SwiperContainer | null = null

  //swiperElement = signal<SwiperContainer | null>(null)

  constructor(private _mediaService :MediaService){

  }

  //oninit
  ngOnInit(): void {
    this.getFilmsList()

    this.getSeriesList()


  }

  // ngAfterViewInit(): void {
  //   this.inicializarSwiper();
  // }

  getFilmsList() {
    this._mediaService.getPeliculas().subscribe(
      res => {

        this.aMedia = res
        //this.listAvailable = true
        
        if (this.aMedia.length > 0) {
          console.log(this.aSeries);
          this.listAvailable = true
          this.inicializarSwiper()
        }
      }
    )
  }

  getSeriesList(){
    this._mediaService.getSeries().subscribe(
      res => {

        this.aSeries = res
        //this.listAvailable = true

        if (this.aSeries.length > 0) {

          console.log(this.aSeries);
          this.listAvailable = true
          // this.inicializarSwiper()
        }
      }
    )
  }

  inicializarSwiper(): void {

    const swiperElemConstructor = document.querySelector('swiper-container');
    if (swiperElemConstructor) {
      const swiperOptions: SwiperOptions = {
        slidesPerView: 2,
        breakpoints: {
          550: { slidesPerView: 2 },
          800: { slidesPerView: 3 },
          1300: { slidesPerView: 5 }
        }
      };
      Object.assign(swiperElemConstructor, swiperOptions);
      const swiperElement = swiperElemConstructor as SwiperContainer;
      if (swiperElement) {
        swiperElement.initialize();
      }
    } else {
      console.log("El elemento swiper-container no se encontró en el DOM.");
    }
  }




}
