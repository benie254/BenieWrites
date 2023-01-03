import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReqHandlerService } from 'src/app/helpers/requests/req-handler.service';

const api = 'http://127.0.0.1:8000/api/';
// const api = '';

@Injectable({
  providedIn: 'any'
})
export class PoetryService {
  allPoems = api + 'poems/all/';
  poemDet = api + 'poem/details/';
  pastPoems = api + 'poems/past/';
  pinned = api + 'poem/pinned/';

  constructor(
    private handler: ReqHandlerService,
  ) { }
  getAllPoems(): Observable<any>{
    return this.handler.handleGET<any>(this.allPoems)
  }
  getPinnedPoems(): Observable<any>{
    return this.handler.handleGET<any>(this.pinned)
  }
  getPoemDetails(id: number): Observable<any>{
    return this.handler.handleGET<any>(this.poemDet + id)
  }
  searchByDate(poemDate: string): Observable<any>{
    return this.handler.handleGET<any>(this.pastPoems + poemDate)
  }
}
