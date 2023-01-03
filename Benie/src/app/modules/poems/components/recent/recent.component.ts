import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css']
})
export class RecentComponent implements OnInit {
  @Input() poems: any;

  constructor() { }

  ngOnInit(): void {
  }

}
