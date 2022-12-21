import { Component, Input, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
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
    },10)
    
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
    if(myDiv.style.backgroundColor == 'whitesmoke'){
      myDiv.style.backgroundColor = 'rgb(33, 33, 33)';
      myDiv.style.color = 'whitesmoke';
      content.style.backgroundColor = 'rgb(31, 39, 44)';
    }else{
      myDiv.style.backgroundColor = 'whitesmoke';
      content.style.backgroundColor = 'white';
      myDiv.style.color = 'black';
    }
  }
  back(){
    this.router.navigate(['/read/story/' + this.storyId])
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
