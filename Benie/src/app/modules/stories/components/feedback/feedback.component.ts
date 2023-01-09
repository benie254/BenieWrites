import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import * as Notiflix from 'notiflix';
import { Story } from 'src/app/classes/story/story';
import { MyErrorStateMatcher } from 'src/app/modules/admin/auth/services/matcher/matcher.service';
import { AdminPoetryService } from 'src/app/modules/admin/services/poetry/poetry.service';
import { StoryService } from 'src/app/modules/admin/services/story/story.service';
import { PoetryService } from 'src/app/modules/poems/services/poetry.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  @Input() likeStory: (data: Story) => void;
  @Input() commentStory: (data: Story) => void;
  @Input() storyId: any;
  @Input() storyLikes: any;
  @Input() storyComments: any;
  liked = 'like';
  noInput = true;
  values = '';
  chapterId = '';
  poemId = '';


  constructor(
    private _bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit(): void {
  }
  onKey(event: any){
    this.values = event.target.value;
    if(this.values){
      this.noInput = false;
    }
  }
  followBottomSheet(): void {
    this._bottomSheet.open(FollowAlt2BottomSheet);
  }
  openShareBottomSheet(): void {
    this._bottomSheet.open(ShareBottomSheet);
  }

}

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'share.html',
})
export class ShareBottomSheet {
  storyLink = '';
  currentSite = window.location.href;

  constructor(private _bottomSheetRef: MatBottomSheetRef<ShareBottomSheet>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
  myLink(){
    this.copyLink(window.location.href);
  }
  copyLink(text: any){
    localStorage.setItem('myLink',text);
    this.storyLink = localStorage.getItem('myLink')
    console.warn("my link",this.storyLink)
    this.clipBoard(this.storyLink)
  }
  clipBoard(text: any){
    navigator.clipboard.writeText(text);
    Notiflix.Notify.success('Link Copied!')    
  }
}

@Component({
  selector: 'follow-bottom-sheet',
  templateUrl: 'follow.html',
})
export class FollowAlt2BottomSheet {
  currentSite = window.location.href;
  values = '';
  subInput: boolean = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<FollowAlt2BottomSheet>,
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


