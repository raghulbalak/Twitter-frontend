import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { TweetsService } from '../tweets.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  allTweets: any;
  liked: any;
  reply: FormControl = new FormControl('');
  userTweet: any = new FormControl('');
  constructor(private tweetsService: TweetsService) { }

  ngOnInit(): void {
    this.tweetsService.getAllTweets().subscribe((response: any) => {
      this.allTweets = response.allTweets;
      this.allTweets.reverse();
      this.allTweets.sort(function(a: any, b: any) {
        return b.id - a.id;
      });
    })
  }

  postTweet() {
    if(this.userTweet.value) {
      const tweets = {
        tweet: this.userTweet.value
      }
      this.tweetsService.postTweet(tweets).subscribe((response: any) => {
        this.ngOnInit();
        this.userTweet.setValue('');
      },
      (error) => {console.log(error)});
    }
  }

  reload(event: any) {
    this.ngOnInit();
  }

}
