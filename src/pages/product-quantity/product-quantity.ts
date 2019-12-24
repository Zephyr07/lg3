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
        // verification si le produit est déjà dans commande
        if(c==null){
          c=[];
          state_in=false;
        }
        else{
          for(let i in c){
            if(c[i].product.name==this.product.name){
              state_in=true;
            }
          }
        }

        if(state_in){ // produit déjà dans la commande
          for(let i in c){
            if(c[i].product.name==this.product.name){
              c[i].quantity=c[i].quantity+this.quantity;
            }
          }
        }
        else{ // produit absent
          c.push(
            {
              product:this.product,
              quantity:this.quantity
            });
        }

        this.storage.set('commande',c).then(r=>{
          this.api.doToast(this.quantity+" "+ this.product.name+" ajouté(s) au panier",1000);
          this.quantity=0;

          this.storage.get('commande').then((d)=>{
            console.log(d);
            this.closeModal();
          });
        })

      });

    }
  }
  closeModal() {
    this.navCtrl.pop();
  }
}
