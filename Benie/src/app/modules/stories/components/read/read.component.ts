import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { NgOptimizedImage } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
import { MyStoryService } from 'src/app/services/story/my-story.service';
import * as Notiflix from 'notiflix';
import { StoryService } from 'src/app/modules/admin/services/story/story.service';

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
  chapSelected: boolean = false;
  chapterPages: any;
  chapDet: any;
  show: boolean = false;
  hide: boolean = false;
  storyDet: any;
  chapId: any;
  firstChap: any;
  liked: string = 'like';
  storyLikes: any;
  storyComments: any;
  views: string[] = [];
  panelOpenState = false;
  topComments: any;
  words: number = 200;
  readTime: any;
  readSecs: any;
  readHrs: any;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private service:MyStoryService,
    private stoyService: StoryService,
    private route:ActivatedRoute,
    private router:Router
  ) { }


  ngOnInit(): void {
    this.msg = "";
    this.id = this.route.snapshot.params['id'];
    this.route.params.subscribe(params => this.storyDetails(params['id']));
    this.route.params.subscribe(params => this.storyChaps(params['id']));
    this.route.params.subscribe(params => this.chapDetails(params['id']));
    this.route.params.subscribe(params => this.storyReactions(params['id']));
    this.route.params.subscribe(params => this.storyFeedbacks(params['id']));
  }
  likeStory(data: any){
    Notiflix.Loading.pulse('Processing...')
    this.service.addReaction(data).subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        Notiflix.Notify.success("Story liked!")
        this.ngOnInit();
      }
    })
  }
  commentStory(data: any){
    Notiflix.Loading.pulse('Processing...')
    this.stoyService.addFeedback(data).subscribe({
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
        this.topComments = this.storyComments.slice(0,4);
        console.warn(this.topComments,"tc")
        console.warn("comments",res)
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
    console.warn('chap id:',this.chapId)
    this.router.navigate(['/stories/' + this.story.title + '/chapter/' + this.chapId]);
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
    Notiflix.Notify.success(cId.toString());
    // this.chapPages(cId);
    // console.warn("s")
  }
  prevId(){
    let cId = parseInt(document.getElementById('chapId').textContent);
    Notiflix.Notify.success(cId.toString());
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
  changeBg(event: any){
    const myDiv = (<HTMLDivElement>document.getElementById('readBg'));
    const content = (<HTMLDivElement>document.getElementById('content'));
    const comm = (<HTMLDivElement>document.getElementById('comment'));
    const read = (<HTMLDivElement>document.getElementById('reader'));
    if(myDiv.style.backgroundColor == 'whitesmoke'){
      myDiv.style.backgroundColor = 'rgb(33, 33, 33)';
      myDiv.style.color = 'whitesmoke';
      content.style.backgroundColor = 'rgb(31, 39, 44)';
      comm.style.backgroundColor = 'rgb(31, 39, 44)';
    }else{
      myDiv.style.backgroundColor = 'whitesmoke';
      content.style.backgroundColor = 'white';
      myDiv.style.color = 'black';
      content.style.backgroundColor = 'white';
    }
  }
  back(){
    this.router.navigate(['/'])
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
  onKey(event: any){
    this.values = event.target.value;
    if(this.values){
      this.noInput = false;
    }
  }
  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
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
