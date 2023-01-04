import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadComponent } from './components/read/read.component';
import { StoryPagesComponent } from './components/story-pages/story-pages.component';
import { StoriesComponent } from './stories.component';

const routes: Routes = [
  { path: '', component: StoriesComponent },
  { path: ':id/:id', component: ReadComponent },
  { path: ':id/chapter/:id', component: StoryPagesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoriesRoutingModule { }
