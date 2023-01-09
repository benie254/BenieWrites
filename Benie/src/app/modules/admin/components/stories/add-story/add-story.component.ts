import { Component, Input, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { StoryService } from '../../../services/story/story.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.css']
})
export class AddStoryComponent implements OnInit {
  @Input() onNoClick: () => void;
  @Input() dialogOp: boolean = false;

  constructor(
    private storyService:StoryService,
  ) { }

  ngOnInit(): void {
    }
  

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: any[] = [{name: 'mystery'}, {name: 'thriller'}, {name: 'horror'}];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: any): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  addStory(data: any){
    this.storyService.addStory(data).subscribe({
      next: (res) => {
        Notiflix.Notify.success('Added!');
      }
    });
  }
  reset(){
    const form = (<HTMLFormElement>document.getElementById('storyForm'));
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
