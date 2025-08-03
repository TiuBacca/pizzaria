import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageComponentsModule } from './page-components.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { RequestHandleInterceptor } from './interceptors/requestsHandle.interceptor';
import { TokenHandleInterceptor } from './interceptors/tokenHandle.interceptor';
import { AdvertenciaIconePipe } from './components/AdvertenciaIconePipe ';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    PageComponentsModule,
    AppRoutingModule
  ],  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor , multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenHandleInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RequestHandleInterceptor, multi: true }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
