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
  errorMessage: string = '';

  LoginForm = new FormGroup({
    email:new FormControl('',Validators.email),
    password:new FormControl(''),

  })

  submit() {
    if (this.LoginForm.invalid) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    const email = this.LoginForm.get('email')?.value;

    if (!email) {
      this.isLoading = false;
      this.errorMessage = 'Email is required';
      return;
    }

    this.email = email;
    this.name = this.parseNameFromEmail(email);
    this.api.returnIdFromEmail(email).subscribe(
      (userId) => {
        console.log('User ID:', userId);
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
              localStorage.setItem('userid', decoded.UserId);
              this.authentication(decoded.UserId);
              // Navigate to dashboard or home page

            } catch (error) {
              console.error('Error decoding token:', error);
            }

        })
      },
      (error) => {
        this.addNewUser();
        console.error('adding new user:', error);

      }
    );

    const loginRequest: LoginRequestDTO = {
      email: this.email
    };

    this.api.LoginandToken(loginRequest).subscribe({
      next: (res: any) => {
        this.loginResponse = res;
        this.token = res.token;

        try {
          const decoded: any = jwtDecode(this.token);
          localStorage.setItem('token', this.token);
          localStorage.setItem('userid', decoded.UserId);
          localStorage.setItem('loginTimestamp', new Date().getTime().toString());

          this.authentication(decoded.UserId);
          this.setupAutoClear();
        } catch (error) {
          console.error('Error decoding token:', error);
          this.errorMessage = 'Invalid token received';
        }
      },
      error: (error) => {
        // console.error('Login error:', error);
        this.errorMessage = 'Login failed. Please try again.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }



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



  setupAutoClear(){
    const loginTimestamp = localStorage.getItem('loginTimestamp');
    if (!loginTimestamp) return;

    const now = new Date().getTime();
    const timeElapsed = now - parseInt(loginTimestamp);
    const twentyFourHours = 24 * 60 * 60 * 1000;

    // Calculate remaining time until clear
    const timeUntilClear = twentyFourHours - timeElapsed;
    if (timeUntilClear <= 0) {
      this.clearLocalStorage();
  } else {
      // Set timeout to clear after remaining time
      setTimeout(this.clearLocalStorage, timeUntilClear);
  }
  }

  clearLocalStorage() {
    localStorage.clear();

}
// Function to check storage status on page load/refresh
checkStorageOnLoad():any {
  const loginTimestamp = localStorage.getItem('loginTimestamp');
  if (loginTimestamp) {
      const now = new Date().getTime();
      const timeElapsed = now - parseInt(loginTimestamp);
      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (timeElapsed >= twentyFourHours) {
          this.clearLocalStorage();
      } else {
          this.setupAutoClear();
      }
  }
}

ngOnInit(){
  this.checkStorageOnLoad();
}

  getIdfromemail(email:string){
    this.api.returnIdFromEmail(email).subscribe(
      (userId) =>{

      }
    )
  }
  authentication(userId: any): void {
    this.api.IsAdmin(userId).subscribe({
      next: (isAdmin) => {
        if (isAdmin) {
          localStorage.setItem("role", "Admin");
          this.router.navigate(['/admin/admindashboard']);
        } else {
          localStorage.setItem('userId', userId);
          localStorage.setItem("role", "User");
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.error('Authentication error:', error);
        localStorage.setItem('userId', userId);
        localStorage.setItem("role", "User");
        this.router.navigate(['/home']);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
 addNewUser(){

  this.api.addNewUser(this.email, this.name, this.phoneNumber).subscribe(
    (response) => {
      console.log('User added successfully:', response);
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
          localStorage.setItem('userid', decoded.UserId);
          this.authentication(decoded.UserId);
          // Navigate to dashboard or home page

        } catch (error) {
          console.error('Error decoding token:', error);
        }

    })
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
