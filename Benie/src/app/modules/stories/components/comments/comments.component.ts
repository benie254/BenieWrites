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
  panelOpenState = false;
  @Input() storyId: any;
  commentReplies: any;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private poetryService:PoetryService,
  ) { }

  ngOnInit(): void {
  }
  public trackByFn = (index, item): void => {
    return item.id;
  }
  copyComment = (text: any): void => {
    localStorage.removeItem("commentId");
    localStorage.setItem("commentId",text);
    this.commentId = localStorage.getItem('commentId');
    this.commentFeedbacks(this.commentId)
  }
  replyBottomSheet(): void {
    setTimeout(() => {
      this._bottomSheet.open(RepliesBottomSheet, {
        data: {myId: this.commentId, sId: this.storyId},
      });
    },15)
  }
  commentFeedbacks(id: number){
    this.poetryService.commentReplies(id).subscribe({
      next: (res) => {
        this.commentReplies = res;
        console.warn("comment likes",res);
      }
    })
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
  storyId = this.data.sId;
  poemId = '';

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {myId: any, sId: any},
    private _bottomSheetRef: MatBottomSheetRef<RepliesBottomSheet>,
    private adminPoetry:AdminPoetryService,
    private poetryService:PoetryService,
    ) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  ngOnInit(){
    this.commentDetails();
    this.commentFeedbacks();
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
    Notiflix.Loading.pulse('posting reply...')
    setTimeout(() => {
      Notiflix.Notify.success("reply added!");
      Notiflix.Loading.remove();
    },100)
    this.poetryService.replyComment(data).subscribe({
      next: (res) => {
        this.ngOnInit();
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
