import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {PartnerFormPage} from "../partner-form/partner-form";

/**
 * Generated class for the PartnerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-partner',
  templateUrl: 'partner.html',
})
export class PartnerPage {

  choix:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.choix="presentation";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartnerPage');
  }

  becomePartner(){
    let profileModal = this.modalCtrl.create(PartnerFormPage, { target: 'Partenaire'});
    profileModal.present();
  }

}
