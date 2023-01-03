import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoriesRoutingModule } from './stories-routing.module';
import { StoriesComponent } from './stories.component';
import { CompletedStoriesComponent } from './components/completed-stories/completed-stories.component';
import { OngoingStoriesComponent } from './components/ongoing-stories/ongoing-stories.component';
import { BottomSheetOverviewExampleSheet, ReadComponent } from './components/read/read.component';
import { AllStoriesComponent } from './components/all-stories/all-stories.component';
import { StoryDialog, StoryPagesComponent } from './components/story-pages/story-pages.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { CloudinaryModule } from '@cloudinary/ng';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxEditorModule } from 'ngx-editor';
import { NotificationsComponent } from '../../components/notifications/notifications.component';
import { DateAgoPipe } from './pipes/date/date-ago.pipe';
import { TruncatePipe } from './pipes/trunc/truncate.pipe';


@NgModule({
  declarations: [
    StoriesComponent,
    CompletedStoriesComponent,
    OngoingStoriesComponent,
    ReadComponent,
    AllStoriesComponent,
    BottomSheetOverviewExampleSheet,
    StoryDialog,
    StoryPagesComponent,
    NavComponent,
    NotificationsComponent,
    DateAgoPipe,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    StoriesRoutingModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatStepperModule,
    MatListModule,
    MatBottomSheetModule,
    MatInputModule,
    CloudinaryModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatExpansionModule,
    Ng2SearchPipeModule,
    NgxEditorModule,
  ],
  exports: [
    TruncatePipe,
    DateAgoPipe,
  ],
})
export class StoriesModule { }
