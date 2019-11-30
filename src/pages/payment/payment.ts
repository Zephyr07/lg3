import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {DeliveryPage} from "../delivery/delivery";
import * as _ from "lodash";
import {HomePage} from "../home/home";
import {CartPage} from "../cart/cart";
import {Storage} from "@ionic/storage";

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
  state=true;
  is_bill=false;
  bill:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              public api : ApiProvider, private storage: Storage) {
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
      console.log(this.commande);
      let bill={
        amount:this.prix_total(this.commande),
        payment_code:this.code_transaction,
        payment_method:this.mode,
        customer_id:1,
        status:'new'
      }
      //this.commande.payment_code:this.code_transaction;
      //this.commande.payment_method:this.mode;

      //this.showAlert(this.navParams.get('livraison'))
      this.api.Bills.post(bill).subscribe(data=>{
        this.state=false;
        this.is_bill=true;
        console.log(data);
        //enregistrement des produits
        for(let v in this.commande){
          let p={
            retail_price:this.commande[v].product.price,
            quantity:this.commande[v].quantity,
            bill_id:data.body.id,
            product_id:this.commande[v].product.id
          };
          this.saveBillProduct(p);
        }
        console.log("id bill",data.body.id);
        this.bill=data.body.id;
        this.showAlert(this.livraison,data.body.id);
      });

    }
    else{
      this.api.doToast("Code de la transaction absent", 2000);
    }
  }

  showAlert(t,bill_id){
    console.log(t);
    let text="";

    if(t=='magasin'){

      text="Votre commande est disponbile dans notre magasin sis à <strong class='vert'>Douala au quartier Kotto, entrée chefferie</strong>" +
        " ou à <strong class='vert'> Yaoundé au carrefour Tam - Tam</strong>. Ouvert de lundi à samedi de 9h à 19h";

      const prompt = this.alertCtrl.create({
        title: 'Merci pour votre achat',
        message: text,
        buttons: [
          {
            text: 'Fermer',
            handler: data => {
              console.log('Saved clicked');
              this.storage.set('commande',undefined).then(d=>{
                console.log("aze");
                this.closeModal();
              })

            }
          }
        ]
      });
      prompt.present();
    }
    else {
      this.navCtrl.push(DeliveryPage,{bill_id:bill_id,mode:t});
    }

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

  saveBillProduct(p){
    this.api.BillProducts.post(p).subscribe(data=>{
      console.log("Produit",data);
    })
  }

  openDelivery(){
    this.navCtrl.push(DeliveryPage,{bill_id:this.bill,mode:this.livraison});
  }
}
