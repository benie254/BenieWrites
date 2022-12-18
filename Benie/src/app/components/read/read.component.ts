import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { NgOptimizedImage } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { MyStoryService } from 'src/app/services/story/my-story.service';

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

  constructor(
    private _bottomSheet: MatBottomSheet,
    private service:MyStoryService,
    private route:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.msg = "";
    this.id = this.route.snapshot.params['id'];
    this.route.params.subscribe(params => this.storyDetails(params['id']));
    this.route.params.subscribe(params => this.storyChaps(params['id']));
  }
  storyDetails(id: number){
    this.service.getStoryDetails(id).subscribe({
      next: (res) => {
        this.story = res;
      }
    })
  }
  storyChaps(id: number){
    this.service.getStoryChapters(id).subscribe({
      next: (res) => {
        this.chaps = res;
        console.warn(res,"chaps")
      }
    })
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
    history.back();
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
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
