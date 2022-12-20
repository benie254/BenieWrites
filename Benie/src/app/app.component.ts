import { Component } from '@angular/core';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Benie Writes';
  img!: CloudinaryImage;

  ngOnInit(){
    const cloudinary = new Cloudinary({
      cloud: {
        cloudName: 'benie'
      }
    });
    
  }
}
