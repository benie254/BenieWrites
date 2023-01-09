import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  storiesImg = 'https://res.cloudinary.com/benie/image/upload/v1672940463/undraw_home_settings_re_pkya_ueymve.svg';
  poetryImg = 'https://res.cloudinary.com/benie/image/upload/v1672940684/undraw_into_the_night_vumi_n0gliz.svg';
  discussionImg = 'https://res.cloudinary.com/benie/image/upload/v1672930112/undraw_public_discussion_re_w9up_r9jd1k.svg';
  constructor(
  ) { }

  ngOnInit(): void {
  }

}
