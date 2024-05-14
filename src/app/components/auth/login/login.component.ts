import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { PrimeNgModule } from '../../../prime-ng/prime-ng/prime-ng.module';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MediaService } from '../../../services/media.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, PrimeNgModule, CommonModule, TranslateModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  //declaramos formgroup
  public form !: FormGroup 

  //constructor con los servicios necesarios
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private _mediaService: MediaService
  ) { }


  ngOnInit() {
    
    //validaciones del formulario
    this.form = this.fb.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],

    })
  }

  //metodo para hacer login si el formulario es valido, si falla salta una alerta
  login() {
    let lang = this._mediaService.getSelectedLanguage()

    if (this.form.valid) {
      
      const {email, password} = this.form.value
      this.authService.login(email, password).subscribe({
        next:() => this.router.navigateByUrl('/home'),
        error:(message) =>{
          
          if(message !== undefined){
            this.errorToast(message)
          }else{
            if(lang === "en"){
              this.errorToast('The server isnt available. Try again later')
            }else{
              
              this.errorToast('El servidor no está disponible. Pruebe de nuevo más tarde')
            }
          }
        }  
      })

    }
  }

  get email() {
    return this.form.get('email') as FormControl
  }
  get password() {
    return this.form.get('password') as FormControl
  }

  //mensajes con estilo
  success(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  errorToast(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
