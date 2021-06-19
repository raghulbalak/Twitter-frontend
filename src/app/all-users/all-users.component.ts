import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  users: any;
  errorMessage: any;

  constructor(private loginService: LoginService, private modalClose: NgbActiveModal) { }

  ngOnInit(): void {
    this.loginService.users().subscribe((response: any) => {
      if(response.error === null) {
      this.users = response.users;
      document.getElementById('allUsers')?.focus();
      console.log(response);
      } else {
        this.errorMessage = response.error;
      }
    },
    (error) => {
      this.errorMessage = error;
      console.log(error);
    })
  }

  closeModalButton() {
    this.modalClose.close();
  }

}
