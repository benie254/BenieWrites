import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatBottomSheet } from '@angular/material/bottom-sheet';
import * as Notiflix from 'notiflix';
import { Feedback } from 'src/app/classes/feedback/feedback';
import { Reaction } from 'src/app/classes/reaction/reaction';
import { AdminPoetryService } from 'src/app/modules/admin/services/poetry/poetry.service';
import { PoetryService } from 'src/app/modules/poems/services/poetry.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() topComments: any;
  @Input() storyComments: any;
  @Input() commentId: any;
  @Input() likeComment: (data: Reaction) => void;
  @Input() copyComment: (text: any) => void;
  panelOpenState = false;

  constructor(
    private _bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit(): void {
  }
  public trackByFn = (index, item): void => {
    return item.id;
  }
  replyBottomSheet(): void {
    this._bottomSheet.open(RepliesBottomSheet, {
      data: {myId: this.commentId},
    });
  }

}

@Component({
  selector: 'feedback-bottom-sheet',
  templateUrl: 'replies.html',
})
export class RepliesBottomSheet implements OnInit {
  storyLink = '';
  currentSite = window.location.href;
  det: any;
  showRep = false;
  liked = 'like';
  cReplies: any;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {myId: any},
    private _bottomSheetRef: MatBottomSheetRef<RepliesBottomSheet>,
    private adminPoetry:AdminPoetryService,
    private poetryService:PoetryService,
    ) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  ngOnInit(){
    this.commentFeedbacks();
    this.commentDetails();
  }
  commentFeedbacks(){
    this.poetryService.commentReplies(this.data.myId).subscribe({
      next: (res) => {
        this.cReplies = res;
      }
    })
  }

  commentDetails(){
    Notiflix.Loading.pulse('fetching details...')
    this.adminPoetry.commentDetails(this.data.myId).subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        this.det = res;
      }
    })
  }
  replyComment = (data: any): void => {
    Notiflix.Loading.pulse('posting comment...')
    this.poetryService.replyComment(data).subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        Notiflix.Notify.success('reply posted!')
        this.ngOnInit();
        setTimeout(() => {
          location.reload();
        },5)
      }
    })
  }
  toggleRep(){
    this.showRep = true;
  }
  closeRep(){
    setTimeout(() => {
      this.showRep = false;
    },5)
  }
}
