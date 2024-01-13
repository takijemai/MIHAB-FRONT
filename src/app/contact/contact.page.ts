import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  formValidation!: FormGroup
  constructor(private fb: FormBuilder,private userservice: UserService, private alertctrl: AlertController) { }

  ngOnInit() {
    this.formValidation = this.fb.group({
      name: new FormControl('', Validators.compose([
        Validators.required,

        ])),
      email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      subject: new FormControl('', Validators.compose([
      Validators.maxLength(20),
      Validators.required
      ])),
      message: new FormControl('', Validators.compose([
        Validators.maxLength(100),
        Validators.required
        ]))
      });
  }


  contact(value:any){
this.userservice.Contact(value).subscribe(data=>{
  console.log(data);
  this.showalert()
  this.formValidation.reset()

})
  }
  async showalert(){
    const alert= await this.alertctrl.create({
header:'Success',
subHeader: 'The message has been sent! You will receive a response very soon from our support team!',
mode:'ios',
buttons: ['OK']
    })
    await alert.present()
    const result= await alert.onDidDismiss()
  }

}
