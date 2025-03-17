import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { VerifyotpService } from 'app/shared/services/verifyotp.service';
// import {  Router } from '@angular/router';

@Component({
  selector: 'app-verify-by-otp-authentication',
  templateUrl: './verify-by-otp-authentication.component.html',
  styleUrls: ['./verify-by-otp-authentication.component.css']
})
export class VerifyByOtpAuthenticationComponent implements OnInit {
  spinner: boolean = false;
  otpForm: FormGroup;
  isUserLoggedIn: any;
  otpinfo: { user_id: any; otp: any; };

  constructor(private otpService : VerifyotpService, private router: Router,private _snackBar: MatSnackBar,private jwtAuth: JwtAuthService,) {
    this.otpForm = new FormGroup({
      verify_Otp: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {

    this.isUserLoggedIn = JSON.parse(localStorage.getItem('m3infrastructure_EGRET_USER'));
  }

  onSubmit(){

    this.otpinfo = {
      user_id: this.isUserLoggedIn?.id,
      otp: this.otpForm.controls["verify_Otp"].value,
    };
    console.log(this.otpinfo,'otp')
    this.spinner = true;

    this.otpService.VerifyOtp(this.otpinfo).subscribe(res => {
      if (res["status"] == true) {
        const authData = this.jwtAuth.accessData();
        // console.log("verifyotpresp...", authData);
           localStorage.setItem('m3infrastructure_UserType', authData.userType);
           localStorage.setItem('m3infrastructure_secretkey', authData.secretKey);
        this.openSnackBar("OTP Verify Successfully");
        this.router.navigateByUrl("/user/dashboard");
      }
      else {
        this.openSnackBar(res["message"]);
      }
      this.spinner = false;
    },
      error => {
        this.spinner = false;
        // this.openSnackBar("Something went wrong. Plz try again later...");
      });

  }

  openSnackBar(msg) {
    this._snackBar.open(msg, "Close", {
      duration: 2000,
    });
    this.spinner = false;
  }

}
