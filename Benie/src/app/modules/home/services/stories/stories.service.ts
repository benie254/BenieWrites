import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const apiURL = ''

@Injectable({
  providedIn: 'any'
})
export class StoriesService {
  allStories = apiURL + 'stories/all/';

  constructor(
    private http: HttpClient,
  ) { }

  getAllStories(): Observable<any>{
    return this.http.get<any>(this.allStories);
  }
}
