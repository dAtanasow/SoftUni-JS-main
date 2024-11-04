import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ThemeModule } from './theme/theme.module';
import { AddThemeComponent } from './theme/add-theme/add-theme.component';
import { UserModule } from './user/user.module';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [AddThemeComponent, HomeComponent, AppComponent, ErrorComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    CoreModule,
    SharedModule,
    ThemeModule,
    UserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
