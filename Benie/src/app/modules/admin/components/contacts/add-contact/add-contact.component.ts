import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { StoryService } from '../../../services/story/story.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  constructor(
    private storyService:StoryService,
  ) { }
 
  ngOnInit(): void {
  }
  addItem(data: any){
    this.storyService.addContact(data).subscribe({
      next: (res) => {
        Notiflix.Notify.success('Added!');
      }
    });
  }
  reset(){
    const form = (<HTMLFormElement>document.getElementById('contactForm'));
    setTimeout(() => {
      form.reset();
    }, 250)
  }
  reload(){
    setTimeout(() => {
      location.reload();
    }, 250)
  }
}
