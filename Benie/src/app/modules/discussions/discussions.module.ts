import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscussionsRoutingModule } from './discussions-routing.module';
import { DiscussionsComponent, FollowBottomSheet } from './discussions.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { StoriesModule } from '../stories/stories.module';


@NgModule({
  declarations: [
    DiscussionsComponent,
    FollowBottomSheet,
  ],
  imports: [
    CommonModule,
    DiscussionsRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    StoriesModule
  ]
})
export class DiscussionsModule { }
