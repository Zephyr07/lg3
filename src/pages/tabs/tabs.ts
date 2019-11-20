import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {CartPage} from "../cart/cart";
import {SearchPage} from "../search/search";
import {AccountPage} from "../account/account";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = CartPage;
  tab4Root = AccountPage;

  constructor() {

  }
}
