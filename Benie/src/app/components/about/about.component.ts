import { Component, OnDestroy, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';
import * as Notiflix from 'notiflix';
import { StoryService } from 'src/app/modules/admin/services/story/story.service';
import { MyStoryService } from 'src/app/services/story/my-story.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  currentSite = window.location.href;
  editor: Editor;
  html: '';
  values = '';
  subValues = '';
  noInput: boolean = true;
  subInput: boolean = false;
  
  constructor(
    private service:MyStoryService,
    private storyService: StoryService,
  ) { }

  ngOnInit(): void {
  }
  subscribe(data){
    Notiflix.Loading.pulse('Processing...')
    this.storyService.addSub(data).subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        Notiflix.Report.success(
          'Subscribed!',
          'Your subscription was successful. Please check your email.',
          'Okay',
        )
      },
      error: (err) => {
        Notiflix.Loading.remove();
        Notiflix.Report.failure(
          'Subscription Failed',
          'Something went wrong as we tried to subscribe you. Please try again.',
          'Okay',
        )
      }
    })
  }
  contact(data){
    Notiflix.Loading.pulse('Processing...')
    this.storyService.addContact(data).subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        Notiflix.Report.success(
          'Sent!',
          'Your message was delivered successfully. Please check your email.',
          'Okay',
        )
      },
      error: (err) => {
        Notiflix.Loading.remove();
        Notiflix.Report.failure(
          'Sending Failed',
          'Something went wrong as we tried to send your message. Please try again.',
          'Okay',
        )
      }
    })
  }

  onKey(event: any){
    this.values = event.target.value;
    if(this.values){
      this.noInput = false;
    }
  }
  subKey(event: any){
    this.values = event.target.value;
    if(this.values){
      this.subInput = true;
    }
  }

  

}
