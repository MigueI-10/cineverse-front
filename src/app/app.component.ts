import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/auth/login/login.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule, LoginComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cineverse-frontend';

  constructor(private translate: TranslateService){
    const savedLanguage = localStorage.getItem('selectedLang');
    if (savedLanguage) {
      this.translate.use(savedLanguage);
    } else {
      
      this.translate.setDefaultLang('es');
      localStorage.setItem('selectedLang', 'es');
    }
  }
}
