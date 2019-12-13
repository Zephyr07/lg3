import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {DeliveryPage} from "../delivery/delivery";
import * as _ from "lodash";
import {Storage} from "@ionic/storage";
import {ShopListPage} from "../shop-list/shop-list";
import {LoadingProvider} from "../../providers/loading/loading";

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
  user:{customer:{id:0}};

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              public api : ApiProvider, private storage: Storage, private load : LoadingProvider) {
    // recuperation du user
    this.load.show("",true);
    this.storage.get("user").then(d=>{
      this.user=d;
      // recuperation du customer
      this.api.Customers.getList({user_id:d.id}).subscribe(da=>{
        // @ts-ignore
        console.log("cust",da);
        this.user.customer=da[0];

        this.mode=this.navParams.get('mode');
        this.livraison=this.navParams.get('livraison');
        this.price=this.navParams.get('price');
        this.commande=this.navParams.get('commande');
        console.log("a",this.livraison);

        if(this.mode=='MTN Mobile Money'){
          this.numero_mode=653679318;
        }
        else{
          this.numero_mode=655546897;
        }
        this.load.close();
      },d=>{
        this.load.close();
        this.api.doToast("Erreur dans le chargement des données, merci de reessayer plus tard",3000);
      })
    },d=>{
      this.load.close();
      this.api.doToast("Erreur dans le chargement des données, merci de reessayer plus tard",3000);
    });
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
      let bill={};
      if(this.livraison=='normal'){
        bill={
          amount:this.prix_total(this.commande),
          payment_code:this.code_transaction,
          payment_method:this.mode,
          customer_id:this.user.customer.id,
          status:'pending_payment'
        };
      }
      else{
        bill={
          amount:this.prix_total(this.commande),
          payment_code:this.code_transaction,
          payment_method:this.mode,
          customer_id:this.user.customer.id,
          status:'pending_payment'
        };
      }

      console.log("bill",bill);
      this.load.show("",true);
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
      },d=>{
        this.load.close();
        this.api.doToast("Erreur dans le chargement des données, merci de reessayer plus tard",3000);
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

      text="Votre commande est disponbile dans une de <strong class='vert'>nos boutiques</strong>. Nous sommes ouvert de lundi à samedi de 9h à 19h";

      const prompt = this.alertCtrl.create({
        title: 'Merci pour votre achat',
        message: text,
        buttons: [
          {
            text: 'Nos boutiques',
            handler: data => {
              this.closeModal();
              this.navCtrl.push(ShopListPage);
            }
          },
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
    },d=>{
      this.load.close();
      this.api.doToast("Erreur dans le chargement des données, merci de réessayer plus tard",3000);
    })
  }

  openDelivery(){
    this.navCtrl.push(DeliveryPage,{bill_id:this.bill,mode:this.livraison});
  }
}
