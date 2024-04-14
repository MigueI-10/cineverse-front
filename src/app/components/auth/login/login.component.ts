import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { PrimeNgModule } from '../../../prime-ng/prime-ng/prime-ng.module';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, PrimeNgModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public form !: FormGroup //| undefined;
  // private fb = inject(FormBuilder);
  // private _authService = inject(AuthService)
  // private _toastService = inject(ToastService)
  // private router = inject(Router)


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }


  ngOnInit() {

    //validaciones
    this.form = this.fb.group({

      email: ['mibaca27@gmail.com', [Validators.required, Validators.email]],
      password: ['12345678', [Validators.required, Validators.minLength(8)]],

    })
  }

  login() {
    if (this.form.valid) {
      
      const {email, password} = this.form.value
      this.authService.login(email, password).subscribe({
        next:() => this.router.navigateByUrl('/home'),
        error:(message) =>{
          this.errorToast(message)
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

  success(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  errorToast(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
