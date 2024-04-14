import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    ToastModule
    
  ],
  providers: [],
  exports: [
    MenubarModule,
    ButtonModule,
    InputTextModule,
    ToastModule
  ]
})
export class PrimeNgModule { }
