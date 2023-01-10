import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReqHandlerService } from 'src/app/helpers/requests/req-handler.service';

// const apiURL = 'https://beniewrites-api-production.up.railway.app/api/';
const apiURL = 'http://127.0.0.1:8000/api/';

@Injectable({
  providedIn: 'any'
})
export class MyStoryService {
  allStories = apiURL + 'stories/all/';
  onStories = apiURL + 'stories/ongoing/';
  compStories = apiURL + 'stories/completed/';
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
  sub = apiURL + 'newsletter/subscribers/';
  notifs = apiURL + 'notifications/all/';
  related = apiURL + 'stories/related/';

  myStory: string[] = [];

  constructor(
    private handler: ReqHandlerService,
  ) { }

  getAllStories(): Observable<any>{
    return this.handler.handleGET<any>(this.allStories);
  }
  getOngoingStories(): Observable<any>{
    return this.handler.handleGET<any>(this.onStories);
  }
  getCompletedStories(): Observable<any>{
    return this.handler.handleGET<any>(this.compStories);
  }
  getAllNotifications(): Observable<any>{
    return this.handler.handleGET<any>(this.notifs);
  }
  getAllSubscribers(): Observable<any>{
    return this.handler.handleGET<any>(this.sub);
  }
  
  getStoryDetails(id: number): Observable<any>{
    return this.handler.handleGET<any>(this.storyDet + id);
  }
  getAllTags(): Observable<any>{
    return this.handler.handleGET<any>(this.allTags);
  }
  getAllChapters(): Observable<any>{
    return this.handler.handleGET<any>(this.allChaps);
  }
  getChapDetails(id: number): Observable<any>{
    return this.handler.handleGET<any>(this.chapDet + id);
  }
  getAllReactions(): Observable<any>{
    return this.handler.handleGET<any>(this.allReacts);
  }
  addReaction(data: any): Observable<any>{
    return this.handler.handlePOST<any>(this.allReacts, data);
  }
  getStoryReactions(id: number): Observable<any>{
    return this.handler.handleGET<any>(this.storyReacts + id);
  }
  getStoryFeedbacks(id: number): Observable<any>{
    return this.handler.handleGET<any>(this.storyFeeds + id);
  }
  getAllComments(): Observable<any>{
    return this.handler.handleGET<any>(this.allFeeds);
  }
  getStoryChapters(id: number): Observable<any>{
    return this.handler.handleGET<any>(this.storyChaps + id);
  }
  getChapterPages(id: number): Observable<any>{
    return this.handler.handleGET<any>(this.chapPages + id);
  }

  saveStory(story){
    this.myStory.push(story)
  }
  clearStories(){
    this.myStory = [];
  }

  getRelatedStories(id: any): Observable<any>{
    return this.handler.handleGET<any>(this.related + id);
  }
}
