import { Component } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  IonicPage,
  ModalController,
  NavController,
  NavParams
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {PaymentPage} from "../payment/payment";
import * as _ from 'lodash';
import {ApiProvider} from "../../providers/api/api";

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
  commande=[];
  priceTotal=0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController,
              public modalCtrl: ModalController, private storage: Storage, private api : ApiProvider) {
    console.log("ae");
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  presentActionSheet() {
    if(this.livraison!=""){
      const actionSheet = this.actionSheetCtrl.create({
        title: 'Mode de paiement',
        buttons: [
          {
            text: 'Mtn Mobile Money',
            //role: 'destructive',
            handler: () => {
              console.log('Destructive clicked a');
              let profileModal = this.modalCtrl.create(PaymentPage,
                {
                  mode: 'MTN Mobile Money' ,
                  commande : this.commande,
                  price:this.priceTotal,
                  livraison:this.livraison
                });
              profileModal.present();
            }
          },{
            text: 'Orange Money',
            handler: () => {
              console.log('Archive clicked');
              let profileModal = this.modalCtrl.create(PaymentPage,
                { mode: 'Orange Money' ,
                  commande : this.commande,
                  price:this.priceTotal,
                  livraison:this.livraison
                });
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
    else{
      this.api.doToast('Merci de selectionner un mode de livraison',2000);
    }

  }

  choixLivraison(t){
    this.livraison=t;
    this.priceTotal=this.prix_total(this.commande);
  }

  prix_total(commande){
    let total=0;
    _.each(commande,function(c){
      total+= c.quantity* c.product.price;
    });
    if(this.livraison=='normal'){
      return total+1000;
    }
    else if(this.livraison=='express'){
      return total+2000;
    }
    else{
      return total;
    }
  }

  viderPanier(){
    this.storage.set('commande',null).then((d)=>{});
    this.commande=[];
  }


  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    this.init();
    setTimeout(() => {
      //console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  init(){
    this.storage.get('commande').then((d)=>{
      console.log(d);
      this.commande=d;
      this.priceTotal=this.prix_total(d);
    });
  }

  removeProduct(p){
    if(p.quantity>0){
      let index= _.indexOf(this.commande,p);
      this.commande[index].quantity--;
      if(this.commande[index].quantity==0){
        this.commande.splice(index,1);
        this.checkCommande();
      }
    }
    this.priceTotal=this.prix_total(this.commande);
    this.storage.set("commande",this.commande).then(d=>{
    });
  }

  deleteProduct(p){
    let index= _.indexOf(this.commande,p);
    this.commande.splice(index,1);
    this.priceTotal=this.prix_total(this.commande);
    this.storage.set("commande",this.commande).then(d=>{
      this.api.doToast("Produit supprimé",1000);
    });
    this.checkCommande();
  }

  checkCommande(){
    if(this.commande.length<1){
      this.livraison='';
      this.priceTotal=0;
    }
  }

}
