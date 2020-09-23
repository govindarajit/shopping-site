import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AdminAuthGuard, UserAuthGuard } from './services/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, UserAuthGuard, AdminAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
