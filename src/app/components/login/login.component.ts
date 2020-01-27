import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { SignIn } from 'src/app/store/actions/auth.actions';
import { GapiState } from 'src/app/store/state/auth.state';
import { switchMap, filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // @Select(GapiState.isSignedIn)
  constructor(private store: Store, private router: Router) { }

  ngOnInit() {  }
  signin() {
    this.store.dispatch(new SignIn())
    .pipe(
      switchMap(_ => this.store.select(GapiState.isSignedIn)),
    )
     .subscribe(v => this.router.navigate(["/"]))
  }
}
