import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Editor } from 'ngx-editor';
import * as Notiflix from 'notiflix';
import { StoryService } from '../../../services/story/story.service';

@Component({
  selector: 'app-add-chapter',
  templateUrl: './add-chapter.component.html',
  styleUrls: ['./add-chapter.component.css']
})
export class AddChapterComponent implements OnInit, OnDestroy {
  @Input() stories: any;
  @Input() dialogOp: boolean = false;
  value = 1;
  editor: Editor;
  html: '';
  dialogOpen: boolean = false;
  @Input() onNullClick: () => void;

  constructor(
    private storyService:StoryService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.editor = new Editor();
  }
  addItem(data: any){
    this.storyService.addChapter(data).subscribe({
      next: (res) => {

      }
    });
    Notiflix.Notify.success('Added!');
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
    this.dialogOpen = true
    const dialogRef = this.dialog.open(DialogForm, {
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
export class DialogForm {
  dialogOp: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<DialogForm>,
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