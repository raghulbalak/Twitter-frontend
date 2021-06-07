import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: any;
  userStatus: Boolean = true;
  userPassword: Boolean = false;
  status: Boolean = false;
  userId: String = '';

  constructor(private loginService: LoginService, private _fb: FormBuilder, private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this._fb.group({
      userId: ['', Validators.required],
      password: ['']
    })
  }

  userIdValidation() {
    console.log(this.forgotPasswordForm.controls.userId);
    this.loginService.getUser(this.forgotPasswordForm.controls.userId.value).subscribe((response: any) => {
      console.log(response);
      this.userStatus = response.status;
      this.userPassword = response.status;
      if(this.userPassword) {
        this.userId = this.forgotPasswordForm.controls.userId.value;
      this.forgotPasswordForm.get('userId').disable();
      this.forgotPasswordForm.controls.password.setValidators([Validators.required]);
      this.forgotPasswordForm.controls.password.updateValueAndValidity();
      }
    },
    (error) => {
      console.log(error);
    })
  }

  submit() {
    
    this.loginService.forgotPassword(this.userId, this.forgotPasswordForm.get('password').value).subscribe((res) => {
      this.closeModal();
    })
  }

  closeModal() {
    this.status = true;
    setTimeout(() => {
      this.activeModal.close();
    }, 2000);
  }

  closeModalButton() {
    this.activeModal.close();
  } 

}
