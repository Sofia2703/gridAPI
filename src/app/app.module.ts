import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './services/api.service';
import { CommonService } from './services/common/common.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { ShortPipe } from './dashboard/short';
import { FilterPipe } from './dashboard/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ShortPipe,
    NgxPaginationModule,
    LayoutComponent,
    // DashboardComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [ApiService, CommonService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}
