import { Component, OnInit, inject, CUSTOM_ELEMENTS_SCHEMA, effect, signal, AfterViewInit } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { Media } from '../../interfaces/media.interface';
import { CommonModule } from '@angular/common';
import { SwiperOptions } from 'swiper/types';
import { SwiperContainer, register } from 'swiper/element/bundle';
// register Swiper custom elements
register();


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {
  

  private _mediaService = inject(MediaService);
  public aMedia: Media[] = [];
  public listAvailable: boolean = false

  swiperElement: SwiperContainer | null = null

  //swiperElement = signal<SwiperContainer | null>(null)

  //oninit
  ngOnInit(): void {
    this.getFilmsList()

    // const swiperElemConstructor = document.querySelector('swiper-container')
    // console.log(swiperElemConstructor);
    // const swiperOptions: SwiperOptions = {
    //   slidesPerView: 2,
    //   breakpoints: {
    //     550: {
    //       slidesPerView: 2
    //     },
    //     800: {
    //       slidesPerView: 3
    //     },
    //     1300: {
    //       slidesPerView: 5
    //     }
    //   }
    // }

    // if(swiperElemConstructor){
    //   Object.assign(swiperElemConstructor!, swiperOptions)
    //   this.swiperElement = swiperElemConstructor as SwiperContainer;
  
    //   if (this.swiperElement) {
    //     this.swiperElement.initialize();
    //   }
    // }else{
    //   console.log("no vieno");
    // }

  
  }

  // ngAfterViewInit(): void {
  //   this.inicializarSwiper();
  // }

  getFilmsList() {
    this._mediaService.getPeliculas().subscribe(
      res => {
        console.log(res);
        this.aMedia = res
        //this.listAvailable = true
        
        if(this.aMedia.length > 0){
          this.listAvailable = true
          this.inicializarSwiper()
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
