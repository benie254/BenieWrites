import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './components/about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import {MatBadgeModule} from '@angular/material/badge';
import {MatStepperModule} from '@angular/material/stepper';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {CloudinaryModule} from '@cloudinary/ng';// TODO: Add SDKs for Firebase products that you want to use
import { NgxPaginationModule } from 'ngx-pagination';
import { MatExpansionModule } from '@angular/material/expansion';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { NgxEditorModule } from 'ngx-editor';
import { StoriesModule } from './modules/stories/stories.module';
import { HomeComponent } from './components/home/home.component';
import { NavigationModule } from './modules/navigation/navigation.module';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8NL7aDXRJMhmO70VCl_IxSt1vH5MkcnU",
  authDomain: "notif-d6fbe.firebaseapp.com",
  projectId: "notif-d6fbe",
  storageBucket: "notif-d6fbe.appspot.com",
  messagingSenderId: "649923585220",
  appId: "1:649923585220:web:a67de8b9808fc392d95591",
  measurementId: "G-J7BT3LNHY1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    MatChipsModule,
    StoriesModule,
    NavigationModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
