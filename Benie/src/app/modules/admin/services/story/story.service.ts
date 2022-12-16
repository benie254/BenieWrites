import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReqHandlerService } from 'src/app/helpers/requests/req-handler.service';

// const apiURL = 'https://beniewrites-api-production.up.railway.app/api/';
const apiURL = 'http://127.0.0.1:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  addSt = apiURL + 'admin/story/add/';
  storyDet = apiURL + 'admin/story/details/';
  addTag = apiURL + 'admin/tag/add/';
  tagDet = apiURL + 'admin/tag/details/';
  addChap = apiURL + 'admin/chapter/add/';
  chapDet = apiURL + 'admin/chapter/details/';
  addReact = apiURL + 'admin/reaction/add/';
  reactDet = apiURL + 'admin/reaction/details/';
  addFeed = apiURL + 'admin/feedback/add/';
  feedDet = apiURL + 'admin/feedback/details/';

  constructor(
    private handler: ReqHandlerService,
    private http: HttpClient,
  ) { }

  addStory(data: any): Observable<any>{
    return this.http.post<any>(this.addSt, data);
  }
  editStory(id: number, data: any): Observable<any>{
    return this.http.put<any>(this.storyDet + id, data);
  }
  deleteStory(id: number): Observable<any>{
    return this.http.delete<any>(this.storyDet + id);
  }
  addTags(data: any): Observable<any>{
    return this.http.post<any>(this.addTag, data);
  }
  editTags(id: number, data: any): Observable<any>{
    return this.http.put<any>(this.tagDet + id, data);
  }
  getTagDetails(id: number): Observable<any>{
    return this.http.get<any>(this.tagDet + id);
  }
  deleteTags(id: number): Observable<any>{
    return this.http.delete<any>(this.tagDet + id);
  }
  addChapter(data: any): Observable<any>{
    return this.http.post<any>(this.addChap, data);
  }
  editChapter(id: number, data: any): Observable<any>{
    return this.http.put<any>(this.chapDet + id, data);
  }
  deleteChapter(id: number): Observable<any>{
    return this.http.delete<any>(this.chapDet + id);
  }
  addReaction(data: any): Observable<any>{
    return this.http.post<any>(this.addReact, data);
  }
  deleteReaction(id: number): Observable<any>{
    return this.http.delete<any>(this.reactDet + id);
  }
  addFeedback(data: any): Observable<any>{
    return this.http.post<any>(this.addFeed, data);
  }
  getFeedDetails(id: number): Observable<any>{
    return this.http.get<any>(this.feedDet + id);
  }
  editFeedback(id: number, data: any): Observable<any>{
    return this.http.put<any>(this.feedDet + id, data);
  }
  deleteFeedback(id: number): Observable<any>{
    return this.http.delete<any>(this.feedDet + id);
  }
}
