import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReqHandlerService } from 'src/app/helpers/requests/req-handler.service';

// const apiURL = 'https://beniewrites-api-production.up.railway.app/api/';
const apiURL = 'http://127.0.0.1:8000/api/';

@Injectable({
  providedIn: 'any'
})
export class StoryService {
  addSt = apiURL + 'admin/story/add/';
  storyDet = apiURL + 'admin/story/details/';
  updateSt = apiURL + 'admin/story/update/';
  addTag = apiURL + 'admin/tag/add/';
  tagDet = apiURL + 'admin/tag/details/';
  addChap = apiURL + 'admin/chapter/add/';
  chapDet = apiURL + 'chapter/details/';
  updateChap = apiURL + 'admin/chapter/update/';
  reactDet = apiURL + 'admin/reaction/details/';
  addFeed = apiURL + 'feedbacks/all/';
  feedDet = apiURL + 'admin/feedback/details/';
  addChapPage = apiURL + 'admin/page/add/';
  allPages = apiURL + 'admin/pages/all/';
  updatePage = apiURL + 'admin/page/update/';
  pageDet = apiURL + 'admin/page/details/';
  notifDet = apiURL + 'admin/notification/details/';
  notifs = apiURL + 'notifications/all/';
  sub = apiURL + 'newsletter/subscribers/';
  subDet = apiURL + 'admin/subscriber/details/';
  contact = apiURL + 'admin/contacts/all/';
  contactDet = apiURL + 'admin/contact/details/';

  constructor(
    private handler: ReqHandlerService,
    private http: HttpClient,
  ) { }
  getAllContacts(): Observable<any>{
    return this.http.get<any>(this.contact);
  }
  addContact(data: any): Observable<any>{
    return this.http.post<any>(this.contact, data);
  }
  getContactDetails(id: any): Observable<any>{
    return this.http.get<any>(this.contactDet + id);
  }
  deleteContact(id: number): Observable<any>{
    return this.http.delete<any>(this.contactDet + id);
  }
  addNotif(data: any): Observable<any>{
    return this.http.post<any>(this.notifs, data);
  }
  addSub(data: any): Observable<any>{
    return this.http.post<any>(this.sub, data);
  }
  addStory(data: any): Observable<any>{
    return this.http.post<any>(this.addSt, data);
  }
  editStory(id: number, data: any): Observable<any>{
    return this.http.put<any>(this.updateSt + id, data);
  }
  deleteStory(id: number): Observable<any>{
    return this.http.delete<any>(this.updateSt + id);
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
  getSubscriberDetails(id: number): Observable<any>{
    return this.http.get<any>(this.subDet + id);
  }
  deleteSubscriber(id: number): Observable<any>{
    return this.http.delete<any>(this.subDet + id);
  }
  getNotificationDetails(id: number): Observable<any>{
    return this.http.get<any>(this.notifDet + id);
  }
  editNotification(id: number, data: any): Observable<any>{
    return this.http.put<any>(this.notifDet + id, data);
  }
  deleteNotification(id: number): Observable<any>{
    return this.http.delete<any>(this.notifDet + id);
  }
  deleteTags(id: number): Observable<any>{
    return this.http.delete<any>(this.tagDet + id);
  }
  addChapter(data: any): Observable<any>{
    return this.http.post<any>(this.addChap, data);
  }
  editChapter(id: number, data: any): Observable<any>{
    return this.http.put<any>(this.updateChap + id, data);
  }
  deleteChapter(id: number): Observable<any>{
    return this.http.delete<any>(this.updateChap + id);
  }
  getAllPages(): Observable<any>{
    return this.http.get<any>(this.allPages);
  }
  addPage(data: any): Observable<any>{
    return this.http.post<any>(this.addChapPage, data);
  }
  editPage(id: number, data: any): Observable<any>{
    return this.http.put<any>(this.updatePage + id, data);
  }
  deletePage(id: number): Observable<any>{
    return this.http.delete<any>(this.updatePage + id);
  }
  getReactionDetails(id: number): Observable<any>{
    return this.http.get<any>(this.reactDet + id);
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
  getPageDetails(id: number): Observable<any>{
    return this.http.get<any>(this.pageDet + id);
  }
}
