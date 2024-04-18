import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Media } from '../../../interfaces';
import { MediaService } from '../../../services/media.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './media.component.html',
  styleUrl: './media.component.css'
})
export class MediaComponent implements OnInit {

  private idMedia: string = ""
  public  objMedia!: Media 


  constructor(private _activatedRouter: ActivatedRoute, private _mediaService :MediaService) {
    
  }

  ngOnInit(): void {
    this._activatedRouter.params.subscribe(
      params => {
        this.idMedia = params['id'];
        if (this.idMedia) {
          this.cargarMedia();
        }
      }
    );
  }


  cargarMedia(){
    this._mediaService.getMediaById(this.idMedia).subscribe(
      res => {
        console.log(res);
        this.objMedia = res
      }
    )
  }

}
