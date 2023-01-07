import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { MyStoryService } from 'src/app/services/story/my-story.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifs: any;
  latestNotifs: any;
  panelOpenState = false;
  today = new Date();

  constructor(
    private service: MyStoryService,
  ) { }

  ngOnInit(): void {
    this.getNotifications();
  }
  getNotifications(){
    Notiflix.Loading.pulse('Fetching...')
    this.service.getAllNotifications().subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        this.notifs = res;
        this.latestNotifs = this.notifs.slice(0,2)
      }
    })
  }

}
