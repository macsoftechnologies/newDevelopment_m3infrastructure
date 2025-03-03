import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { JwtAuthService } from '../../../shared/services/auth/jwt-auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  

  signinForm: FormGroup;
  errorMsg = '';
  return: string;

  private _unsubscribeAll: Subject<any>;
  userType: any;
  secretKey: any;

  constructor(
    private jwtAuth: JwtAuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(true)
    });

    this.route.queryParams
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(params => this.return = params[''] || '/');
  }

  ngAfterViewInit() {
    
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  signin() {
    const signinData = this.signinForm.value

    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';    
    this.jwtAuth.signin(signinData.username, signinData.password)
    .subscribe(response => {
      this.jwtAuth.getLocalData(response?.userType,'m3infrastructure' )
      // this.userType = localStorage.setItem('UserType', response?.userType);
      // this.secretKey = localStorage.setItem('secretkey', 'm3north');
      if(response["status"]==false)
      {
        this.submitButton.disabled = false;
      this.progressBar.mode = 'determinate';
      this.errorMsg =response["message"];
      }else{
        if(response["userType"] === "Admin"){
          // console.log("checking")
          this.router.navigateByUrl("/sessions/verifybyotp");
        }else{
          this.router.navigateByUrl("/sessions/verifybyotp");
        }
      }
      // this.router.navigateByUrl(this.return);
    }, err => {
      this.submitButton.disabled = false;
      this.progressBar.mode = 'determinate';
      this.errorMsg = err.message;
      // console.log(err);
    })
  }

}
