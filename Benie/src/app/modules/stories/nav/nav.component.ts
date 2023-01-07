import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input() titleValue: (text: any) => void;
  @Input() searchText: any;
  @Input() searchResults: any;

  constructor() { }

  ngOnInit(): void {
  }
  reload(){
    setTimeout(() => {
      location.reload();
    },3)
  }

}
