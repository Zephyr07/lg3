import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {ProductPage} from "../product/product";
import {PaymentPage} from "../payment/payment";

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  livraison:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Mode de paiement',
      buttons: [
        {
          text: 'Mtn Mobile Money',
          //role: 'destructive',
          handler: () => {
            console.log('Destructive clicked a');
            let profileModal = this.modalCtrl.create(PaymentPage, { mode: 'MTN Mobile Money' , price : 75000});
            profileModal.present();
          }
        },{
          text: 'Orange Money',
          handler: () => {
            console.log('Archive clicked');
            let profileModal = this.modalCtrl.create(PaymentPage, { mode: 'Orange Money', price : 75000});
            profileModal.present();
          }
        },{
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  choixLivraison(t){
    if(t=="normal"){
      //this.livraison="normal";
    }
  }
}
