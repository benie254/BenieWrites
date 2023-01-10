import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReqHandlerService } from 'src/app/helpers/requests/req-handler.service';

const api = 'http://127.0.0.1:8000/api/';
// const api = 'https://beniewrites-api-production.up.railway.app/api/';

@Injectable({
  providedIn: 'any'
})
export class PoetryService {
  allPoems = api + 'poems/all/';
  poemDet = api + 'poem/details/';
  pastPoems = api + 'poems/past/';
  pinned = api + 'poem/pinned/';
  related = api + 'poems/related/';
  like = api + 'reactions/all/';
  comment = api + 'feedbacks/all/';
  reacts = api + 'poem/reactions/';
  feeds = api + 'poem/feedbacks/';
  replies = api + 'replies/all/';
  comLike = api + 'feedback/likes/';
  comReply = api + 'feedback/replies/';

  constructor(
    private handler: ReqHandlerService,
  ) { }
  getAllPoems(): Observable<any>{
    return this.handler.handleGET<any>(this.allPoems)
  }
  getPinnedPoems(): Observable<any>{
    return this.handler.handleGET<any>(this.pinned)
  }
  getRelatedPoems(category: string): Observable<any>{
    return this.handler.handleGET<any>(this.related + category)
  }
  getPoemDetails(id: number): Observable<any>{
    return this.handler.handleGET<any>(this.poemDet + id)
  }
  searchByDate(poemDate: string): Observable<any>{
    return this.handler.handleGET<any>(this.pastPoems + poemDate)
  }
  likePoem(data: any):Observable<any>{
    return this.handler.handlePOST<any>(this.like, data)
  }
  commentPoem(data: any):Observable<any>{
    return this.handler.handlePOST<any>(this.comment, data)
  }
  poemLikes(id: number):Observable<any>{
    return this.handler.handleGET<any>(this.reacts + id)
  }
  poemComments(id: number):Observable<any>{
    return this.handler.handleGET<any>(this.feeds + id)
  }
  likeComment(data: any):Observable<any>{
    return this.handler.handlePOST<any>(this.like, data)
  }
  replyComment(data: any):Observable<any>{
    return this.handler.handlePOST<any>(this.replies, data)
  }
  commentLikes(id: number):Observable<any>{
    return this.handler.handleGET<any>(this.comLike + id)
  }
  commentReplies(id: number):Observable<any>{
    return this.handler.handleGET<any>(this.comReply + id)
  }
}
