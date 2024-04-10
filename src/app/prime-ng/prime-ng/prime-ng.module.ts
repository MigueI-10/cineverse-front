import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MenubarModule,
    ButtonModule,
    InputTextModule
    
  ],
  exports: [
    MenubarModule,
    ButtonModule,
    InputTextModule
  ]
})
export class PrimeNgModule { }
