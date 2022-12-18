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
  chapDet = apiURL + 'chapter/details/';
  allReacts = apiURL + 'reactions/all/';
  allFeeds = apiURL + 'feedbacks/all/';

  constructor(
    private http: HttpClient,
  ) { }

  getAllStories(): Observable<any>{
    return this.http.get<any>(this.allStories);
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
  getAllComments(): Observable<any>{
    return this.http.get<any>(this.allFeeds);
  }
  getStoryChapters(id: number): Observable<any>{
    return this.http.get<any>(this.storyChaps + id);
  }
}
