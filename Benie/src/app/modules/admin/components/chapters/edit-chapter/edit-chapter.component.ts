import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Editor, schema, toDoc, toHTML } from 'ngx-editor';
import * as Notiflix from 'notiflix';
import { MyStoryService } from 'src/app/services/story/my-story.service';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { User } from '../../../classes/user/user';
import { StoryService } from '../../../services/story/story.service';



@Component({
  selector: 'app-edit-chapter',
  templateUrl: './edit-chapter.component.html',
  styleUrls: ['./edit-chapter.component.css']
})
export class EditChapterComponent implements OnInit, OnDestroy {
  delConfirmed: boolean = false;
  currentUser!: User;
  @Input() selected: any
  showData: boolean = false;
  hideContent: boolean= false;
  showEdit: boolean = false;
  @Input() stories: any;
  editor: Editor;
  html: '';
  details!: any;
  chapDetails: any;
  chapDes = new FormControl('');
  chapterForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    first_published: new FormControl(''),
    story: new FormControl(0),
  })

  constructor(
    private service:StoryService,
    private auth:AuthService,
    private storiesService:MyStoryService

  ) { }

  ngOnInit(): void {
    this.editor = new Editor();
    // const html = toHTML(schema);
    this.itemDetails();
    if(this.auth.currentUserValue){
      this.currentUser = this.auth.currentUserValue;
    }else{
      !this.currentUser;
    }
  }
  editItem(data: any){
    this.service.editChapter(this.selected,data).subscribe({
      next: (res) => {
        Notiflix.Notify.success('Updated!');
      }
    })
  }
  itemDetails(){
    Notiflix.Loading.dots('Loading...');
    this.storiesService.getChapDetails(this.selected).subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        this.details = res;
        this.createChap(this.details.description);
      }
    })
  }
  createChap(htmlString){
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    this.chapDetails = div.firstChild;
    console.warn(this.chapDetails,"chap det")
  }
  delete(){
    Notiflix.Loading.arrows('Deleting... please wait.')
    this.service.deleteChapter(this.selected).subscribe({
      next: (res) => {
        Notiflix.Report.success(
          "Deleted!",
          'The chapter was deleted successfully.',
          'Great',
        )
        Notiflix.Loading.remove();
      }
    })
  }
  delWarn(){
    Notiflix.Confirm.show(
      'Confirm delete',
      "Are you sure you want to delete this chapter? This action cannot be undone",
      "I'm sure",
      "Take me back",
      () => {
        this.delConfirmed = true;
        this.delete();
        location.reload();
      },
      () => {
        Notiflix.Report.success(
          "Aborted!",
          "You have cancelled the delete request. In case you did so by mistake, please make a new request.",
          'Great',
        )
        this.delConfirmed = false;
      }
    )
  }
  redirect = (): void => {
    setTimeout(() => {
      this.openForm();
    }, 250)
  }
  openForm = (): void => {
    this.showData = true;
    this.hideContent = true;
    this.showEdit = false;
  }
  reload(){
    setTimeout(() => {
      location.reload();
    }, 250)
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}

