import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule ,Validators} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  LoginForm = new FormGroup({
    email:new FormControl('',Validators.email),
    password:new FormControl(''),

  })

  submit(){

    console.log(this.LoginForm.value)
  }


}
