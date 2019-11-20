import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  mode:string = "";
  price:number;
  numero_mode : string = "77777";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams);
    this.mode=this.navParams.get('mode');
    this.price=this.navParams.get('price');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  closeModal() {
    this.navCtrl.pop();
  }
}
