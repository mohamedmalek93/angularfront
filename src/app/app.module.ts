import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ScenarioComponent } from './scenario/scenario.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ServicesService } from './services.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { DatePipe } from '@angular/common';
import { DialogContentExampleDialogComponent } from './dialog-content-example-dialog/dialog-content-example-dialog.component';
import { ChartsModule, ThemeService } from 'ng2-charts';
@NgModule({
  declarations: [
    AppComponent,
  
    ScenarioComponent,
  
    DialogContentExampleDialogComponent,
  
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule  ,
    ChartsModule
  ],
  entryComponents: [
    DialogContentExampleDialogComponent,
  ],
  
  providers: [ServicesService,MatDatepickerModule,DatePipe,ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
