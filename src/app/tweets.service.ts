import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TweetsService {

  constructor(private _http: HttpClient) { }

  public getAllTweets() {
    const urlActual = baseUrl + '/all' + '/' + this.userId;
    console.log(urlActual);
    // const url = 'http://localhost:8090/api/v1.0/tweets/all/test1';
    return this._http.get(urlActual);
  }

  public postTweet(userTweet: any) {
    console.log(userTweet);
    const url = baseUrl + '/' + this.userId + '/add';
    return this._http.post(url, userTweet);
  }

  public replyTweet(tweetId: String, reply: String) {
    const url = baseUrl + '/' + this.userId + '/reply/' + tweetId;
    return this._http.post(url, reply);
  }

  public likeTweet(tweetId: String, status: Boolean) {
    const userId = sessionStorage.getItem('userId');
    const url = baseUrl + '/' + this.userId + '/like/' + tweetId;
    return this._http.put(url, status);
  }

  public userTweets() {
    const url = baseUrl + '/' + this.userId;
    return this._http.get(url);
  }

  public getUserTweets() {
    const url = baseUrl + '/' + this.userId;
    return this._http.get(url);
  }

  public updateTweet(tweetId: any, tweet: any) {
    console.log(tweet);
    console.log(tweetId);
    const url = baseUrl + '/' + this.userId + '/update/' + tweetId;
    return this._http.put(url, tweet);
  }

  public deleteTweet(tweetId: any) {
    const url = baseUrl + '/' + this.userId + '/delete' + '/' + tweetId;
    return this._http.delete(url);
  }

  get userId() {
    return sessionStorage.getItem('userId');
  }
}
