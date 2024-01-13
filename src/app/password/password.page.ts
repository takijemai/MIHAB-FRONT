import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  formValidation!: FormGroup;
  errorMessage = '';
  formValidationMessages = {
    cpassword: [
       { type: 'required', message: 'Password is a required field.' },
       { type: 'minlength', message: 'The minmum legth of password is a 6 charachters.'}
     ],
     newpassword: [
       { type: 'required', message: 'Password is a required field.' },
       { type: 'minlength', message: 'The minmum legth of password is a 6 charachters.'}
     ],
     confirmpassword: [
      { type: 'required', message: 'Password is a required field.' },
      { type: 'minlength', message: 'The minmum legth of password is a 6 charachters.'}
    ],
   };
  constructor(private formBuilder: FormBuilder,private router:Router, private alertctrl: AlertController,
    private loadingctl: LoadingController, private userservice: UserService) { }
  ngOnInit() {
    this.formValidation = this.formBuilder.group({
      cpassword: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
        ])),
        newpassword: new FormControl('', Validators.compose([
      Validators.minLength(6),
      Validators.required
      ])),
      confirmpassword: new FormControl('', Validators.compose([
      Validators.minLength(6),
      Validators.required
      ])),
      });
  }

  async OnPasswordChange(value:any){
const loading = await this.loadingctl.create()
await loading.present()
this.userservice.ChangePassword(this.formValidation.value).subscribe(async data=>{
  console.log(data);
  const alert = await this.alertctrl.create({
    header: 'Change Password',
    subHeader:'Password changed correctly!',
    mode:'ios',
    buttons: ['OK']

  })
  alert.present()
  this.router.navigate(['principal'])
  this.formValidation.reset()
  loading.dismiss()
}, async (err:any)=>{
  this.errorMessage= err.message
  loading.dismiss()
  const alert = await this.alertctrl.create({
    header: 'Error',
    subHeader:'Error changing Password !',
    mode:'ios',
    buttons: ['OK']

  })
  await alert.present()
})
  }
}
