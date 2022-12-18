import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ErrorsComponent } from './errors/errors.component';
import { ChangePasswordComponent } from './auth/components/change-password/change-password.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { ResetConfirmedComponent } from './auth/components/reset-confirmed/reset-confirmed.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ChangePassFormComponent } from './auth/forms/change-pass-form/change-pass-form.component';
import { LoginFormComponent } from './auth/forms/login-form/login-form.component';
import { ResetConfirmedFormComponent } from './auth/forms/reset-confirmed-form/reset-confirmed-form.component';
import { ResetRequestFormComponent } from './auth/forms/reset-request-form/reset-request-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AddStoryComponent } from './components/stories/add-story/add-story.component';
import { AllStoriesComponent } from './components/stories/all-stories/all-stories.component';
import { MatChipsModule } from '@angular/material/chips';

import * as Notiflix from 'notiflix';
import { EditStoryComponent } from './components/stories/edit-story/edit-story.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AllTagsComponent } from './components/tags/all-tags/all-tags.component';
import { EditTagComponent } from './components/tags/edit-tag/edit-tag.component';
import { AddTagComponent } from './components/tags/add-tag/add-tag.component';
import { AddChapterComponent, DialogForm } from './components/chapters/add-chapter/add-chapter.component';
import { EditChapterComponent } from './components/chapters/edit-chapter/edit-chapter.component';
import { AllChaptersComponent } from './components/chapters/all-chapters/all-chapters.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AllReactionsComponent } from './components/reactions/all-reactions/all-reactions.component';
import { EditReactionComponent } from './components/reactions/edit-reaction/edit-reaction.component';
import { EditFeedbackComponent } from './components/feedbacks/edit-feedback/edit-feedback.component';
import { AllFeedbacksComponent } from './components/feedbacks/all-feedbacks/all-feedbacks.component';
import { CloudinaryModule } from '@cloudinary/ng';
import { NgxEditorModule } from 'ngx-editor';



@NgModule({
  declarations: [
    AdminComponent,
    ErrorsComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
    ResetConfirmedComponent,
    LoginComponent,
    ChangePassFormComponent,
    LoginFormComponent,
    ResetConfirmedFormComponent,
    ResetRequestFormComponent,
    AddStoryComponent,
    AllStoriesComponent,
    EditStoryComponent,
    AllTagsComponent,
    EditTagComponent,
    AddTagComponent,
    AddChapterComponent,
    EditChapterComponent,
    AllChaptersComponent,
    DialogForm,
    AllReactionsComponent,
    EditReactionComponent,
    EditFeedbackComponent,
    AllFeedbacksComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AdminRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    CloudinaryModule,
    NgxEditorModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
