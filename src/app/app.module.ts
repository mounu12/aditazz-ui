import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { AppRoutingModule } from './/app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InputDumpComponent } from './components/dashboard/input-dump/input-dumb.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TableDumpComponent } from './components/dashboard/table-dump/table-dumb.component';
import { ConfimationDialogComponent } from './shared/confimation-dialog/confimation-dialog.component';
import { ErrorMsgComponent } from './shared/error-msg/error-msg.component';
import { GraphDumbComponent } from './components/dashboard/graph-dumb/graph-dumb.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {MatIconModule} from '@angular/material/icon'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    InputDumpComponent,
    TableDumpComponent,
    ConfimationDialogComponent,
    ErrorMsgComponent,
    GraphDumbComponent,
  ],
  entryComponents: [
    ConfimationDialogComponent,
    ErrorMsgComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxChartsModule,
    MatIconModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
