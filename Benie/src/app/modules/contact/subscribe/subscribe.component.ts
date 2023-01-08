import { Component, Input, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { Subscriber } from 'src/app/classes/subscriber/subscriber';
import { StoryService } from 'src/app/modules/admin/services/story/story.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
  @Input() matcher: any;
  subValues = '';
  subInput: boolean = false;

  constructor(
    private storyService: StoryService,
  ) { }

  ngOnInit(): void {
  }
  subKey(event: any){
    this.subValues = event.target.value;
    if(this.subValues){
      this.subInput = true;
    }
  }
  subscribe(data: Subscriber){
    Notiflix.Loading.pulse('subscribing you...')
    this.storyService.addSub(data).subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        this.subInput = false;
        Notiflix.Report.success(
          "You're In!",
          'Your subscription was successful. Please check your email for more information.',
          'Okay',
        )
      }
    })
  }
}
