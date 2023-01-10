import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import * as Notiflix from 'notiflix';
import { Poem } from 'src/app/classes/poem/poem';
import { Reaction } from 'src/app/classes/reaction/reaction';
import { Subscriber } from 'src/app/classes/subscriber/subscriber';
import { MyErrorStateMatcher } from 'src/app/modules/admin/auth/services/matcher/matcher.service';
import { StoryService } from 'src/app/modules/admin/services/story/story.service';
import { PoetryService } from '../../services/poetry.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  authorImg = 'https://res.cloudinary.com/benie/image/upload/v1671555324/h02js8etvetdr5ctbmtf-removebg-preview_wge6nt.png';
  locale: any;
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
  likes: any;
  comments: any;
  poemId: any;
  topComments: any;
  commentLikes: any;
  commentReplies: any;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private poetryService:PoetryService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.poemDetails(params['id']),
        this.poemReactions(params['id']),
        this.poemFeedbacks(params['id'])
      } 
    )
    this.getAllPoems();
  }
  poemDetails(id: number){
    Notiflix.Loading.pulse("fetching poem...");
    this.poetryService.getPoemDetails(id).subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        this.details = res;
        this.poemId = res.id;
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
  public trackByFn = (index, item): void => {
    return item.id;
  }
  likePoem = (data: Poem): void => {
    Notiflix.Loading.pulse('processing...')
    this.poetryService.likePoem(data).subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        Notiflix.Notify.success('poem liked!')
        this.ngOnInit();
      }
    })
  }
  commentPoem = (data: Poem): void => {
    Notiflix.Loading.pulse('posting comment...')
    setTimeout(() => {
      Notiflix.Notify.success("comment added!");
      Notiflix.Loading.remove();
    },200)
    this.poetryService.commentPoem(data).subscribe({
      next: (res) => {
        this.ngOnInit();
      }
    })
  }
  poemReactions(id: any){
    this.poetryService.poemLikes(id).subscribe({
      next: (res: Reaction) => {
        this.likes = res;
      }
    })
  }
  poemFeedbacks(id: any){
    this.poetryService.poemComments(id).subscribe({
      next: (res) => {
        this.comments = res;
        this.topComments = res.slice(0,2);
        for (let id of this.comments){
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
  likeComment = (data: any): void => {
    Notiflix.Loading.remove();
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
  replyComment = (data: any): void => {
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
  getAllPoems(){
    this.poetryService.getAllPoems().subscribe({
      next: (res) => {
        this.allPoems = res;
        this.poems = res.slice(0,2);
        this.count = parseInt(this.allPoems.length) - parseInt(this.poems.length);
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
  
  
  changeBg(event: any){
    const myDiv = (<HTMLDivElement>document.getElementById('readBg'));
    const content = (<HTMLDivElement>document.getElementById('content'));
    const related = (<HTMLDivElement>document.getElementById('related'));
    const recent = (<HTMLDivElement>document.getElementById('recent'));
    const footer = document.getElementById('footer');
    const back = document.getElementById('back');
    const toggle = document.getElementById('toggle');
    const share = document.getElementById('share');
    const follow = document.getElementById('follow');
    const exp = document.getElementById('expansion');
    if(myDiv.style.backgroundColor == 'whitesmoke'){
      myDiv.style.backgroundColor = 'rgb(33, 33, 33)';
      myDiv.style.color = 'whitesmoke';
      related.style.color = 'white';
      recent.style.color = 'white';
      exp.style.color = 'white';
      exp.style.backgroundColor = 'rgb(31, 39, 44)';
      content.style.backgroundColor = 'rgb(31, 39, 44)';
      related.style.backgroundColor = 'rgb(31, 39, 44)';
      footer.style.backgroundColor = 'rgb(31, 39, 44)';
      back.style.backgroundColor = 'rgb(31, 39, 44)';
      toggle.style.backgroundColor = 'rgb(31, 39, 44)';
      share.style.backgroundColor = 'rgb(31, 39, 44)';
      follow.style.backgroundColor = 'rgb(31, 39, 44)';
      related.style.backgroundColor = 'rgb(31, 39, 44)';
      recent.style.backgroundColor = 'rgb(31, 39, 44)';
    }else{
      myDiv.style.backgroundColor = 'whitesmoke';
      content.style.backgroundColor = 'white';
      myDiv.style.color = 'black';
      related.style.color = 'black';
      recent.style.color = 'black';
      exp.style.color = 'black';
      related.style.backgroundColor = 'white';
      exp.style.backgroundColor = 'whitesmoke';
      recent.style.backgroundColor = 'white';
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
    this.copyLink(this.currentSite);
  }
  copyLink(text: any){
    localStorage.setItem('myLink',text);
    this.storyLink = localStorage.getItem('myLink')
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

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<FollowerBottomSheet>,
    ) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
 
}

