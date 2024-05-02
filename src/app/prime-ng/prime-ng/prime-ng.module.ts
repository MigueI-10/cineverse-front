import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { PanelModule } from 'primeng/panel';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MultiSelectModule } from 'primeng/multiselect';





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
    ConfirmDialogModule,
    DropdownModule, 
    CardModule,
    MessagesModule, 
    CarouselModule, 
    DialogModule,
    RatingModule,
    PanelModule,
    ToggleButtonModule,
    MultiSelectModule
  ]
})
export class PrimeNgModule { }
