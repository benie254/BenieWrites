import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';
import * as Notiflix from 'notiflix';
import { PoetryService } from 'src/app/modules/poems/services/poetry.service';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { User } from '../../../classes/user/user';
import { AdminPoetryService } from '../../../services/poetry/poetry.service';
import { Poem } from 'src/app/classes/poem/poem';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-edit-poem',
  templateUrl: './edit-poem.component.html',
  styleUrls: ['./edit-poem.component.css']
})
export class EditPoemComponent implements OnInit, OnDestroy {
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
  htmlContent = '';
  htmlContentWithoutStyles='';
  values = '';
  counted: any;
  limitReached: boolean = false;
  poems: any;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private service:PoetryService,
    private auth:AuthService,
    private adminPoetry:AdminPoetryService,

  ) { }

  ngOnInit(): void {
    this.editor = new Editor();
    this.itemDetails();
    if(this.auth.currentUserValue){
      this.currentUser = this.auth.currentUserValue;
    }else{
      !this.currentUser;
    }
    this.service.getAllPoems().subscribe({
      next: (res) => {
        this.poems = res;
      }
    })
  }
  editItem(data: Poem){
    this.adminPoetry.editPoem(this.selected,data).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (res) => {
        Notiflix.Notify.success('Updated!');
      }
    })
  }
  itemDetails(){
    Notiflix.Loading.dots('Loading...');
    this.service.getPoemDetails(this.selected).subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        this.details = res;
      }
    })
  }
  delete(){
    Notiflix.Loading.arrows('Deleting... please wait.')
    this.adminPoetry.deletePoem(this.selected).subscribe({
      next: (res) => {
        Notiflix.Report.success(
          "Deleted!",
          'The poem was deleted successfully.',
          'Great',
        )
        Notiflix.Loading.remove();
      }
    })
  }
  delWarn(){
    Notiflix.Confirm.show(
      'Confirm delete',
      "Are you sure you want to delete this poem? This action cannot be undone",
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
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

