import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './help.component.html',
  styleUrl: './help.component.css'
})
export class HelpComponent implements OnInit {

  safeURL: SafeResourceUrl
  videoURL = "https://www.youtube.com/watch?v=R6Mn_yGAzjE"

  public isLoggedIn: boolean = false;
  public mainRole: string = ""

  //video normal: https://www.youtube.com/watch?v=4w_mLk8jvGI

  constructor(private _sanitizer: DomSanitizer,
    private authService: AuthService,
  ) {
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);
  }

  ngOnInit(): void {
    this.authService.checkAuthStatus().subscribe(
      res => {
        this.isLoggedIn = res
        if (this.isLoggedIn) {
          const { ...user } = this.authService.usrActual();

        
          this.mainRole = user.roles[0]
          
        }

      }
    )
  }
}
