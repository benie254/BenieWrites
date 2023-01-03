import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.css']
})
export class RelatedComponent implements OnInit {
  @Input() topRelated: any;

  constructor() { }

  ngOnInit(): void {
  }

}
