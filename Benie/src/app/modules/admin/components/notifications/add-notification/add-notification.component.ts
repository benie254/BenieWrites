import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { StoryService } from '../../../services/story/story.service';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.css']
})
export class AddNotificationComponent implements OnInit {
  dialogOp: boolean = false;
  value = 1;
  htmlContent: '';
  values = '';
  counted: any;
  limitReached: boolean = false;
  html: '';

  constructor(
    private storyService:StoryService,
  ) { }
 
  ngOnInit(): void {
  }
  addItem(data: any){
    this.storyService.addNotif(data).subscribe({
      next: (res) => {

      }
    });
    Notiflix.Notify.success('Added!');
  }
  reset(){
    const form = (<HTMLFormElement>document.getElementById('notifForm'));
    setTimeout(() => {
      form.reset();
    }, 250)
  }
  reload(){
    setTimeout(() => {
      location.reload();
    }, 250)
  }
}
