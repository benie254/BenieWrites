import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPoemsComponent } from './components/all-poems/all-poems.component';
import { ReadComponent } from './components/read/read.component';
import { PoemsComponent } from './poems.component';

const routes: Routes = [
  { path: '', component: PoemsComponent },
  { path: 'read/:id', component: ReadComponent },
  { path: 'all', component: AllPoemsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoemsRoutingModule { }
