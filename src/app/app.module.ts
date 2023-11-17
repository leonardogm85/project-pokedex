import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbPaginationModule, NgbToastModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './containers/list/list.component';
import { ViewComponent } from './containers/view/view.component';
import { CardComponent } from './components/card/card.component';
import { SearchComponent } from './components/search/search.component';
import { PageComponent } from './components/page/page.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { NormalizePipe } from './pipes/normalize.pipe';
import { PadStartPipe } from './pipes/pad-start.pipe';
import { TypeDirective } from './directives/type.directive';
import { ToastComponent } from './components/toast/toast.component';
import { spinnerInterceptor } from './interceptors/spinner.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ViewComponent,
    CardComponent,
    SearchComponent,
    PageComponent,
    ScrollToTopComponent,
    NotFoundComponent,
    NormalizePipe,
    PadStartPipe,
    TypeDirective,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbToastModule,
    NgxSpinnerModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient(
      withInterceptors([
        spinnerInterceptor
      ])
    )
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
