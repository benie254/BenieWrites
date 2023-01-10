import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReqHandlerService } from 'src/app/helpers/requests/req-handler.service';

const api = 'http://127.0.0.1:8000/api/admin/';
// const api = 'https://beniewrites-api-production.up.railway.app/api/admin/';

@Injectable({
  providedIn: 'any'
})
export class AdminPoetryService {
  addPoem = api + 'poems/add/';
  updatePoem = api + 'poem/update/';
  commentDet = api + 'feedback/details/';

  constructor(
    private handler: ReqHandlerService,
    ) { }
    
  postPoem(data: any): Observable<any>{
    return this.handler.handlePOST<any>(this.addPoem, data);
  }
  editPoem(id: number, data: any): Observable<any>{
    return this.handler.handlePUT<any>(this.updatePoem + id, data);
  }
  deletePoem(id: number): Observable<any>{
    return this.handler.handleDEL<any>(this.updatePoem + id);
  }
  commentDetails(id: number):Observable<any>{
    return this.handler.handleGET<any>(this.commentDet + id)
  }
}
