import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ApiProvider} from "../providers/api/api";
import {LoadingProvider} from "../providers/loading/loading";
import {TabsPageModule} from "../pages/tabs/tabs.module";
import {HomePageModule} from "../pages/home/home.module";
import {ProductPageModule} from "../pages/product/product.module";
import {ProductListPageModule} from "../pages/product-list/product-list.module";
import {CartPageModule} from "../pages/cart/cart.module";
import {SearchPageModule} from "../pages/search/search.module";
import {AccountPageModule} from "../pages/account/account.module";
import {InfoPageModule} from "../pages/info/info.module";
import {CommandListPageModule} from "../pages/command-list/command-list.module";
import {CommandPageModule} from "../pages/command/command.module";
import {PartnerPageModule} from "../pages/partner/partner.module";
import {PaymentPageModule} from "../pages/payment/payment.module";

@NgModule({
  declarations: [
    MyApp,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    TabsPageModule,
    HomePageModule,
    ProductPageModule,
    CartPageModule,
    PaymentPageModule,
    SearchPageModule,
    AccountPageModule,
    InfoPageModule,
    CommandListPageModule,
    CommandPageModule,
    PartnerPageModule,
    ProductListPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    LoadingProvider,
  ]
})
export class AppModule {}
