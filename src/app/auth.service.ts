import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { myConfig }        from './auth.config';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';
// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  userProfile: Object;
  // Configure Auth0
 constructor(private router: Router) {
    // Set userProfile attribute of already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));
 
    // Add callback for the Lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
      });
    });
  };

  lock = new Auth0Lock(myConfig.clientID, myConfig.domain, {
     
   languageDictionary: {
    emailInputPlaceholder: "example@youremail.com",
    title: "",
    signUpTerms: '<a href="http://google.com">I Accept the Terms and Conditions</a>',
  },
  theme: {
    logo: 'http://hulte.com/temp/logo.svg',
    primaryColor: '#01BAEF'
  },
  mustAcceptTerms: true  
  });

  lockSignUp = new Auth0Lock(myConfig.clientID, myConfig.domain, {
   languageDictionary: {
    emailInputPlaceholder: "example@youremail.com",
    title: "",
    signUpTerms: '<a href="http://google.com">I Accept the Terms and Conditions</a>',
  },
  theme: {
    logo: 'http://hulte.com/temp/logo.svg',
    primaryColor: '#01BAEF'
  },
  initialScreen: 'signUp',
  mustAcceptTerms: true  
  });



  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public signUp() {
    this.lockSignUp.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();

  };



  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
  };
}