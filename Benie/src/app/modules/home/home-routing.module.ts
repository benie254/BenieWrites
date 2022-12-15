import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ReadComponent } from './read/read.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'read', component: ReadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
