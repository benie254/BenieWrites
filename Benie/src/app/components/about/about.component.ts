import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { MyStoryService } from 'src/app/services/story/my-story.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(
    private service:MyStoryService,
  ) { }

  ngOnInit(): void {
  }
  subscribe(data){
    Notiflix.Loading.pulse('Processing...')
    this.service.subscribeNewsletter(data).subscribe({
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

}
