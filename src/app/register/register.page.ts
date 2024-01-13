import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private _storage: Storage | null = null;
  formValidation!:FormGroup
  constructor(private fb: FormBuilder,private storage: Storage,
    private authservice: AuthService,private alertCtrl: AlertController,private token: TokenService) { }

  ngOnInit() {
    this.formValidation = this.fb.group({
      username: new FormControl('', Validators.compose([
        Validators.required,
        ])),
      email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
      Validators.minLength(6),
      Validators.required
      ])),
      phoneNumber: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required
        ])),
      });
      this.storage.create();
  }

Register(value:any){
    this.authservice.RegitserUser(value).subscribe(data=>{
        console.log(data)
      this.token.setToken(data.token)
      this.showAlert()
      this.formValidation.reset()
    },

    err=>{
      console.log(err)
      if (err.error && err.error.message) {
        if (err.error.message.includes('Email Exist')) {
          this.showAlerT('Error!', 'Email already exists');
        } else if (err.error.message.includes('password must be at least 6 characters')) {
          this.showAlerT('Error!', 'Password must be at least 6 characters');
        } else if (err.error.message.includes('username exist')) {
          this.showAlerT('Error!', 'Username exist ,please choose other username!');
        }
        else {
          this.showAlerT('Error!', 'Please verify your information');
        }
      } else {
        this.showAlerT('Error!', 'An unknown error occurred');
      }
    })
        }

        async showAlert() {
          const alert = await this.alertCtrl.create({
            header: 'Success!',
            subHeader: 'An Verification Mail has sent please verify your email to complete the signup!',
            mode:'ios',
            message: '',
            buttons: ['OK']
          });
          await alert.present()
          const result = await alert.onDidDismiss();

        }


        async showAlerT(header: string = 'Success!', message: string) {
          const alert = await this.alertCtrl.create({
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

}
