import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// const apiURL = 'https://beniewrites-api-production.up.railway.app/api/';
const apiURL = 'http://127.0.0.1:8000/api/'

@Injectable({
  providedIn: 'any'
})
export class StoriesService {
  allStories = apiURL + 'stories/all/';
  storyDet = apiURL + 'story/details/';

  constructor(
    private http: HttpClient,
  ) { }

  getAllStories(): Observable<any>{
    return this.http.get<any>(this.allStories);
  }
  getStoryDetails(id: number): Observable<any>{
    return this.http.get<any>(this.storyDet + id);
  }
}
