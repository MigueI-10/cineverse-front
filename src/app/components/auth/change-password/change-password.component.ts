import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PrimeNgModule } from '../../../prime-ng/prime-ng/prime-ng.module';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, PrimeNgModule, CommonModule],
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
      email: ['killerkong950@gmail.com', [Validators.required, Validators.email]],
      confirmEmail: ['killerkong950@gmail.com', [Validators.required, Validators.email]],
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
      

      const {email} = this.form.value

      this.authService.sendEmailChangePassword(email).subscribe({
        next:(res) => {
          if(res === true){
            this.success(`Comprueba la direccion ${email} para acceder al cambio de contraseña.`) 
            
            setTimeout(() => {
              this.router.navigateByUrl('/login')
            }, 2500);
          }
        },
        error:(message) =>{
          if(message !== undefined){
            this.errorToast(message)
          }else{
            this.errorToast('El servidor no está disponible')
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