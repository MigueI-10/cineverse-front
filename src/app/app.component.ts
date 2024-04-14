import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/auth/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cineverse-frontend';

  
}
