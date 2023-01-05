import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  panelOpenState = false;
  @Input() comments: any;
  @Input() topComments: any;

  constructor() { 
  }

  ngOnInit(): void {
  }

}
