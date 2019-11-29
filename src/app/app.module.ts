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

export function RestangularConfigFactory(RestangularProvider) {
  RestangularProvider
    .setBaseUrl(API_ENDPOINT)
    .addResponseInterceptor(function (data, operation, what, url, response, deferred) {

      if (operation === 'getList') {

        let newResponse = what;
        if (data.per_page===undefined) {

          // newResponse = response.data[what]
          // newResponse.error = response.error
          return data
        }
        newResponse = data.data;
        newResponse.metadata = _.omit(data, 'data');


        return newResponse

      }

      return response
    })
    .addFullRequestInterceptor((element, operation, path, url, headers, params) => {
      /*console.log('element',element);
      console.log('operation',operation);
      console.log('what',what);
      console.log('url',url);
      console.log('headers',headers);
      console.log('params',params);*/

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
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    LoadingProvider,
  ]
})
export class AppModule {}
