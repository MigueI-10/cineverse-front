import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../../prime-ng/prime-ng/prime-ng.module';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public menuItems: MenuItem[] | undefined;
  public userItems: MenuItem[] | undefined;

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: '/'
      },
      {
        label: 'Productos',
        icon: 'pi pi-briefcase',
        routerLink: '/productos'
      },
      {
        label: 'Servicios',
        icon: 'pi pi-cog',
        routerLink: '/servicios'
      },
      {
        label: 'Contacto',
        icon: 'pi pi-envelope',
        routerLink: '/contacto'
      }
    ];

    this.userItems = [
      {
          label:'Users',
          icon:'pi pi-fw pi-user',
          items:[
              {
                  label:'New',
                  icon:'pi pi-fw pi-user-plus',
              },
              {
                  label:'Delete',
                  icon:'pi pi-fw pi-user-minus',
              },
              {
                  label:'Search',
                  icon:'pi pi-fw pi-users',
                  items:[
                  {
                      label:'Filter',
                      icon:'pi pi-fw pi-filter',
                      items:[
                          {
                              label:'Print',
                              icon:'pi pi-fw pi-print'
                          }
                      ]
                  },
                  {
                      icon:'pi pi-fw pi-bars',
                      label:'List'
                  }
                  ]
              }
          ]
      },
  ];
  }


}
