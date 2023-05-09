import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Editor } from 'ngx-editor';
import * as Notiflix from 'notiflix';
import { AdminPoetryService } from '../../../services/poetry/poetry.service';

@Component({
  selector: 'app-add-poem',
  templateUrl: './add-poem.component.html',
  styleUrls: ['./add-poem.component.css']
})
export class AddPoemComponent implements OnInit, OnDestroy {
  value = 1;
  editor: Editor;
  htmlContent: '';
  values = '';
  counted: any;
  limitReached: boolean = false;
  html: '';

  constructor(
    private poetryService:AdminPoetryService,
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
    this.poetryService.postPoem(data).subscribe({
      next: (res) => {
        Notiflix.Notify.success('Added!');
      }
    });
  }
  reset(){
    const form = (<HTMLFormElement>document.getElementById('poemForm'));
    setTimeout(() => {
      form.reset();
    }, 250)
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
