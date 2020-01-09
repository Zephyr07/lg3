import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the ProductQuantityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-quantity',
  templateUrl: 'product-quantity.html',
})
export class ProductQuantityPage {
  product:any={};
  quantity:number=1;
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiProvider, private storage: Storage) {
    this.product=this.navParams.get("product"); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductQuantityPage');
  }

  addCart() {
    let state_in=false;
    if(this.quantity>0){
      this.storage.get('commande').then((c)=>{
        if(c==null || c.length==0){
          let a=[];
          //alore creation
          a.push(
            {
              product:this.product,
              quantity:this.quantity
            });
          this.storage.set("commande",a).then(d=>{
            this.api.doToast(this.quantity+" "+ this.product.name+" ajouté(s) au panier",1000);
            this.quantity=0;
            console.log(d);
            this.closeModal();
          })

        }
        else{
          // avec des produits
          // verification de la presence du même produit
          for(let i in c){
            if(c[i].product.name==this.product.name){
              state_in=true;
            }
          }
          if(state_in){ // produit déjà dans la commande
            for(let i in c){
              if(c[i].product.name==this.product.name){
                c[i].quantity=c[i].quantity+this.quantity;
              }
            }
          }
          else{
            c.push(
              {
                product:this.product,
                quantity:this.quantity
              });
          }
          this.storage.set("commande",c).then(b=>{
            this.api.doToast(this.quantity+" "+ this.product.name+" ajouté(s) au panier",1000);
            this.quantity=0;
            console.log(b);
            this.closeModal();
          })
        }
      });

    }
  }
  closeModal() {
    this.navCtrl.pop();
  }
}
