import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule ,Validators} from '@angular/forms';
import { ApiServiceService } from '../../../../services/api-service.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
// import * as bootstrap from 'bootstrap'
interface LoginRequestDTO {
  email: string;
}
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  constructor(public api:ApiServiceService,private router: Router){}
  phoneNumber: string = '+919746466925';
  employeeId:any=0;
  name: string = '';
  email:string='';
  loginResponse : any
  token : any
  isLoading:boolean=false;

  LoginForm = new FormGroup({
    email:new FormControl('',Validators.email),
    password:new FormControl(''),

  })

  submit(){
    this.isLoading=true;
    const email = this.LoginForm.get('email')?.value;
    this.email = email!;

    this.name = this.parseNameFromEmail(email!);

    console.log(this.LoginForm.value)
    if (!email) {
      console.error('Email is required');
      return;
    }

    const loginRequest: LoginRequestDTO = {
      email: this.email
    };

    this.api.LoginandToken(loginRequest).subscribe((res:any)=> {
        this.loginResponse = res;
        console.log(this.loginResponse)
        this.token = res.token

        try {
          const decoded: any = jwtDecode(this.token);
          console.log('Decoded UserId:', decoded.UserId);
          console.log('Decoded UserName:', decoded.name);

          // Store token in localStorage or a service
          localStorage.setItem('token', this.token);
          this.authentication(decoded.UserId);
          // Navigate to dashboard or home page

        } catch (error) {
          console.error('Error decoding token:', error);
        }

    })



    // this.api.returnIdFromEmail(email).subscribe(
    //   (userId) => {
    //     console.log('User ID:', userId);
    //     if(userId==null){
    //       this.addNewUser();
    //       // const modalElement = document.getElementById('exampleModal');
    //       // if(modalElement){
    //       //   // const modal = new bootstrap.Modal(modalElement);
    //       //   // modal.show();
    //       // }
    //       // else{
    //       //   console.error('modal element not found');

    //       // }
    //     }
    //     var userID = userId;
    //     this.employeeId = userID;
    //     this.authentication(this.employeeId);
    //   },
    //   (error) => {
    //     this.addNewUser();
    //     console.error('Error fetching user ID:', error);
    //   }
    // );

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
