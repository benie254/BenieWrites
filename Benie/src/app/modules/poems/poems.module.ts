import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoemsRoutingModule } from './poems-routing.module';
import { PoemsComponent } from './poems.component';
import { AllPoemsComponent } from './components/all-poems/all-poems.component';

import {MatCardModule} from '@angular/material/card';
import { TruncatePipe } from '../stories/pipes/trunc/truncate.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavComponent } from './components/nav/nav.component';
import { BottomSheetOverviewExampleSheet, FollowerBottomSheet, ReadComponent } from './components/read/read.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { StoriesModule } from '../stories/stories.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FollowComponent } from './components/follow/follow.component';
import { FeedbackBottomSheet, FeedbackComponent, FollowBottomSheet } from './components/feedback/feedback.component';
import { RecentComponent } from './components/recent/recent.component';
import { RelatedComponent } from './components/related/related.component';
import { CommentsComponent, RepliesBottomSheet } from './components/comments/comments.component';
import { SearchComponent } from './components/search/search.component';
import { ResultsComponent } from './components/results/results.component';
import { MatListModule } from '@angular/material/list';
import {MatTreeModule} from '@angular/material/tree';
import { PoemFooterComponent } from './components/poem-footer/poem-footer.component';
import { ContactModule } from '../contact/contact.module';


@NgModule({
  declarations: [
    PoemsComponent,
    AllPoemsComponent,
    NavComponent,
    ReadComponent,
    FollowComponent,
    FeedbackComponent,
    RecentComponent,
    RelatedComponent,
    CommentsComponent,
    SearchComponent,
    ResultsComponent,
    BottomSheetOverviewExampleSheet,
    FeedbackBottomSheet,
    FollowBottomSheet,
    FollowerBottomSheet,
    RepliesBottomSheet,
    PoemFooterComponent
  ],
  imports: [
    CommonModule,
    PoemsRoutingModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatFormFieldModule,
    StoriesModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    Ng2SearchPipeModule,
    MatListModule,
    MatTreeModule,
    ContactModule,
  ]
})
export class PoemsModule { }
