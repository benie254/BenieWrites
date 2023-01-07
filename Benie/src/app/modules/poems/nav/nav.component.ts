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

  constructor() { }

  ngOnInit(): void {
  }

}
