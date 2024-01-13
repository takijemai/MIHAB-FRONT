import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

import { Storage } from '@ionic/storage-angular';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
private _storage: Storage | null = null;
formValidation!: FormGroup
formValidationMessage = {
  email:[
    {type:'required', message:'Email is a required filed'},
    {type: 'pattern', message:'The email format is not correct'}
  ],
  password :[
    {type:'required', message:'Password is a required field'},
    {type:'minlength', message:'The minmum legth of password is a 6 charachters'}
  ]
}
  constructor(private fb: FormBuilder,private storage: Storage,private alertController: AlertController,
    private token: TokenService, private loadingController: LoadingController,
    private authservice: AuthService, private router: Router, private toastctrl: ToastController,private userservice: UserService) { }

  ngOnInit() {
    this.formValidation= this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('',Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    })
    this.storage.create();
  }

  async login(value:any){
    const loading = await this.loadingController.create();
    await loading.present();
    this.authservice.LoginUser(this.formValidation.value.email, this.formValidation.value.password ).subscribe(data=>{
      console.log(data)
       this.token.setToken(data.token)
      this.storage.set('auth-token', data.token).then(() => {
        loading.dismiss();
        this.router.navigate(['principal']);
        this.formValidation.reset();
      });
    },
    async (err) => {
      loading.dismiss();
      if (err.error && err.error.message) {
        if (err.error.message.includes('User does not exist')) {
          this.showAlerT('Error!', 'User Email Dont Exist ');
        } else if (err.error.message.includes('Incorrect password')) {
          this.showAlerT('Error!', 'Password is incorrect');
        }else if (err.error.message.includes('Your email is not verified.')) {
          this.showAlerT('Error!', 'Your email has not been verified yet. Please verify your email and try again.');
        }
        else {
          this.showAlerT('Error!', 'Please verify your information');
        }
      } else {
        this.showAlerT('Error!', 'An unknown error occurred '+ err);
      }

    }
    )
  }


  async showAlerT(header: string = 'Success!', message: string) {
    const alert = await this.alertController.create({
      header,
      subHeader:
        header === 'Success!'
          ? 'An Verification Mail has sent please verify your email to complete the signup!'
          : 'Please verify your information!',
      mode: 'ios',
      message,
      buttons: ['OK'],
    });
    await alert.present();
    const result = await alert.onDidDismiss()
  }






  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

async resetpassword(){
const email = this.formValidation.value.email
this.userservice.ResetPassword(email).subscribe(async data=>{
  console.log(data);
  const toast= this.toastctrl.create({
    message: 'Password reset successfuly, your new password is:'+ data.newPassword,
    duration: 15000,
    color:'success',
    buttons: [{
      text: 'Close',
      role:'cancel'
    }]
  })
  ;(await toast).present()
})
}
}
