import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { NgOptimizedImage } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
import { MyStoryService } from 'src/app/services/story/my-story.service';
import * as Notiflix from 'notiflix';
import { StoryService } from 'src/app/modules/admin/services/story/story.service';
import { AdminPoetryService } from 'src/app/modules/admin/services/poetry/poetry.service';
import { PoetryService } from 'src/app/modules/poems/services/poetry.service';
import { MyErrorStateMatcher } from 'src/app/modules/admin/auth/services/matcher/matcher.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  msg = '';
  isLinear = false;
  isOptional = true;
  isEditable = false;
  values = '';
  noInput: boolean = true;
  story: any;
  chaps: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 1;
  tableSizes: any = [2, 5, 10, 15];
  id: number;
  selectedId: any;
  commentId: any;
  chapSelected: boolean = false;
  chapterPages: any;
  chapDet: any;
  show: boolean = false;
  hide: boolean = false;
  storyDet: any;
  chapId: any;
  firstChap: any;
  liked: string = 'like';
  like = 'like';
  storyLikes: any;
  storyComments: any;
  views: string[] = [];
  panelOpenState = false;
  topComments: any;
  words: number = 200;
  readTime: any;
  readSecs: any;
  readHrs: any;
  commentLikes: any;
  commentReplies: any;
  storyId: any;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private service:MyStoryService,
    private stoyService: StoryService,
    private route:ActivatedRoute,
    private router:Router,
    private poetryService:PoetryService
  ) { }


  ngOnInit(): void {
    this.bg();
    this.msg = "";
    this.id = this.route.snapshot.params['id'];
    this.route.params.subscribe(
      params => {
        this.storyDetails(params['id']),
        this.storyReactions(params['id'])
        this.storyFeedbacks(params['id']),
        this.storyChaps(params['id']),
        this.chapDetails(params['id'])
      }
    )
  }
  public trackByFn = (index, item): void => {
    return item.id;
  }
  likeStory = (data: any): void => {
    Notiflix.Loading.pulse('processing...')
    this.service.addReaction(data).subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        Notiflix.Notify.success("story liked!")
        this.ngOnInit();
      }
    })
  }
  commentStory = (data: any): void => {
    Notiflix.Loading.pulse('posting comment...')
    setTimeout(() => {
      Notiflix.Notify.success("comment added!");
      Notiflix.Loading.remove();
    },200)
    this.stoyService.addFeedback(data).subscribe({
      next: (res) => {
        this.ngOnInit();
        this.values = '';
      }
    })
  }
  storyReactions(id: any){
    this.service.getStoryReactions(id).subscribe({
      next: (res) => {
        this.storyLikes = res;
      }
    })
  }
  storyFeedbacks(id: any){
    this.service.getStoryFeedbacks(id).subscribe({
      next: (res) => {
        this.storyComments = res;
        this.topComments = res.slice(0,2);
        console.warn(this.topComments,"tc")
        for (let id of this.storyComments){
          this.commentReactions(id.id);
        }
      }
    })
  }
  commentReactions(id: number){
    this.poetryService.commentLikes(id).subscribe({
      next: (res) => {
        this.commentLikes = res;
        console.warn("comment likes",res);
      }
    })
  }
  
  goToChap = (): void => {
    this.show = true;
  }
  storyDetails(id: number){
    Notiflix.Loading.pulse('Fetching...')
    this.service.getStoryDetails(id).subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        this.story = res;
        localStorage.setItem('storyId',this.story.id);
        this.storyId = res.id;
        this.readTime = this.story.words/this.words;
        if(this.readTime >= 60){
          this.readHrs = this.readTime/60;
          let hrs = this.readHrs.toFixed(1)
          let secs = (hrs+"").split(".")[1];
          const mins = parseInt(secs)/10 * 60;
          this.readHrs = Math.floor(this.readHrs) + ' hrs ' + mins + ' mins'
        }else if(this.readTime < 1){
          this.readSecs = Math.round(this.readTime * 60) + ' secs';
        }else{
          this.readTime = this.story.words/this.words;
          let read = this.readTime.toFixed(1);
          let deci = (read+"").split(".")[1];
          const sec = parseInt(deci)/10 * 60;
          this.readTime = Math.floor(read) + ' mins ' + sec + ' secs';
        }
      }
    })
  }
  copy = (text: any): void => {
    localStorage.removeItem('chapId');
    localStorage.setItem('chapId',text);
    this.chapId = localStorage.getItem('chapId');
    if(this.story.category !== 'flash-fiction'){
      this.router.navigate(['/stories/' + this.story.category + '/' + this.story.title + '/chapter/' + this.chapId]);
    }else {
      this.router.navigate(['/stories/' + this.story.category + '/' + this.story.title + '/read/' + this.chapId]);
    }
  }
  
  
  
  storyChaps(id: any){
    this.service.getStoryChapters(id).subscribe({
      next: (res) => {
        this.chaps = res;
        console.warn(res,"chaps")
        this.firstChap = this.chaps[0];
      }
    })
  }
  checkId(){
    // alert("a")
    let cId = parseInt(document.getElementById('chapId').textContent) +1;
    // this.chapPages(cId);
    // console.warn("s")
  }
  prevId(){
    let cId = parseInt(document.getElementById('chapId').textContent);
    // this.chapPages(cId);
    console.warn("s")
  }
  chapPages(id: any){
    
    this.service.getChapterPages(id).subscribe({
      next: (res) => {
        this.chapterPages = res;
        console.warn("chap pages:",res)
      }
    })
  }
  
  selectChap(){
    this.chapSelected = true;
  }
  
  onTableDataChange = (event: any): void => {
    this.page = event;
    this.storyChaps(this.id);
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.storyChaps(this.id);
  }
  bg(){
    const footer = document.getElementById('footer');
    footer.style.backgroundColor = 'rgb(31, 39, 44)';
  }
  changeBg(event: any){
    const myDiv = (<HTMLDivElement>document.getElementById('readBg'));
    const content = (<HTMLDivElement>document.getElementById('content'));
    const back = document.getElementById('back');
    const toggle = document.getElementById('toggle');
    const share = document.getElementById('share');
    const follow = document.getElementById('follow');
    const exp = document.getElementById('expansion');
    const footer = document.getElementById('footer');
    if(myDiv.style.backgroundColor == 'whitesmoke'){
      myDiv.style.backgroundColor = 'rgb(33, 33, 33)';
      myDiv.style.color = 'whitesmoke';
      content.style.backgroundColor = 'rgb(31, 39, 44)';
      back.style.backgroundColor = 'rgb(31, 39, 44)';
      toggle.style.backgroundColor = 'rgb(31, 39, 44)';
      share.style.backgroundColor = 'rgb(31, 39, 44)';
      follow.style.backgroundColor = 'rgb(31, 39, 44)';
      exp.style.backgroundColor = 'rgb(31, 39, 44)';
      footer.style.backgroundColor = 'rgb(31, 39, 44)';
    }else{
      myDiv.style.backgroundColor = 'whitesmoke';
      content.style.backgroundColor = 'white';
      myDiv.style.color = 'black';
      content.style.backgroundColor = 'white';
      back.style.backgroundColor = 'whitesmoke';
      toggle.style.backgroundColor = 'whitesmoke';
      share.style.backgroundColor = 'whitesmoke';
      follow.style.backgroundColor = 'whitesmoke';
      exp.style.backgroundColor = 'whitesmoke';
      footer.style.backgroundColor = 'whitesmoke';
    }
  }
  back(){
    this.router.navigate(['/stories/library'])
  }
  likeComment = (data: any): void => {
    Notiflix.Loading.pulse('processing...');
    this.poetryService.likeComment(data).subscribe({
      next: (res) => {
        setTimeout( () => {
          Notiflix.Loading.remove();
          Notiflix.Notify.success('comment liked!');
          this.ngOnInit();
        },500)
      }
    })
  }
  replyComment(data: any){
    this.poetryService.replyComment(data).subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        Notiflix.Notify.success('reply posted!')
        this.ngOnInit();
        setTimeout( () => {
          location.reload();
        }, 10
        )
      }
    })
  }
  copyComment = (text: any): void => {
    localStorage.removeItem("commentId");
    localStorage.setItem("commentId",text);
    this.commentId = localStorage.getItem('commentId');
    this.commentFeedbacks(this.commentId)
  }
  commentFeedbacks(id: number){
    this.poetryService.commentReplies(id).subscribe({
      next: (res) => {
        this.commentReplies = res;
        console.warn("comment likes",res);
      }
    })
  }
  
 
  chapDetails(id: number){
    return this.service.getChapDetails(id).subscribe({
      next: (res) => {
        this.chapDet = res;
      }
    })
  }
  checkViews(){
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === 'visible') {
        this.views.push("active");
        Notiflix.Notify.success("active")
      } else {
        this.views.push("inactive");
        Notiflix.Notify.failure("inactive")
      }
    });
  }
  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }
  followBottomSheet(): void {
    this._bottomSheet.open(FollowBottomSheet);
  }
  

 
  

}

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'share.html',
})
export class BottomSheetOverviewExampleSheet {
  storyLink = '';
  currentSite = window.location.href;

  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}

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
export class FollowBottomSheet {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<FollowBottomSheet>,
    private storyService:StoryService,
    ) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
 
}

