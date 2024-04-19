import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



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
    ToastModule,
    ConfirmDialogModule
  ]
})
export class PrimeNgModule { }
