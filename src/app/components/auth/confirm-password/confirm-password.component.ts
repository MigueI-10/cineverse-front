import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../../../prime-ng/prime-ng/prime-ng.module';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-password',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, PrimeNgModule, CommonModule, TranslateModule],
  providers: [MessageService],
  templateUrl: './confirm-password.component.html',
  styleUrl: './confirm-password.component.css'
})
export class ConfirmPasswordComponent implements OnInit {
  public form !: FormGroup

  private goodCheck = "Contraseña actualizada exitosamente"
  private badCheck = "Error al modificar la cuenta"
  private token: string = ""

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private messageService: MessageService

  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(
        '^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*])[a-zA-Z\\d\\S]{8,}$'
      )]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(
        '^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*])[a-zA-Z\\d\\S]{8,}$'
      )]],
    }, { validators: this.checkBothEmailSame })

    this.activeRouter.params.subscribe(
      params => {
        this.token = params['token'];

      }
    );
  }

  checkBothEmailSame(formGroup: FormGroup) {

    const password = formGroup.get('password')?.value
    const confirmPassword = formGroup.get('confirmPassword')?.value

    // return email === confirmEmail ? null : { notSameEmail: true }
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ notSamePassword: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }

  }

  submitChange() {
    if (this.form.valid) {
      const { password } = this.form.value
      this.authService.confirmChangePassword(this.token, password).subscribe({
        next: (res) => {
          let cadena = res.message
          if (cadena === this.goodCheck) {

            this.success(cadena)
           
            setTimeout(() => {
              this.router.navigateByUrl('/login')
            }, 1000);

          } else if (cadena === this.badCheck) {
            this.errorToast(cadena)
            this.errorToast('No modifiques el token de la url...')

            setTimeout(() => {
              this.router.navigateByUrl('/login')
            }, 1000);
          }
        },
        error: (message) => {
          if (message !== undefined) {
            this.errorToast(message)
          } else {
            this.errorToast('El servidor no está disponible')
          }
        }
      })



    }
  }

  get password() {
    return this.form.get('password') as FormControl
  }

  get confirmPassword() {
    return this.form.get('confirmPassword') as FormControl
  }

  //mensajes con estilo
  success(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
  }

  errorToast(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
  }
}
