import { Component, OnInit, inject } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { Media } from '../../interfaces/media.interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  private _mediaService = inject(MediaService);
  public aMedia: Media[] = [];


  ngOnInit(): void {
    this.getFilmsList()
  }

  getFilmsList(){
    this._mediaService.getPeliculas().subscribe(
      res => {
        console.log(res);
        this.aMedia = res
      }
    )
  }

  public swipeCoord!: [number, number];
  public swipeTime!: number;

  startSwipe(event: TouchEvent) {
    this.swipeCoord = [event.changedTouches[0].pageX, event.changedTouches[0].pageY];
    this.swipeTime = new Date().getTime();
  }

  endSwipe(event: TouchEvent) {
    const direction = [event.changedTouches[0].pageX - this.swipeCoord[0], event.changedTouches[0].pageY - this.swipeCoord[1]];
    const duration = new Date().getTime() - this.swipeTime;

    if (duration < 1000 && Math.abs(direction[0]) > 30 && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) {
      const slide = direction[0] < 0 ? 'next' : 'previous';
      // add logic here to slide to the next or previous image
    }
  }
  
  

}
