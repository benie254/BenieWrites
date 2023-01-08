import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  title = 'Poetry';
  @Input() poems: any;
  today = new Date();
  brand = 'https://res.cloudinary.com/benie/image/upload/v1671555324/h02js8etvetdr5ctbmtf-removebg-preview_wge6nt.png';

  constructor() { }

  ngOnInit(): void {
  }

}
