import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import * as Notiflix from 'notiflix';
import { Subscriber } from 'src/app/classes/subscriber/subscriber';
import { MyErrorStateMatcher } from 'src/app/modules/admin/auth/services/matcher/matcher.service';
import { StoryService } from 'src/app/modules/admin/services/story/story.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  values = '';
  noInput = true;
  liked = 'like';
  @Input() poemId: any;
  @Input() likes: any;
  @Input() comments: any;
  @Input() likePoem: (data: any) => void;
  @Input() commentPoem: (data: any) => void;
  storyId = '';
  chapterId = '';

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
  openBottomSheet(): void {
    this._bottomSheet.open(FeedbackBottomSheet);
  }
  followBottomSheet(): void {
    this._bottomSheet.open(FollowBottomSheet);
  }
}

@Component({
  selector: 'feedback-bottom-sheet',
  templateUrl: 'share.html',
})
export class FeedbackBottomSheet {
  storyLink = '';
  currentSite = window.location.href;

  constructor(private _bottomSheetRef: MatBottomSheetRef<FeedbackBottomSheet>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
  myLink(){
    this.copyLink(this.currentSite);
  }
  copyLink(text: any){
    localStorage.setItem('myLink',text);
    this.storyLink = localStorage.getItem('myLink')
    this.clipBoard(this.storyLink)
  }
  clipBoard(text: any){
    navigator.clipboard.writeText(text);
    Notiflix.Notify.success('link copied!')    
  }
}

@Component({
  selector: 'follow-bottom-sheet',
  templateUrl: 'follow.html',
})
export class FollowBottomSheet {
  followImg = 'https://res.cloudinary.com/benie/image/upload/v1668273866/Humaaans_-_Space_xjvahn.png';
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
  subscribe(data: Subscriber){
    Notiflix.Loading.pulse('Processing...')
    this.storyService.addSub(data).subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        Notiflix.Report.success(
          'Subscribed!',
          'Your subscription was successful. Please check your email.',
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



