import { Component, Input, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { User } from '../../../classes/user/user';
import { StoryService } from '../../../services/story/story.service';

@Component({
  selector: 'app-edit-reaction',
  templateUrl: './edit-reaction.component.html',
  styleUrls: ['./edit-reaction.component.css']
})
export class EditReactionComponent implements OnInit {
  details!: any;
  delConfirmed: boolean = false;
  currentUser!: User;
  @Input() selected: any
  showData: boolean = false;
  hideContent: boolean= false;
  showEdit: boolean = false;

  constructor(
    private service:StoryService,
    private auth:AuthService,
  ) { }

  ngOnInit(): void {
    this.itemDetails();
    if(this.auth.currentUserValue){
      this.currentUser = this.auth.currentUserValue;
    }else{
      !this.currentUser;
    }
  }
  itemDetails(){
    Notiflix.Loading.dots('Loading...');
    this.service.getReactionDetails(this.selected).subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        this.details = res;
      }
    })
  }
  delete(){
    Notiflix.Loading.arrows('Deleting... please wait.')
    this.service.deleteReaction(this.selected).subscribe({
      next: (res) => {
        Notiflix.Report.success(
          "Deleted!",
          'The reaction was deleted successfully.',
          'Great',
        )
        Notiflix.Loading.remove();
      }
    })
  }
  delWarn(){
    Notiflix.Confirm.show(
      'Confirm delete',
      "Are you sure you want to delete this reaction? This action cannot be undone",
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
  reload(){
    setTimeout(() => {
      location.reload();
    }, 250)
  }
}

