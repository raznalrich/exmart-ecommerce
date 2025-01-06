import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule ,Validators} from '@angular/forms';
import { ApiServiceService } from '../../../../services/api-service.service';
import { Router } from '@angular/router';
import bootstrap from 'bootstrap';
// import * as bootstrap from 'bootstrap'

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  constructor(public api:ApiServiceService,private router: Router){}
  phoneNumber: string = '';
  employeeId:any=0;
  name: string = '';
  email:string='';
  LoginForm = new FormGroup({
    email:new FormControl('',Validators.email),
    password:new FormControl(''),

  })

  submit(){
    const email = this.LoginForm.get('email')?.value;
    this.email = email!;

    this.name = this.parseNameFromEmail(email!);

    console.log(this.LoginForm.value)
    if (!email) {
      console.error('Email is required');
      return;
    }

    this.api.returnIdFromEmail(email).subscribe(
      (userId) => {
        console.log('User ID:', userId);
        if(userId==null){
          const modalElement = document.getElementById('exampleModal');
          if(modalElement){
            // const modal = new bootstrap.Modal(modalElement);
            // modal.show();
          }
          else{
            console.error('modal element not found');

          }
        }
        var userID = userId;
        this.employeeId = userID;
        this.authentication(this.employeeId);
      },
      (error) => {
        console.error('Error fetching user ID:', error);
      }
    );

  }
  getIdfromemail(email:string){
    this.api.returnIdFromEmail(email).subscribe(
      (userId) =>{
        var userID = userId;
        this.employeeId = userID;
        localStorage.setItem('userId', this.employeeId);
          console.log('User ID stored in localStorage:', this.employeeId);
      }
    )
  }
 authentication(userId:any):void{
  this.api.IsAdmin(userId).subscribe(
    (isAdmin)=>{
      if(isAdmin){
        alert("it is admin")
        this.router.navigate(['/admin/admindashboard']);
      }
      else{
        localStorage.setItem('userId', userId);
        console.log('User ID stored in localStorage:', userId);
      }
    },
    (error)=>{
      localStorage.setItem('userId', userId);
        console.log('User ID stored in localStorage:', userId);
        this.router.navigate(['/home']);
    }
  )
 }
 addNewUser(){

  this.api.addNewUser(this.email, this.name, this.phoneNumber).subscribe(
    (response) => {
      console.log('User added successfully:', response);
      this.getIdfromemail(this.email)
      this.router.navigate(['/home']);
    },
    (error) => {
      console.error('Error adding user:', error);
      alert('Failed to add user. Please try again.');
    }
  );


 }
 parseNameFromEmail(email: string): string {
  if (!email || !email.includes('@')) {
    return '';
  }

  const namePart = email.split('@')[0];
  return namePart
    .split('.')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}


}
