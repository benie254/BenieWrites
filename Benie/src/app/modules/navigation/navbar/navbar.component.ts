import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  brand = 'https://res.cloudinary.com/benie/image/upload/v1671555324/h02js8etvetdr5ctbmtf-removebg-preview_wge6nt.png';
  @Input() isAdmin = false;
  @Input() logout: () => void;
  @Input() user: any;

  constructor() { }

  ngOnInit(): void {
  }

}
