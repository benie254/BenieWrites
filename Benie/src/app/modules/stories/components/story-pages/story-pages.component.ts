import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { StoryService } from 'src/app/modules/admin/services/story/story.service';
import { MyStoryService } from 'src/app/services/story/my-story.service';

@Component({
  selector: 'app-story-pages',
  templateUrl: './story-pages.component.html',
  styleUrls: ['./story-pages.component.css']
})
export class StoryPagesComponent implements OnInit {
  values = '';
  noInput: boolean = true;
  chapterPages: any;
  chapDet: any;
  chaps: any;
  hide: boolean = false;
  story: any;
  myStory: any;
  storyId: any;
  chapId: any;
  storyLikes: any;
  storyComments: any;
  topComments: any;
  liked = 'like';
  page: number = 1;
  count: number = 0;
  tableSize: number = 1;
  tableSizes: any = [2, 5, 10, 15];
  id: number;
  readTime: number;
  words: number = 200;
  readGen: any;
  readHrs: any;
  readSecs: any;
  st: any;
  authorImg = 'https://res.cloudinary.com/benie/image/upload/v1667972682/h02js8etvetdr5ctbmtf.jpg';
  

  constructor(
    private _bottomSheet: MatBottomSheet,
    public service: MyStoryService,
    private route:ActivatedRoute,
    private router:Router,
    private storyService: StoryService,
  ) { }

  ngOnInit(): void {
    // this.storyChaps();
    this.route.params.subscribe(params => this.chapDetails(params['id']));
    this.route.params.subscribe(params => this.chapPages(params['id']));
  }
  likeStory = (data: any): void => {
    Notiflix.Loading.pulse('Processing...')
    this.service.addReaction(data).subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        Notiflix.Notify.success("Story liked!")
        this.ngOnInit();
      }
    })
  }
  commentStory = (data: any): void => {
    Notiflix.Loading.pulse('Processing...')
    this.storyService.addFeedback(data).subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        Notiflix.Notify.success("Comment added!")
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
        this.topComments = this.storyComments.slice(0,2);
        console.warn(this.topComments,"tc")
        console.warn("comments",res)
      }
    })
  }
  
  
  
  chapDetails(id){
    this.service.getChapDetails(id).subscribe({
      next: (res) => {
        this.chapDet = res;
        this.readTime = Math.floor(this.chapDet.words/this.words);
      }
    })
  }
  storyDetails(id: any){
    this.service.getStoryDetails(id).subscribe({
      next: (res) => {
        this.story = res;
        console.warn("tags",res)
        this.storyFeedbacks(this.story.id);
        this.storyReactions(this.story.id);
        this.readGen = this.story.words/this.words;
        if(this.readGen >= 60){
          this.readHrs = this.readGen/60;
          let hrs = this.readHrs.toFixed(1)
          let secs = (hrs+"").split(".")[1];
          const mins = parseInt(secs)/10 * 60;
          this.readHrs = Math.floor(this.readHrs) + ' hrs ' + mins + ' mins'
        }else if(this.readGen < 1){
          this.readSecs = Math.round(this.readGen * 60) + ' secs';
        }else{
          this.readGen = this.story.words/this.words;
          let read = this.readGen.toFixed(1);
          let deci = (read+"").split(".")[1];
          const sec = parseInt(deci)/10 * 60;
          this.readGen = Math.floor(read) + ' mins ' + sec + ' secs';
        }
      }
    })
  }
  storyChaps(id: any){
    this.service.getStoryChapters(id).subscribe({
      next: (res) => {
        this.chaps = res;
        console.warn(res,"chaps")
      }
    })
  }
  copy = (text: any): void => {
    localStorage.removeItem('chapId');
    localStorage.setItem('chapId',text);
    this.chapId = localStorage.getItem('chapId');
    console.warn('chap id:',this.chapId)
    this.router.navigate(['/read/story/chapter/' + this.chapId]);
    setTimeout(() => {
      location.reload();
    },0)
    
  }
  chapPages(id: any){
    Notiflix.Loading.pulse('Fetching...');
    this.service.getChapterPages(id).subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        this.chapterPages = res;
        console.warn("chap pages",res);
        this.storyId = localStorage.getItem('storyId');
        this.storyDetails(this.storyId);
        this.storyChaps(this.storyId);
      }
    })
  }
  changeBg(event: any){
    const myDiv = (<HTMLDivElement>document.getElementById('readSBg'));
    const content = (<HTMLDivElement>document.getElementById('sContent'));
    const back = document.getElementById('back');
    const toggle = document.getElementById('toggle');
    const share = document.getElementById('share');
    const follow = document.getElementById('follow');
    const exp = document.getElementById('expansion');
    if(myDiv.style.backgroundColor == 'whitesmoke'){
      myDiv.style.backgroundColor = 'rgb(33, 33, 33)';
      myDiv.style.color = 'whitesmoke';
      content.style.backgroundColor = 'rgb(31, 39, 44)';
      back.style.backgroundColor = 'rgb(31, 39, 44)';
      toggle.style.backgroundColor = 'rgb(31, 39, 44)';
      share.style.backgroundColor = 'rgb(31, 39, 44)';
      follow.style.backgroundColor = 'rgb(31, 39, 44)';
      exp.style.backgroundColor = 'rgb(31, 39, 44)';
    }else{
      myDiv.style.backgroundColor = 'whitesmoke';
      content.style.backgroundColor = 'white';
      myDiv.style.color = 'black';
      back.style.backgroundColor = 'whitesmoke';
      toggle.style.backgroundColor = 'whitesmoke';
      share.style.backgroundColor = 'whitesmoke';
      follow.style.backgroundColor = 'whitesmoke';
      exp.style.backgroundColor = 'whitesmoke';
    }
  }
  back(){
    this.router.navigate(['/stories/' + this.story.title + '/' + this.storyId])
  }
  onTableDataChange = (event: any): void => {
    this.page = event;
    this.storyChaps(this.story.id);
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.storyChaps(this.story.id);
  }
  onKey(event: any){
    this.values = event.target.value;
    if(this.values){
      this.noInput = false;
    }
  }
  openBottomSheet(): void {
    this._bottomSheet.open(StoryDialog);
  }
  followBottomSheet(): void {
    this._bottomSheet.open(FollowAltBottomSheet);
  }

 
  

}

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'share.html',
})
export class StoryDialog {
  storyLink = '';
  currentSite = window.location.href;

  constructor(private _bottomSheetRef: MatBottomSheetRef<StoryDialog>) {}

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
  templateUrl: 'follow-alt.html',
})
export class FollowAltBottomSheet {
  currentSite = window.location.href;
  values = '';
  subInput: boolean = false;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<FollowAltBottomSheet>,
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