import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { PoetryService } from 'src/app/modules/poems/services/poetry.service';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { AdminPoetryService } from '../../../services/poetry/poetry.service';

@Component({
  selector: 'app-all-poems',
  templateUrl: './all-poems.component.html',
  styleUrls: ['./all-poems.component.css']
})
export class AllPoemsComponent implements OnInit {
  myList: any;
  showData: boolean = false;
  hideContent: boolean= false;
  showEdit: boolean = false;
  myModel = 'Poem';
  selected: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private service: PoetryService,
    private adminPoetry: AdminPoetryService,
  ) { }

  ngOnInit(): void {
    if(!this.auth.currentUserValue){
      this.auth.logout();
      this.router.navigate[('/auth')]
    }else if(!this.auth.currentUserValue.is_staff || !this.auth.currentUserValue.is_superuser){
      this.auth.logout();
      this.router.navigate[('/auth')];
      Notiflix.Report.failure(
        'Not Permitted!',
        "Your log in was successful, but you don't have the permissions to access this page.",
        'Too Bad',
      )
    }
    this.allPoems();
  }
  allPoems(){
    this.service.getAllPoems().subscribe({
      next: (res) => {
        this.myList = res;
      }
    })
  }
  openForm = (): void => {
    this.showData = true;
    this.hideContent = true;
    this.showEdit = false;
  }
  redirect = (): void => {
    setTimeout(() => {
      this.openForm();
    }, 250)
  }
  reset = (): void => {
    const form = (<HTMLFormElement>document.getElementById('poemForm'));
    setTimeout(() => {
      form.reset();
    }, 250)
  }
  close(){
    this.showData = false;
    this.hideContent = false;
    this.showEdit = false;
  }
  edit(){
    this.showEdit = true;
    this.hideContent = true;
  }
  copy = (text: any): void => {
    localStorage.setItem('mySavedId',text);
    this.selected = localStorage.getItem('mySavedId')
  }
}
