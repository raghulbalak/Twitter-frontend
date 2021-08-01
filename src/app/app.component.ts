import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tweet-app';
  idleState = 'Not started.';
  timedOut = false;
  public modalRef!: NgbModalRef;
  lastPing = new Date();

  constructor(private idle: Idle, private keepalive: Keepalive, private _router: Router,
    private userService: LoginService, private modalService: NgbModal, ) {

    // sets an idle timeout of 300 seconds
    idle.setIdle(300);
    // sets a timeout period of 15 seconds.
    idle.setTimeout(15);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!';
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      if (!this.userService.modalOpened) {
        this.modalRef = this.modalService.open(NgbModalContent);
        this.userService.modalOpened = true;
        this.modalRef.result.then((data) => {
          if (data == 'extend') {
            idle.watch();
          } else {
            idle.stop();
          }
        })
      }

      this.idleState = 'You will time out in ' + countdown + ' seconds!'
    });

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.'
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.modalRef.close();
      this.userService.modalOpened = false;
      sessionStorage.clear();
      this.userService.setLoggedIn(false);
      this._router.navigate(['/login']);
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => { this.lastPing = new Date(); });

    this.userService.loggedInStatus.subscribe((loggedIn) => {
      if (loggedIn) {
        idle.watch();
      } else {
        idle.stop();
      }
    })
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
}

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="close()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>You have been idle. Do you want to extend the session?</p>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="extend()">Extend for 5 minutes</button>
      <button type="button" class="btn btn-outline-dark" (click)="dismiss()">Log out</button>
    </div>
  `
})
export class NgbModalContent {

  constructor(public activeModal: NgbActiveModal, public userService: LoginService, public router: Router) {

  }

  close() {
    this.activeModal.close('extend');
    this.userService.modalOpened = false;
  }

  extend() {
    this.activeModal.close('extend');
    this.activeModal.dismiss();
    this.userService.modalOpened = false;
  }

  dismiss() {
    this.userService.modalOpened = false;
    this.activeModal.close('dismiss');
    sessionStorage.clear();
    this.userService.setLoggedIn(false);
    this.router.navigate(['/login']);
  }


}
