import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterOutlet],
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {

}
