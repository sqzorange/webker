import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatFormField,
  MatInputModule,
  MatLabel,
} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-register',
  imports: [
    MatInputModule,
    MatFormField,
    MatLabel,
    MatButtonModule,
    ReactiveFormsModule,
    NavbarComponent,
    MatCardModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}
  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      this.authService
        .register(email, password)
        .then(() => {
          this.router.navigate(['/home']);
        })
        .catch((error) => {
          console.error('Login error:', error);
        });
    }
  }
}
