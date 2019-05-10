import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GoogleLoginService } from 'src/app/services/GoogleLoginService/google-login.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { IGoogleUser } from 'src/app/models/gapiImpl';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  imageUrl: string="";

  // Country picker
  countryList: {Code: string, Name: string}[];
  selCountry: string="";

  // Gender picker
  genderList: string[] = ["Male", "Female", "Other"];
  selGender: string="";

  // Language search
  languageList: {code: string, name: string, nativeName: string}[];
  selLanguage: string="";
  selLanguages: string[] = [];

  constructor(private _formBuilder: FormBuilder, private gLoginService: GoogleLoginService,
    private http: HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.http.get('assets/data/countrylist.json').subscribe((countryList: {Code: string, Name: string}[]) => {
      this.countryList = countryList;
    })

    this.http.get('assets/data/languagelist.json').subscribe((languageList: {code: string, name: string, nativeName: string}[]) => {
      this.languageList = languageList;
    })

    this.gLoginService.getSignedInUser().then((user: IGoogleUser) => {
      this.imageUrl = user.getBasicProfile().getImageUrl();
    });

    this.firstFormGroup = this._formBuilder.group({
      username: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      birthday: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
    });
  }

  public addSelectedLanguage(){
    if(this.selLanguages.indexOf(this.selLanguage) != -1) {
      this.snackBar.open("You have already added this language!", "Ok", {
        duration: 2000
      });
    } else {
      this.selLanguages.push(this.selLanguage);
    }
  }

  public imageUploadClick(): void {
    document.getElementById("image-upload").click()
  }
}
