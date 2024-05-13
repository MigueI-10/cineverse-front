import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../prime-ng/prime-ng/prime-ng.module';
import { MaterialModule } from '../../../material/material/material.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MediaService } from '../../../services/media.service';
import { Subject, Subscription, debounceTime, switchMap } from 'rxjs';
import { Media } from '../../../interfaces';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Message } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-media-search',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, MaterialModule, ReactiveFormsModule, InfiniteScrollModule,  RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './media-search.component.html',
  styleUrl: './media-search.component.css'
})
export class MediaSearchComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>()
  private debouncerSubscription?: Subscription;

  public searchInput = new FormControl('');
  public filters: { search: string, limit: number, skip: number } = {
    search: '',
    limit: 10,
    skip: 0
  }
  public aMedia: Media[] = []
  public maxSkip: number | null = null;
  // public mensaje : Message[] = []
  public showMessage = false
  public noFoundImage = ""

  constructor(private _mediaService: MediaService) {

  }


  ngOnInit(): void {
    // this.mensaje = [{ severity: 'info', summary: 'Info', detail: 'No hay resultados para este término de búsqueda' }];
    this.noFoundImage = this._mediaService.getNoFound()

    this.debouncerSubscription = this.debouncer
      .pipe(
        debounceTime(250), //esta 1 segundo esperando
        switchMap(value => this.sendValueBackend(value))
      )
      .subscribe(value => {
        if (value !== null) {
          if(value.length === 0) this.showMessage = true
          this.aMedia = this.aMedia.concat(value)

          if (value.length < this.filters.limit) {
            this.maxSkip = this.filters.skip;
          }
        }else{
          this.showMessage = false
        }
      })
  }
  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe()
  }


  searchMedia() {

    const value: string = this.searchInput.value || '';

    if (value == "") {
      this.aMedia = [];
      this.filters.skip = 0;
      this.maxSkip = null;
    }

    if (this.filters.search !== value) {
      this.aMedia = [];
      this.filters.skip = 0;
      this.maxSkip = null;
    }

    this.filters.search = value;

    this.debouncer.next(value);
  }

  loadMoreResults() {
    if (this.maxSkip === null || this.filters.skip < this.maxSkip) {
      this.filters.skip += this.filters.limit;
      this.searchMedia();
    }
  }

  sendValueBackend(value: string) {

    this.filters.search = value
    return this._mediaService.getSearchResults(this.filters)
  }


}
