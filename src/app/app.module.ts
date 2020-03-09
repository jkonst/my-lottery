import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { NavMenuModule } from './nav-menu/nav-menu.module';
import { WinnersComponent } from './winners/winners.component';
import { LotteryFormsModule } from './lottery-forms/lottery-forms.module';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WinnersComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatTableModule,
    CdkTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    SharedModule,
    AppRoutingModule,
    NavMenuModule,
    LotteryFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
