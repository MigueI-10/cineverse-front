import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PrimeNgModule } from '../../../prime-ng/prime-ng/prime-ng.module';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, PrimeNgModule, CommonModule, TranslateModule],
  providers: [MessageService],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit{

  public form !: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
    
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
    }, { validators: this.checkBothEmailSame })
  }

  

  checkBothEmailSame(formGroup: FormGroup) {

    const email = formGroup.get('email')?.value
    const confirmEmail = formGroup.get('confirmEmail')?.value

    // return email === confirmEmail ? null : { notSameEmail: true }
    if (email !== confirmEmail) {
      formGroup.get('confirmEmail')?.setErrors({ notSameEmail: true });
    } else {
      formGroup.get('confirmEmail')?.setErrors(null);
    }

  }

  submitChange(){
    if(this.form.valid){
      
      let lang = localStorage.getItem('selectedLang')

      const {email} = this.form.value

      this.authService.sendEmailChangePassword(email).subscribe({
        next:(res) => {
          if(res === true){
            if(lang === "en"){
              this.success(`Check the email ${email} to change your password.`) 
            }else{
              this.success(`Comprueba la direccion ${email} para cambiar tu contraseña.`) 
            }
            
            setTimeout(() => {
              this.router.navigateByUrl('/login')
            }, 1200);
          }
        },
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

  get confirmEmail() {
    return this.form.get('confirmEmail') as FormControl
  }

  //mensajes con estilo
  success(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
  }

  errorToast(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
  }
}
