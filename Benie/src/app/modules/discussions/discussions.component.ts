import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import * as Notiflix from 'notiflix';
import { MyErrorStateMatcher } from '../admin/auth/services/matcher/matcher.service';
import { StoryService } from '../admin/services/story/story.service';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.css']
})
export class DiscussionsComponent implements OnInit {
  img = 'https://res.cloudinary.com/benie/image/upload/v1669953692/undraw_news_re_6uub_mtilyp.svg';
  constructor(
    private _bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit(): void {
  }
  back(){
    history.back();
  }
  followBottomSheet(): void {
    this._bottomSheet.open(FollowBottomSheet);
  }

}

@Component({
  selector: 'follow-bottom-sheet',
  templateUrl: 'follow.html',
})
export class FollowBottomSheet {
  currentSite = window.location.href;
  values = '';
  subInput: boolean = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<FollowBottomSheet>,
    private storyService:StoryService,
    ) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
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
  subKey(event: any){
    this.values = event.target.value;
    if(this.values){
      this.subInput = true;
    }
  }
 
}
