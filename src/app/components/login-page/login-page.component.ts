import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GoogleLoginService } from 'src/app/services/GoogleLoginService/google-login.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  imageUrl: string="";
  countryList: {Code: string, Name: string};
  selCountry: string="";

  constructor(private _formBuilder: FormBuilder, private gLoginService: GoogleLoginService,
    private http: HttpClient) { }

  ngOnInit() {
    this.http.get('assets/data/countrylist.json').subscribe((countryList: {Code: string, Name: string}) => {
      this.countryList = countryList;
    })

    this.gLoginService.getSignedInUser().then((user: gapi.auth2.GoogleUser) => {
      this.imageUrl = user.getBasicProfile().getImageUrl();
    });

    this.firstFormGroup = this._formBuilder.group({
      username: ['', Validators.required],
      birthday: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
