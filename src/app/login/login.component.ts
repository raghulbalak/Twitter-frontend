import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: true,
    ariaLabelledBy: 'modal_title',
    container: '#login'
  };
  invalidCredentials: Boolean = false;
  logIn: Boolean = false;

  constructor(private _fb: FormBuilder, private loginService: LoginService, private modalService: NgbModal, private _router: Router) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  submit() {
    this.logIn = true;
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe((response: any) => {
        if (response.errorMessage === null) {
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('userId', response.userId);
          sessionStorage.setItem('emailId', response.emailId);
          this.loginService.setLoggedIn(true);
          this._router.navigate(['/home-page']);
        } else {
          this.invalidCredentials = true;
        }
      },
        (error) => {
          console.log("error");
          console.log(error);
        })
    }
  }

  forgotPassword() {
    this.modalService.open(ForgotPasswordComponent);
  }

}
