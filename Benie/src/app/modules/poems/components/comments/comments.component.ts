import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import * as Notiflix from 'notiflix';
import { Feedback } from 'src/app/classes/feedback/feedback';
import { AdminPoetryService } from 'src/app/modules/admin/services/poetry/poetry.service';
import { PoetryService } from '../../services/poetry.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit {
  panelOpenState = false;
  @Input() comments: any;
  @Input() topComments: any;
  @Input() likeComment: (data: any) => void;
  @Input() replyComment: (data: any) => void;
  commentLikes: any[] = [];
  liked = 'like';
  selectedId: any;
  showRep = false;
  @Input() trackByFn: () => void;
  commentReplies: any;

  constructor(
    private poetryService:PoetryService,
    private _bottomSheet: MatBottomSheet,
  ) { 
  }

  ngOnInit(): void {
  }

  copy(text: any){
    localStorage.setItem("commentId",text);
    this.selectedId = localStorage.getItem('commentId');
    this.commentFeedbacks(this.selectedId);
  }
  commentFeedbacks(id: any){
    this.poetryService.commentReplies(id).subscribe({
      next: (res) => {
        this.commentReplies = res;
      }
    })
  }
  openBottomSheet(): void {
    this._bottomSheet.open(RepliesBottomSheet, {
      data: {myId: this.selectedId},
    });
  }
}

@Component({
  selector: 'feedback-bottom-sheet',
  templateUrl: 'replies.html',
  styleUrls: ['./comments.component.css']
})
export class RepliesBottomSheet implements OnInit {
  det: any;
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
      next: (res: Feedback) => {
        this.cReplies = res;
      }
    })
  }
  commentDetails(){
    Notiflix.Loading.pulse('fetching replies...')
    this.adminPoetry.commentDetails(this.data.myId).subscribe({
      next: (res: Feedback) => {
        Notiflix.Loading.remove();
        this.det = res;
      }
    })
  }
  replyComment = (data: Feedback): void => {
    Notiflix.Loading.pulse('posting reply...')
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
}
