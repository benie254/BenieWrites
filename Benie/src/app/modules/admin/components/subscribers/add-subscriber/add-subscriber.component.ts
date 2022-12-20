import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { StoryService } from '../../../services/story/story.service';

@Component({
  selector: 'app-add-subscriber',
  templateUrl: './add-subscriber.component.html',
  styleUrls: ['./add-subscriber.component.css']
})
export class AddSubscriberComponent implements OnInit {

  constructor(
    private storyService:StoryService,
  ) { }
 
  ngOnInit(): void {
  }
  addItem(data: any){
    this.storyService.addSub(data).subscribe({
      next: (res) => {
        Notiflix.Notify.success('Added!');
      }
    });
  }
  reset(){
    const form = (<HTMLFormElement>document.getElementById('subForm'));
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
