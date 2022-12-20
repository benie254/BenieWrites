import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Editor } from 'ngx-editor';
import * as Notiflix from 'notiflix';
import { MyStoryService } from 'src/app/services/story/my-story.service';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { User } from '../../../classes/user/user';
import { StoryService } from '../../../services/story/story.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
  delConfirmed: boolean = false;
  currentUser!: User;
  @Input() selected: any
  showData: boolean = false;
  hideContent: boolean= false;
  showEdit: boolean = false;
  @Input() chaps: any;
  editor: Editor;
  html: '';
  details!: any;
  chapDetails: any;
  chapDes = new FormControl('');
  pageForm = this.fb.group({
    title: [''],
    description: [''],
    first_published: [''],
    story: [0],
  })
  htmlContent = '';
  htmlContentWithoutStyles='';
  values = '';
  counted: any;
  limitReached: boolean = false;
  stories: any;

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
  showHTML(){
    this.htmlContentWithoutStyles=document.getElementById("htmlDiv").innerHTML;
  }

  constructor(
    private service:StoryService,
    private auth:AuthService,
    private storiesService:MyStoryService,
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.editor = new Editor();
    // this.pageForm.push(this.description.control(''));
    // const html = toHTML(schema);
    this.itemDetails();
    if(this.auth.currentUserValue){
      this.currentUser = this.auth.currentUserValue;
    }else{
      !this.currentUser;
    }
    this.storiesService.getAllStories().subscribe({
      next: (res) => {
        this.stories = res;
      }
    })
  }
  editItem(data: any){
    this.service.editPage(this.selected,data).subscribe({
      next: (res) => {
        Notiflix.Notify.success('Updated!');
        this.ngOnInit();
      }
    })
  }
  itemDetails(){
    Notiflix.Loading.dots('Loading...');
    this.service.getPageDetails(this.selected).subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        this.details = res;
      }
    })
  }
  delete(){
    Notiflix.Loading.arrows('Deleting... please wait.')
    this.service.deletePage(this.selected).subscribe({
      next: (res) => {
        Notiflix.Report.success(
          "Deleted!",
          'The page was deleted successfully.',
          'Great',
        )
        Notiflix.Loading.remove();
      }
    })
  }
  delWarn(){
    Notiflix.Confirm.show(
      'Confirm delete',
      "Are you sure you want to delete this page? This action cannot be undone",
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

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}

