import { Component, OnInit } from '@angular/core';
import { TweetsService } from '../tweets.service';

@Component({
  selector: 'app-my-tweets',
  templateUrl: './my-tweets.component.html',
  styleUrls: ['./my-tweets.component.scss']
})
export class MyTweetsComponent implements OnInit {
  tweets: any;

  constructor(private tweetsService: TweetsService) { }

  ngOnInit(): void {
    this.tweetsService.getUserTweets().subscribe((response: any) => {
      if(response.error == null) {
      this.tweets = response.allTweets;}
    },
    (error) => {
      console.log(error);
    })
  }

  reload(event: any) {
    this.ngOnInit();
  }

}
