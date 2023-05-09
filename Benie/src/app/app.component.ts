import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Benie Writes';
  img!: CloudinaryImage;

  constructor(
    private meta: Meta,
  ){

  }

  ngOnInit(){
    this.meta.updateTag({name: 'title', content: 'Benie Writes'}) 
    this.meta.updateTag({name: 'description', content: 'A home for stories, poems, discussions'}) 
    this.meta.updateTag({name: 'image', content: 'https://res.cloudinary.com/benie/image/upload/v1671558026/IMG_20220119_175258_460-modified_yhqkhm.png'}) 
    this.meta.updateTag({name: 'site', content: 'https://benie.web.app'}) 
    
  }
}
