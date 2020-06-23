import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import * as _ from 'lodash';
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
import {PartnerFormPageModule} from "../pages/partner-form/partner-form.module";
import {IonicStorageModule} from "@ionic/storage";
import {API_ENDPOINT} from "../services/contants";
import {RestangularModule} from "ngx-restangular";
import {DeliveryPageModule} from "../pages/delivery/delivery.module";
import {AuthProvider} from "../providers/auth/auth";
import {ShopListPageModule} from "../pages/shop-list/shop-list.module";
import {ConditionsPageModule} from "../pages/conditions/conditions.module";
import {PolitiquePageModule} from "../pages/politique/politique.module";
import {CallNumber} from "@ionic-native/call-number";
import {ProductQuantityPageModule} from "../pages/product-quantity/product-quantity.module";
import {LoginPageModule} from "../pages/login/login.module";
import {ContactPageModule} from "../pages/contact/contact.module";
import {StockistPageModule} from "../pages/stockist/stockist.module";


export function RestangularConfigFactory(RestangularProvider) {
  RestangularProvider
    .setBaseUrl(API_ENDPOINT)
    .addResponseInterceptor(function (data, operation, what, url, response, deferred) {

      if (operation === 'getList') {

        let newResponse = what;
        if (data.per_page===undefined) {
          return data
        }
        newResponse = data.data;
        newResponse.metadata = _.omit(data, 'data');


        return newResponse

      }

      return response
    })
    .addFullRequestInterceptor((element, operation, path, url, headers, params) => {
      let token = localStorage.getItem('jwt_token');
      if (token) {
        headers.Authorization = 'Bearer ' + token;
        headers['Access-Token'] = token
      }
    })
  ;
}

@NgModule({
  declarations: [
    MyApp,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    RestangularModule.forRoot(RestangularConfigFactory),
    TabsPageModule,
    ContactPageModule,
    HomePageModule,
    ProductPageModule,
    CartPageModule,
    ProductQuantityPageModule,
    LoginPageModule,
    PaymentPageModule,
    SearchPageModule,
    AccountPageModule,
    ConditionsPageModule,
    PolitiquePageModule,
    InfoPageModule,
    ShopListPageModule,
    DeliveryPageModule,
    StockistPageModule,
    CommandListPageModule,
    CommandPageModule,
    PartnerPageModule,
    PartnerFormPageModule,
    ProductListPageModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    CallNumber,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    AuthProvider,
    LoadingProvider,
  ]
})
export class AppModule {}
