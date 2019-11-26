import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";

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
  livraison:string = "";
  price:number;
  commande=[];
  numero_mode : number;
  code_transaction: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public api : ApiProvider) {
    this.mode=this.navParams.get('mode');
    this.livraison=this.navParams.get('livraison');
    this.price=this.navParams.get('price');
    this.commande=this.navParams.get('commande');
    console.log("a",this.livraison);

    if(this.mode=='MTN Mobile Money'){
      this.numero_mode=677777777;
    }
    else{
      this.numero_mode=699999999;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  closeModal() {
    this.navCtrl.pop();
  }

  saveCommand(){
    console.log(this.code_transaction);
    if(this.code_transaction!=null){
      this.showAlert(this.navParams.get('livraison'))
    }
    else{
      this.api.doToast("Code de la transaction absent", 2000);
    }
  }

  showAlert(t){
    console.log(t);
    let text="";

    if(t=='magasin'){
      text="Votre commande est disponbile dans notre magasin sis au quartier Kotto, entrée chefferie. Ouvert de lundi à samedi de 9h à 19h";
    }
    else if(t=='normal'){
      text = " Votre commande vous sera livrée sous <strong class='vert'> 3 jours</strong> maximum. Notre service de livraison vous contactera sous peu."
    }
    else if(t=='express'){
      text = " Votre commande vous sera livrée sous <strong class='vert'> 24 heures</strong> maximum. Notre service de livraison vous contactera sous peu."
    }

    const prompt = this.alertCtrl.create({
      title: 'Merci pour votre achat',
      message: text,
      buttons: [
        {
          text: 'Fermer',
          handler: data => {
            console.log('Saved clicked');

          }
        }
      ]
    });
    prompt.present();
  }
}
