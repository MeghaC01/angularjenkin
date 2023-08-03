import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AadharService } from '../aadhar.service';
import { timer } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpRef = new FormGroup({
    emailid: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required),
    typeOfUser: new FormControl('user', Validators.required)
  });

  msg: string = '';
  constructor(public service: AadharService, public router: Router, private location: Location) {}


  ngOnInit(): void {}

  signUp() {
    const typeOfUser = this.signUpRef.get('typeOfUser')?.value;
    const password = this.signUpRef.get('password')?.value?.toString();

    if (!typeOfUser || !password) {
      this.msg = 'Please fill in all the required fields.';
      return;
    }

    if (typeOfUser === 'admin') {
      if (!this.validateAdminPassword(password)) {
        this.msg = 'Admin password should have at least one uppercase, one lowercase, one special character, and one number.';
        return;
      }
    } else if (typeOfUser === 'user') {
      if (!this.validateUserPassword(password)) {
        this.msg = 'User password should consist of only digits.';
        return;
      }
    }

    let signup = this.signUpRef.value;
    console.log(signup);
    this.service.signUp(signup).subscribe({
      next: (result: any) => {
        if (result == 'Account created successfully') {
          this.msg = 'Your Account is created successfully! Redirecting to Login Page...';
          timer(5000).subscribe((x) => {
            this.router.navigate(['login']);
          });
        } else {
          this.msg = result;
        }
      },
      error: (error: any) => console.log(error),
      complete: () => console.log('completed')
    });
  }

  validateAdminPassword(password: string): boolean {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()_+=\-[\]{}|\\:;"'<>,.?/~`])[A-Za-z\d@#$%^&*()_+=\-[\]{}|\\:;"'<>,.?/~`]{8,}$/;
    return pattern.test(password);
  }

  validateUserPassword(password: string): boolean {
    const pattern = /^[0-9]{10}$/;
    return pattern.test(password);
  }

  goBack() {
    this.location.back();
  }
}
