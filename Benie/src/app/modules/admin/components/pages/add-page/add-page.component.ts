import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Editor } from 'ngx-editor';
import * as Notiflix from 'notiflix';
import { StoryService } from '../../../services/story/story.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {
  @Input() chaps: any;
  dialogOp: boolean = false;
  value = 1;
  editor: Editor;
  htmlContent: '';
  values = '';
  counted: any;
  limitReached: boolean = false;
  html: '';

  constructor(
    private storyService:StoryService,
    public dialog: MatDialog,
  ) { }
  keyUp(event: any){
    this.values = event.target.value;
  }
  countWords(str) {
    const arr = str.split(' ');
  
    this.counted = arr.filter(word => word !== '').length;
    let words = document.getElementById('wordCount').textContent;
    if(words < '200' || words == '200'){
      this.limitReached = true;
    } else {
      this.limitReached = false;
    }
  }
  
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }
  addItem(data: any){
    this.storyService.addPage(data).subscribe({
      next: (res) => {
        Notiflix.Notify.success('Added!');
        this.ngOnInit();
      }
    });
  }
  reset(){
    const form = (<HTMLFormElement>document.getElementById('chapterForm'));
    setTimeout(() => {
      form.reset();
    }, 250)
  }
  reload(){
    setTimeout(() => {
      location.reload();
    }, 250)
  }
  openDialog(): void {
    this.dialogOp = true
    const dialogRef = this.dialog.open(PageDialogForm, {
      width: '500px',
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}

@Component({
  selector: 'dialog-form',
  templateUrl: 'dialog.html',
})
export class PageDialogForm {
  dialogOp: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<PageDialogForm>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    if(this.dialogRef){
      this.dialogOp = true;
    }
  }

  onNoClick = (): void => {
    this.dialogRef.close();
  }
}