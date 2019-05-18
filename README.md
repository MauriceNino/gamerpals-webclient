[![Build Status](https://travis-ci.org/gamerpals/WebClient.svg?branch=master)](https://travis-ci.org/gamerpals/WebClient)

# Information about this Repository
The official Repository for the GamerPals Website.
Any free work is appriciated be it issue declaration, pull requests, or anything else that improves the current state of this project.

# How to run and use this
This project is able to run in two different modes - Desktop and Web.

## Prerequisites:
Used versions in this project:
```
>> ng version
Angular CLI: 7.3.8
```
```
>> npm -v
5.6.0
```
```
>> node -v
v10.1.0
```
```
>> electron -v
v5.0.0
```
When you first clone the repository you need to install all its dependencys by executing this statement:

```
>> npm install
```


## Web
The web page is a Angular 7 site that is highly modularized.

Our folder structure looks like this:

```javascript
└───src
    ├───app
    │   ├───components   // All the components used in the page - organized in subfolders
    │   ├───models           // Models for the TypeScript code
    │   └───services
    │       ├───GamerPalsHelperMethodService // Methods that cant be organized in some other service, but is often used
    │       ├───GamerPalsRESTService                // Connection to the GamerPals backend
    │       ├───GoogleLoginService                    // Connection to Google Login API
    │       ├───PlatformInfoService                    // Identifies the current platform
    │       └───SettingsService                           // Manages the settings for the site
    ├───assets
    │   ├───data             // Static data that the application needs (for Example a countrylist)
    │   ├───js                 // JS files that need to be available at runtime
    │   ├───media         // All the media (images, sounds, videos, ...)
    │   │   ├───images
    │   │   ├───sounds
    │   │   └───videos
    │   └───scss            // SCSS variables, functions and mixins
    ├───environments // default angular environments
    └───themes           // All the available themes for this applicatio
```
To run it in development you can use the default angular command:
```
ng serve
```
To test it:
```
ng test
#or
ng test --browsers PhantomJS
```
To build it:
```
ng build
#or
ng build --prod for production build
```

## Desktop
The desktop mode is supported by electron.

To run it you have to type:
```
npm run electron
#or without building:
npm run electronNB
```

# License
This project is licensed under the terms of the GNU Affero General Public License v3.0.

Copyright (C) 2019 Maurice el-Banna

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

Also add information on how to contact you by electronic and paper mail.
