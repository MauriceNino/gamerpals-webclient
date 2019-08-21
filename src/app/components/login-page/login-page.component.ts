import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GoogleLoginService } from 'src/app/services/GoogleLoginService/google-login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IGoogleUser } from 'src/app/models/gapiImpl';
import { ILanguage } from 'src/app/models/language';
import { BackendService } from 'src/app/services/BackendService/backend.service';
import { ICountry } from 'src/app/models/country';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  formGroup1: FormGroup = null;
  formGroup2: FormGroup = null;
  formGroup3: FormGroup = null;

  imageUrl: string = '';

  // Country picker
  countryList: ICountry[];
  selCountry: string = '';

  // Gender picker
  genderList: string[] = ['Male', 'Female', 'Other'];
  selGender: string = '';

  // Language search
  languageList: ILanguage[];
  selLanguage: string = '';
  selLanguages: string[] = [];

  localUserObject: IUser;

  constructor(private formBuilder: FormBuilder, private gLoginService: GoogleLoginService,
              private backend: BackendService, private snackBar: MatSnackBar) { }

  async ngOnInit() {
    try {
      this.countryList = await this.backend.Countrys.getAll();
      this.languageList = await this.backend.Languages.getAll();
    } catch (e) {
    }

    const gUser: IGoogleUser = await this.gLoginService.getSignedInUser();
    this.imageUrl = gUser.getBasicProfile().getImageUrl();

    const localUser: IUser = await this.backend.Login.getLoggedInUser();
    this.localUserObject = JSON.parse(JSON.stringify(localUser));

    if (this.localUserObject.profilePicture == null) {
      this.localUserObject.profilePicture = gUser.getBasicProfile().getImageUrl();
    }

    this.formGroup1 = new FormGroup({
      profileName: new FormControl(this.localUserObject.profileName, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ]),
      profileDescription: new FormControl(this.localUserObject.profileDescription, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255)
      ]),
      profilePicture: new FormControl(this.localUserObject.profilePicture),
      gender: new FormControl(this.localUserObject.gender, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ])
    });

    this.formGroup2 = new FormGroup({
      birthday: new FormControl(this.localUserObject.birthday, [
        Validators.required
      ]),
      country: new FormControl(this.localUserObject.country, [
        Validators.required
      ]),
      languages: new FormControl(this.localUserObject.languages, [
        Validators.required
      ]),
    });

    this.formGroup3 = new FormGroup({
      games: new FormControl(this.localUserObject.gamesSelected, [
        Validators.required
      ])
    });
  }

  public addSelectedLanguage() {
    if (this.selLanguages.indexOf(this.selLanguage) !== -1) {
      this.snackBar.open('You have already added this language!', 'Ok', {
        duration: 2000
      });
    } else {
      this.selLanguages.push(this.selLanguage);
    }
  }

  public imageUploadClick(): void {
    document.getElementById('image-upload').click();
  }

  public sendForm() {

  }

  public getError(control: FormControl): string {
    const errorName = Object.keys(control.errors)[0];
    const errorDetails = control.errors[errorName];

    switch (errorName) {
      case 'required':
        return 'This can not be empty';
      case 'minlength':
        return `Please enter a minimum of ${errorDetails.requiredLength} characters`;
      case 'maxlength':
        return `Please enter a maximum of ${errorDetails.requiredLength} characters`;
      default:
        return 'Invalid input';
    }
  }
}
