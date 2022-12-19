import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadComponent } from './components/read/read.component';
import { StoryPagesComponent } from './components/story-pages/story-pages.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'read/story/:id', component: ReadComponent },
  { path: 'read/story/chapter/:id', component: StoryPagesComponent },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
