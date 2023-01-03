import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReqHandlerService } from 'src/app/helpers/requests/req-handler.service';

const api = 'http://127.0.0.1:8000/api/admin/';
// const api = '';

@Injectable({
  providedIn: 'any'
})
export class AdminPoetryService {
  addPoem = api + 'poems/add/';
  updatePoem = api + 'poem/update/';

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
}
