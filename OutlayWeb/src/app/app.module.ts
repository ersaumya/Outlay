import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntriesComponent } from './components/entries/entries.component';
import { NewEntryComponent } from './components/new-entry/new-entry.component';

import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
//Services
import { EntryService } from './services/entry.service';
import { AuthService } from './services/auth.service';

import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
//forms
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateEntryComponent } from './components/update-entry/update-entry.component';

import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    EntriesComponent,
    HeaderComponent,
    FooterComponent,
    NewEntryComponent,
    UpdateEntryComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  entryComponents:[UpdateEntryComponent],
  providers: [EntryService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
