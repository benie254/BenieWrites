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
  currentSite = window.location.href;
  author = 'Benie Langat';
  tag = 'With words, I give my thoughts life.';
  about = 'Benie is a passionate writer and software developer. He enjoys the challenge in chess and loves the freedom in swimming. He loves music and art.';
  closing = 'Benie writes from the depths of the heart, for you and for his soul.';
  img = 'https://res.cloudinary.com/benie/image/upload/v1670974359/undraw_reading_book_re_kqpk_y5d2ju.svg';
  authorImg = 'https://res.cloudinary.com/benie/image/upload/v1671583589/IMG_20220119_175206_763_lb4sg3-removebg-preview_dkprqf.png';
  fullName = 'Benson Langat';
  shortName = 'Benie';
  address = 'Nairobi, Kenya';
  email = 'davinci.monalissa@gmail.com';
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
