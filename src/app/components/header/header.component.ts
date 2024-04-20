import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../../prime-ng/prime-ng/prime-ng.module';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink, RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  public mainRole: string = ""


  constructor(
    private authService: AuthService,
    private router: Router,
  ) {

  }


  public nomUsuario: string = '';
  public isLoggedIn: boolean = false;

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {

      const { ...user } = this.authService.usrActual();

      this.nomUsuario = user.name


      this.isLoggedIn = isLoggedIn;
    });

    //chequeamos el status, porque al hacer reload de la pagina se pierden esos dtatos
    this.authService.checkAuthStatus().subscribe(
      res => {
        this.isLoggedIn = res
        console.log(this.isLoggedIn);
        if (this.isLoggedIn) {
          const { ...user } = this.authService.usrActual();

          this.nomUsuario = user.name

          this.mainRole = user.roles[0]

          console.log(this.authService.authStatus());
          console.log(this.authService.usrActual());
        }

      }
    )

    
  }

  onLogout() {
    this.nomUsuario = ""
    this.isLoggedIn = false
    this.mainRole = ""
    this.authService.logout();
    this.router.navigateByUrl('/home')
  }


}
