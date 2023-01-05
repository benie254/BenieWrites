import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { StoryService } from 'src/app/modules/admin/services/story/story.service';
import { PoetryService } from '../../services/poetry.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  text = 'So, we live–we make merry, as the winds in daylight. we leep going with every s the winds in daylight. we leep going with ev single and every worthy breath we draw and daaww We are unstoppable, formidable  make merry, as the winds in daylight. we leep going with every s the winds in daylight. we leep going with ev single and every worthy breath we draw and daaww We are unstoppable, formidab';
  locale: any;
  @Input() poemId: number;
  details: any;
  poemCategory = '';
  related: any;
  topRelated: any;
  allPoems: any;
  poems: any;
  count = 0;
  words = 150;

  today = new Date();
  readTime: any;
  readGen: any;

  

  constructor(
    private _bottomSheet: MatBottomSheet,
    private router:Router,
    private poetryService:PoetryService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => this.poemDetails(params['id'])
    )
    this.getAllPoems();
  }
  getAllPoems(){
    Notiflix.Loading.pulse('Retrieving...')
    this.poetryService.getAllPoems().subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        this.allPoems = res;
        this.poems = res.slice(0,2);
        this.count = parseInt(this.allPoems.length) - parseInt(this.poems.length);
      }
    })
  }
  poemDetails(id: number){
    this.poetryService.getPoemDetails(id).subscribe({
      next: (res) => {
        this.details = res;
        this.poemCategory = res.category;
        this.relatedPoems();
        this.readGen = this.details.words/this.words;
        if(this.readGen >= 60){
          let readHrs: any = this.readGen/60;
          let hrs = readHrs.toFixed(1)
          let secs = (hrs+"").split(".")[1];
          const mins = parseInt(secs)/10 * 60;
          readHrs = Math.floor(readHrs) + ' hrs ' + mins + ' mins';
          this.readTime = readHrs;
        }else if(this.readGen < 1){
          let readSecs = Math.round(this.readGen * 60) + ' secs';
          this.readTime = readSecs;
        }else{
          this.readGen = this.details.words/this.words;
          let read = this.readGen.toFixed(1);
          let deci = (read+"").split(".")[1];
          const sec = parseInt(deci)/10 * 60;
          this.readGen = Math.floor(read) + ' mins ' + sec + ' secs';
          this.readTime = this.readGen;
        }
      }
    })
  }
  relatedPoems(){
    this.poetryService.getRelatedPoems(this.poemCategory).subscribe({
      next: (res) => {
        this.related = res;
        this.topRelated = res.slice(0,2);
      }
    })
  }
  
  poemReactions(id: any){
  }
  poemFeedbacks(id: any){
  }
  
  changeBg(event: any){
    const myDiv = (<HTMLDivElement>document.getElementById('readBg'));
    const content = (<HTMLDivElement>document.getElementById('content'));
    const related = (<HTMLDivElement>document.getElementById('content-1'));
    const recent = (<HTMLDivElement>document.getElementById('content-2'));
    const comment = (<HTMLDivElement>document.getElementById('comment'));
    const read = (<HTMLDivElement>document.getElementById('reader'));
    const exp = (<HTMLDivElement>document.getElementById('expansion'));
    const comments = document.getElementById('comments');
    const search = document.getElementById('search');
    const filter = document.getElementById('filter');
    const footer = document.getElementById('footer');
    const back = document.getElementById('back');
    const toggle = document.getElementById('toggle');
    const share = document.getElementById('share');
    const follow = document.getElementById('follow');
    const filterIn = document.getElementById('exampleDataList');
    const searchIn = document.getElementById('searchInput');
    if(myDiv.style.backgroundColor == 'whitesmoke'){
      myDiv.style.backgroundColor = 'rgb(33, 33, 33)';
      myDiv.style.color = 'whitesmoke';
      comments.style.color = 'whitesmoke';
      recent.style.color = 'whitesmoke';
      filterIn.style.color = 'white';
      searchIn.style.color = 'white';
      content.style.backgroundColor = 'rgb(31, 39, 44)';
      related.style.backgroundColor = 'rgb(31, 39, 44)';
      recent.style.backgroundColor = 'rgb(31, 39, 44)';
      comment.style.backgroundColor = 'rgb(31, 39, 44)';
      exp.style.backgroundColor = 'rgb(31, 39, 44)';
      exp.style.backgroundColor = 'rgb(31, 39, 44)';
      search.style.backgroundColor = 'rgb(31, 39, 44)';
      filter.style.backgroundColor = 'rgb(31, 39, 44)';
      footer.style.backgroundColor = 'rgb(31, 39, 44)';
      back.style.backgroundColor = 'rgb(31, 39, 44)';
      toggle.style.backgroundColor = 'rgb(31, 39, 44)';
      share.style.backgroundColor = 'rgb(31, 39, 44)';
      follow.style.backgroundColor = 'rgb(31, 39, 44)';
    }else{
      myDiv.style.backgroundColor = 'whitesmoke';
      content.style.backgroundColor = 'white';
      myDiv.style.color = 'black';
      comments.style.color = 'black';
      recent.style.color = 'black';
      filterIn.style.color = 'black';
      searchIn.style.color = 'black';
      comment.style.backgroundColor = 'white';
      related.style.backgroundColor = 'white';
      exp.style.backgroundColor = 'white';
      recent.style.backgroundColor = 'white';
      search.style.backgroundColor = 'whitesmoke';
      filter.style.backgroundColor = 'whitesmoke';
      footer.style.backgroundColor = 'white';
      back.style.backgroundColor = 'whitesmoke';
      toggle.style.backgroundColor = 'whitesmoke';
      share.style.backgroundColor = 'whitesmoke';
      follow.style.backgroundColor = 'whitesmoke';
    }
  }
  back(){
    history.back();
  }
  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }
  followBottomSheet(): void {
    this._bottomSheet.open(FollowerBottomSheet);
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
  selector: 'follower-bottom-sheet',
  templateUrl: 'follow.html',
})
export class FollowerBottomSheet {
  currentSite = window.location.href;
  values = '';
  subInput: boolean = false;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<FollowerBottomSheet>,
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

