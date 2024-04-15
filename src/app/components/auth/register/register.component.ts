import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
import { PrimeNgModule } from '../../../prime-ng/prime-ng/prime-ng.module';
import { CommonModule } from '@angular/common';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service, RecaptchaV3Module } from 'ng-recaptcha';
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, PrimeNgModule, CommonModule, RecaptchaV3Module],
  providers: [
    {
    provide: RECAPTCHA_V3_SITE_KEY,
    useValue: environment.siteKey,
  }, MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  public registerForm !: FormGroup
  private tokenCaptcha :string = ""

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private recaptchaV3Service: ReCaptchaV3Service
  ) { }

  ngOnInit() {

    //validaciones
    this.registerForm = this.fb.group({
      name: ['Killer', [Validators.required]],
      email: ['killerkong950@gmail.com', [Validators.required, Validators.email]],
      confirmEmail: ['killerkong950@gmail.com', [Validators.required, Validators.email]],
      password: ['killerkong950', [Validators.required, Validators.minLength(8)]],
    }, { validators: this.checkBothEmailSame })
  }

  //metodo para comprobar ambos emails
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

  //metodo de register
  register() {

   

    if (this.registerForm.valid) {

      this.recaptchaV3Service.execute('importantAction')
      .subscribe((token: string) => {
        this.tokenCaptcha = token
        // console.log(this.tokenCaptcha);
      });

       



      const {email, name, password} = this.registerForm.value

      this.authService.register(email, name, password).subscribe({
        next:(res) => {
          if(res === true){
            this.success(`Comprueba la direccion ${email} para activar tu cuenta.`) 
            
            setTimeout(() => {
              this.router.navigateByUrl('/login')
            }, 2500);
          }
        },
        error:(message) =>{
          this.errorToast(message)
        }  
      })


    }
  }


  //getters del formulario
  get name() {
    return this.registerForm.get('name') as FormControl
  }

  get email() {
    return this.registerForm.get('email') as FormControl
  }

  get confirmEmail() {
    return this.registerForm.get('confirmEmail') as FormControl
  }

  get password() {
    return this.registerForm.get('password') as FormControl
  }

  //mensajes con estilo
  success(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
  }

  errorToast(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
  }


}
