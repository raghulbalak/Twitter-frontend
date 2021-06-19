import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-delete-tweet',
  templateUrl: './update-delete-tweet.component.html',
  styleUrls: ['./update-delete-tweet.component.scss']
})
export class UpdateDeleteTweetComponent implements OnInit {
  @Input() tweet: any;
  modifyTweet: any;

  constructor(private modalActive: NgbActiveModal) {
  }

  ngOnInit(): void {
    console.log(this.tweet);
    this.modifyTweet = this.tweet;
  }

  updateTweet() {
    const value = {
      action: 'update',
      value: this.modifyTweet
    }
    this.modalActive.close(value);
  }

  deleteTweet() {
    const output = {
      action: 'delete',
      value: null
    }
    this.modalActive.close(output);
  }

  dismiss() {
    this.modalActive.close();
  }

}
