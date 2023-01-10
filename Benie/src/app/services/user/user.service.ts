import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscriber } from 'src/app/classes/subscriber/subscriber';
import { ReqHandlerService } from 'src/app/helpers/requests/req-handler.service';

// const apiURL = 'https://beniewrites-api-production.up.railway.app/api/';
const apiURL = 'http://127.0.0.1:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  sub = apiURL + 'newsletter/unsubscribe/';

  constructor(
    private handler:ReqHandlerService,
  ) { }

  unsubscribe(email: string):Observable<Subscriber>{
    return this.handler.handleDEL<Subscriber>(this.sub + email);
  }
}
