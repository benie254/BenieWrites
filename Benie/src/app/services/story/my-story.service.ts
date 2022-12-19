import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// const apiURL = 'https://beniewrites-api-production.up.railway.app/api/';
const apiURL = 'http://127.0.0.1:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class MyStoryService {
  allStories = apiURL + 'stories/all/';
  storyDet = apiURL + 'story/details/';
  allTags = apiURL + 'tags/all/';
  allChaps = apiURL + 'chapters/all/';
  storyChaps = apiURL + 'story/chapters/';
  chapPages = apiURL + 'chapter/pages/';
  chapDet = apiURL + 'chapter/details/';
  allReacts = apiURL + 'reactions/all/';
  storyReacts = apiURL + 'story/reactions/';
  storyFeeds = apiURL + 'story/feedbacks/';
  allFeeds = apiURL + 'feedbacks/all/';
  sub = apiURL + 'newsletter/subscribers/'

  myStory: string[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  getAllStories(): Observable<any>{
    return this.http.get<any>(this.allStories);
  }
  getAllSubscribers(): Observable<any>{
    return this.http.get<any>(this.sub);
  }
  subscribeNewsletter(data: any): Observable<any>{
    return this.http.post<any>(this.sub, data);
  }
  getStoryDetails(id: number): Observable<any>{
    return this.http.get<any>(this.storyDet + id);
  }
  getAllTags(): Observable<any>{
    return this.http.get<any>(this.allTags);
  }
  getAllChapters(): Observable<any>{
    return this.http.get<any>(this.allChaps);
  }
  getChapDetails(id: number): Observable<any>{
    return this.http.get<any>(this.chapDet + id);
  }
  getAllReactions(): Observable<any>{
    return this.http.get<any>(this.allReacts);
  }
  addReaction(data: any): Observable<any>{
    return this.http.post<any>(this.allReacts, data);
  }
  getStoryReactions(id: number): Observable<any>{
    return this.http.get<any>(this.storyReacts + id);
  }
  getStoryFeedbacks(id: number): Observable<any>{
    return this.http.get<any>(this.storyFeeds + id);
  }
  getAllComments(): Observable<any>{
    return this.http.get<any>(this.allFeeds);
  }
  getStoryChapters(id: number): Observable<any>{
    return this.http.get<any>(this.storyChaps + id);
  }
  getChapterPages(id: number): Observable<any>{
    return this.http.get<any>(this.chapPages + id);
  }

  saveStory(story){
    this.myStory.push(story)
  }
  clearStories(){
    this.myStory = [];
  }
}
