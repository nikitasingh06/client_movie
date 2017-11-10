import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ConnectDbService } from './connect-db.service';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderLoginComponent } from './header-login/header-login.component';
import { EditUserDetailsComponent } from './edit-user-details/edit-user-details.component';
import { Allpaths } from './url';
import { AuthGuard } from './AuthGuard';
import { AuthService } from './AuthService';
import { ProductsCartService } from './products-cart.service';
import { ProductsService } from './products.service';
import { FacebookModule } from 'ng2-facebook-sdk';
import { UserLoginComponent } from './user-login/user-login.component';
import { VerifySignUpComponent } from './verify-sign-up/verify-sign-up.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { SuperadminComponent } from './superadmin/superadmin.component';


export const appRoutes: Routes = [
  {
    path: 'superadmin', component: SuperadminComponent, canActivate: [AuthService], data: [{ type: '1' }]
  },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthService], data: [{ type: '2' }]
  },
  {
    path: 'user', component: UserComponent, canActivate: [AuthService], data: [{ type: '3' }]
  },
  {
    path: 'sign-up', component: SignUpComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', component: HomepageComponent
  },
  {
    path: 'logout', component: HomepageComponent, canActivate: [AuthGuard], data: [{ loginStatus: '1' }]
  },
  {
    path: 'editDetails', component: EditUserDetailsComponent, canActivate: [AuthGuard], data: [{ loginStatus: '1' }]
  },
  {
    path: 'userlogin', component: UserLoginComponent
  },
  {
    path: 'verify', component: VerifySignUpComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    HeaderLoginComponent,
    EditUserDetailsComponent,
    UserLoginComponent,
    VerifySignUpComponent,
    AdminComponent,
    UserComponent,
    SuperadminComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FacebookModule.forRoot(),
    ReactiveFormsModule
  ],

  providers: [ConnectDbService, Allpaths, ProductsCartService, ProductsService, AuthGuard, AuthService],

  bootstrap: [AppComponent]
})

export class AppModule { }
