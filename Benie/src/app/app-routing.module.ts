import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { UnsubscribeComponent } from './components/unsubscribe/unsubscribe.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'unsubscribe', component: UnsubscribeComponent },
  { path: 'janja/admin/254', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'stories', loadChildren: () => import('./modules/stories/stories.module').then(m => m.StoriesModule) },
  { path: 'poems', loadChildren: () => import('./modules/poems/poems.module').then(m => m.PoemsModule) },
  { path: 'discussions', loadChildren: () => import('./modules/discussions/discussions.module').then(m => m.DiscussionsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
