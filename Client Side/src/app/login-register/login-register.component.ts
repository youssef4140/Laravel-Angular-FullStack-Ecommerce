import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/_services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserToken } from 'src/app/_models/models';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class LoginRegisterComponent {
  login = true;

  hide = true;
  registerForm: FormGroup;
  loginForm: FormGroup;

  user!: UserToken | null;

  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<LoginRegisterComponent>,
    private cookieService: CookieService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(8)]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
    }, {
      validator: this.passwordMatchValidator
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    if (data && data.login) {
      this.login = data.login;
    }
  }

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const password_confirmation = formGroup.get('password_confirmation')?.value;
    if (password !== password_confirmation) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  getEmailErrorMessage() {
    const emailFormControl = this.registerForm.get('email');
    if (emailFormControl) {
      if (emailFormControl.hasError('required')) {
        return 'You must enter a valid email';
      }
      return emailFormControl.hasError('email') ? 'Not a valid email' : '';
    }
    return 'you must enter a value';
  }

  onSubmit() {
    if (!this.login) {
      if (this.registerForm.valid) {
        this.register();
      } else {
        this._snackBar.open('Please enter valid register info', 'X', {
          duration: 1000,
          panelClass: ['custom-snackbar'],
        });
      }
    } else {
      if (this.loginForm.valid) {
        this.logIn();
      } else {
        this._snackBar.open('Please enter valid login credentials', 'X', {
          duration: 1000,
          panelClass: ['custom-snackbar'],
        });
      }
    }
  }

  register() {
    this._userService.register(this.registerForm.value)
      .subscribe({
        next: (results) => {
          this.user = results;
          this.cookieService.delete('user');
          this.cookieService.delete('token');
          this.cookieService.set('user', JSON.stringify(results.user));
          this.cookieService.set('token', JSON.stringify(results.token));

          this.cookieService.set('user', JSON.stringify(results));
          this._snackBar.open(('Welcome ' + this.user.user.name + ' !'), 'X', { duration: 1300 })
        },
        error: (error) => {
          console.error('Error:', error);
          this._snackBar.open((error.error.message), 'X', { duration: 4000 })
        },
        complete: () => {
          this.dialogRef.close(this.user);
        },
      });
  }

  logIn() {
    this._userService.login(this.loginForm.value)
      .subscribe({
        next: (results) => {
          this.user = results;
          this.cookieService.delete('user');
          this.cookieService.delete('token');
          this.cookieService.set('user', JSON.stringify(results.user));
          this.cookieService.set('token', JSON.stringify(results.token));
          localStorage.setItem('token', JSON.stringify(results.token))

          this._snackBar.open(('Welcome ' + this.user.user.name + ' !'), 'X', { duration: 1300 })
        },
        error: (error) => {
          console.error('Error:', error);
          this._snackBar.open((error.error.message), 'X', { duration: 4000 })
        },
        complete: () => {
          this.dialogRef.close(this.user);
        },
      });
  }


}
