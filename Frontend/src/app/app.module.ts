import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HttpClientModule } from "@angular/common/http";
import { RegisterComponent } from './register/register.component';
import { AdminModule } from './admin/admin.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MeterModule } from './meter/meter.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoleComponent } from './role/role/role.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';





@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    RegisterComponent,
    RoleComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminModule,
    NgbModule,
    MeterModule,
    BrowserAnimationsModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
