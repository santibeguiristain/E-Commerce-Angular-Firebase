import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from './../environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AngularFirestore } from '@angular/fire/firestore';
 
 



@NgModule({
  declarations: [
    AppComponent,NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [AngularFireAuth,AngularFirestore],
  bootstrap: [AppComponent] 
  
})
export class AppModule { }
