import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {CartPage} from "../cart/cart";
import {AccountPage} from "../account/account";
import {PartnerPage} from "../partner/partner";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PartnerPage;
  tab3Root = CartPage;
  tab4Root = AccountPage;

  constructor() {

  }
}
