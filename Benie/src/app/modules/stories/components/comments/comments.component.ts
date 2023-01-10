import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatBottomSheet } from '@angular/material/bottom-sheet';
import * as Notiflix from 'notiflix';
import { Feedback } from 'src/app/classes/feedback/feedback';
import { Reaction } from 'src/app/classes/reaction/reaction';
import { AdminPoetryService } from 'src/app/modules/admin/services/poetry/poetry.service';
import { PoetryService } from 'src/app/modules/poems/services/poetry.service';
import { MyStoryService } from 'src/app/services/story/my-story.service';

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
  commId: any;
  commentLikes: any;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private poetryService:PoetryService,
    private storyService:MyStoryService,
  ) { }

  ngOnInit(): void {
  }
  public trackByFn = (index, item): void => {
    return item.id;
  }
  copyC = (text: any): void => {
    setTimeout(() => {
      localStorage.removeItem("commId");
      localStorage.setItem("commId",text);
      this.commId = localStorage.getItem('commId');
      this.commentReactions(this.commId)
    },1000)
  }
  commentReactions(id: number){
    this.poetryService.commentReplies(id).subscribe({
      next: (res) => {
        this.commentLikes = res;
        console.warn("comment likes",res);
      }
    })
  }
  copyComment = (text: any): void => {
    setTimeout(() => {
      localStorage.removeItem("commentId");
    localStorage.setItem("commentId",text);
    this.commentId = localStorage.getItem('commentId');
    this.commentFeedbacks(this.commentId)
    },1000)
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
  commentId: any;

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
  copyComment(text: any){
    setTimeout(() => {
      localStorage.removeItem("commentId");
      localStorage.setItem("commentId",text);
      this.commentId = localStorage.getItem("commentId");
      this.commentFeeds(this.commentId);
    },2000)
  }
  commentFeeds(id: any){
    this.poetryService.commentReplies(id).subscribe({
      next: (res) => {
        this.cReplies = res;
      }
    })
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
    },1000)
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
