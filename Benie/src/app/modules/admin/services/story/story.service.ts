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
  editSt = apiURL + 'admin/story/edit/';
  delSt = apiURL + 'admin/story/delete/';

  constructor(
    private handler: ReqHandlerService,
    private http: HttpClient,
  ) { }

  addStory(data: any): Observable<any>{
    return this.http.post<any>(this.addSt, data);
  }
  editStory(id: number, data: any): Observable<any>{
    return this.http.put<any>(this.editSt + id, data);
  }
  deleteStory(id: number): Observable<any>{
    return this.http.delete<any>(this.delSt + id);
  }
}
