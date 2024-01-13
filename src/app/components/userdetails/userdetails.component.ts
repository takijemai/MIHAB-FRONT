import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss'],
})
export class UserdetailsComponent  implements OnInit {
@Input() details:any
detail: any =[]
username:any
email:any

  constructor() { }

  ngOnInit() {}


  ngOnChanges() {
   if(this.details){
    this.detail= this.details
    this.username= this.detail.username
   }
  }
}
