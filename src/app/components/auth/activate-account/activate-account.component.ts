import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../../../prime-ng/prime-ng/prime-ng.module';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [PrimeNgModule, CommonModule, TranslateModule],
  providers: [MessageService],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.css'
})
export class ActivateAccountComponent implements OnInit{

  public accActivated :boolean = false
  private goodCheck = "Cuenta activada exitosamente"
  private badCheck = "Error al activar la cuenta"

  constructor(private router: Router,
    private activeRouter: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService
  ){}

  private token: string = ""

  ngOnInit(): void {
    this.activeRouter.params.subscribe(
      params => {
        this.token = params['token'];
        if (this.token) {
          this.activateAccount();
        }
      }
    );
  }

  activateAccount(){
    this.authService.activateAccount(this.token).subscribe({
      next:(res) => {
        let cadena = res.message
        if(cadena === this.goodCheck){

          this.success(`Cuenta activada correctamente.`) 
          this.accActivated = true
          setTimeout(() => {
            this.router.navigateByUrl('/login')
          }, 3000);

        }else if(cadena === this.badCheck){
          this.errorToast(cadena)
          this.errorToast('No modifiques el token de la url...')
          
          setTimeout(() => {
            this.router.navigateByUrl('/login')
          }, 3000);
        }
      },
      error:(message) =>{
        this.errorToast(message)
        
       
      }  
    })
  }

  //mensajes con estilo
  success(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
  }

  errorToast(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
  }




}
