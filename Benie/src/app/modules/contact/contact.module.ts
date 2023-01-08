import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribeComponent } from './subscribe/subscribe.component';



@NgModule({
  declarations: [
    SubscribeComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SubscribeComponent,
  ],
})
export class ContactModule { }
