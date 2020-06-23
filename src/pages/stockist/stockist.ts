import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';
import {STOCKIST_LIST} from '../../data/stockists';
/**
 * Generated class for the StockistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stockist',
  templateUrl: 'stockist.html',
})
export class StockistPage {
  STOCKIST_LIST = STOCKIST_LIST;
  region="";
  stockist=[];
  old_stockist=[];
  price = 0;
  code ='';
  commande:any;
  text : string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.STOCKIST_LIST = _.orderBy(this.STOCKIST_LIST,'region');
    this.price=parseInt(this.navParams.get('price'));
    this.commande=this.navParams.get('commande');

    this.text = "Bonjour, je souhaite passer la commande ci-dessous, et j'ai besoin d'assistance. \n";

    this.commande.forEach((v,k)=>{
      this.text += "+ "+ v.product.name+ " - "+ v.quantity + " - "+ (v.quantity*v.product.price)+"\n"
    });
    this.text +=" Prix total " + this.price;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockistPage');
  }

  choixRegion(){
    console.log(this.region);
    this.code = _.find(this.STOCKIST_LIST,{'region':this.region}).code;
    this.stockist = _.find(this.STOCKIST_LIST,{'region':this.region}).list;
    this.stockist= _.orderBy(this.stockist,'name');
    this.old_stockist=this.stockist;
    console.log(this.stockist,this.code);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.stockist=this.old_stockist;

    // set val to the value of the searchbar
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.stockist = this.stockist.filter((item) => {
        return (item.location.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

    // if the value is an empty string don't filter the items

  }

  contactUs(){
    // ouverture de whatsapp avec les informations
    console.log(this.commande);
    let text = "Bonjour, je souhaite passer la commande ci-dessous, et j'ai besoin d'assistance";
    this.commande.forEach((v,k)=>{
      text += "Produits - Quantité - Prix\n"
      text += v.product.name+ " - "+ v.quanttiy + " - "+ (v.quantity*v.product.price)
    })

    console.log(text);
  }

}
