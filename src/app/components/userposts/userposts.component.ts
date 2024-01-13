import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-userposts',
  templateUrl: './userposts.component.html',
  styleUrls: ['./userposts.component.scss'],
})
export class UserpostsComponent  implements OnInit {
@Input() posts:any
  constructor() { }

  ngOnInit() {}

}
