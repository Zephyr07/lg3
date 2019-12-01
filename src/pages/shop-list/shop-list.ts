import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {PartnerFormPage} from "../partner-form/partner-form";

/**
 * Generated class for the ShopListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop-list',
  templateUrl: 'shop-list.html',
})
export class ShopListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl : ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopListPage');
  }

  becomePartner(){
    let profileModal = this.modalCtrl.create(PartnerFormPage, { target: 'Stockiste'});
    profileModal.present();
  }

}
