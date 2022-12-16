import { Component, OnInit } from '@angular/core';
import { StoryService } from '../../../services/story/story.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent implements OnInit {

  constructor(
    private tagService:StoryService,
  ) { }

  ngOnInit(): void {
  }

  addTag(data: any){
    this.tagService.addTags(data).subscribe();
    Notiflix.Notify.success('Added!');
  }
  reset(){
    const form = (<HTMLFormElement>document.getElementById('tagForm'));
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
