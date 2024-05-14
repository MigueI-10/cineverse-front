import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../../material/material/material.module';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslateModule, MaterialModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
