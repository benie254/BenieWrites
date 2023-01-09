import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { MyErrorStateMatcher } from 'src/app/modules/admin/auth/services/matcher/matcher.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit {
  unsubbed = false;
  matcher = new MyErrorStateMatcher();
  values = '';
  noInput = true;
  subEmail: string;
  email = '';
  unsubImg = 'https://res.cloudinary.com/benie/image/upload/v1673243695/undraw_awesome_rlvy_yg6hvx.svg';
  brand = 'https://res.cloudinary.com/benie/image/upload/v1671555324/h02js8etvetdr5ctbmtf-removebg-preview_wge6nt.png';

  constructor(
    private service: UserService,
  ) { }

  ngOnInit(): void {
  }
  onKey(event: any){
    this.values = event.target.value;
    this.noInput = false;
  }
  checkValues(){
    this.email = this.values;
    this.unsub(this.email);
  }
  unsub(email: string){
    Notiflix.Loading.pulse('unsubscribing...')
    this.service.unsubscribe(email).subscribe({
      next: (res) => {
        Notiflix.Loading.remove();
        Notiflix.Report.success(
          'Unsubscribed!',
          "You have successfully unsubscribed from Benie's monthly newsletter.",
          'Great',
        )
        this.unsubbed = true;
      }
    })
  }
  back(){
    history.back();
  }
  

}
