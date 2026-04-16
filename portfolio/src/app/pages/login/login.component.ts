import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  error = '';

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  get f(){
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }

    const {email, password} = this.loginForm.getRawValue();

    this.authService.login(email ?? '', password ?? '').subscribe({
      next: (ok) => {
        if(ok){
          this.router.navigate(['/about']);
        }else{
          this.error='credenciales incorrectas';
        }
      },
      error: () => {
        this.error = 'Error al conectar con el servidor';
      }
    });
  }
}
