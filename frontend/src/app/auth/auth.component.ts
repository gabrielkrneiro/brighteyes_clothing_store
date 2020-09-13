import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['gabreo@gmail.com', [Validators.required]],
      password: ['123123', [Validators.required]],
    });
  }

  login(): void {
    console.log(this.loginForm.value);
    this.authService
      .login({
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value,
      })
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => console.error(error)
      );
  }
}
