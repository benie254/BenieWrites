import { Component, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';
import * as Notiflix from 'notiflix';
import { Contact } from 'src/app/classes/contact/contact';
import { Subscriber } from 'src/app/classes/subscriber/subscriber';
import { MyErrorStateMatcher } from 'src/app/modules/admin/auth/services/matcher/matcher.service';
import { StoryService } from 'src/app/modules/admin/services/story/story.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  editor: Editor;
  values = '';
  subValues = '';
  noInput: boolean = true;
  subInput: boolean = false;
  matcher = new MyErrorStateMatcher();
  
  constructor(
    private storyService: StoryService,
  ) { }

  ngOnInit(): void {
  }
  subscribe(data: Subscriber){
    Notiflix.Loading.pulse('subscribing you...')
    this.storyService.addSub(data).subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        Notiflix.Report.success(
          "You're In!",
          'Your subscription was successful. Please check your email for more information.',
          'Okay',
        )
      }
    })
  }
  contact(data: Contact){
    Notiflix.Loading.pulse('sending message...')
    this.storyService.addContact(data).subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        Notiflix.Report.success(
          'Message Sent!',
          "Your message was successfully delivered to Benie. Please check your email for a confirmation.",
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
