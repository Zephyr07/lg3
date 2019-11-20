import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {InfoPage} from "../info/info";
import {CommandListPage} from "../command-list/command-list";
import {PartnerPage} from "../partner/partner";

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  info=InfoPage;
  command=CommandListPage;
  partner=PartnerPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  openPage(t){
    console.log(t);
    this.navCtrl.push(t)
  }

  logout(){
    alert("Deconnexion");
  }
}
