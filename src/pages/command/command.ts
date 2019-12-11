import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {LoadingProvider} from "../../providers/loading/loading";

/**
 * Generated class for the CommandPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-command',
  templateUrl: 'command.html',
})
export class CommandPage {
  bill={bill_products:[],deliveries:[{}]};

  constructor(public navCtrl: NavController, public navParams: NavParams, private api : ApiProvider, private load: LoadingProvider) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommandPage');
  }

  closeModal() {
    this.navCtrl.pop();
  }

  getBill(id){
    this.load.show("de la commande",true);
    this.api.Bills.get(id,{_includes:'bill_products.product,deliveries'}).subscribe(d=>{
      console.log(d);
      if(d.body.deliveries==undefined){
        d.body.deliveries=[];
      }
      this.bill=d.body;
      this.load.close();
    },d=>{
      this.load.close();
      this.api.doToast("Erreur dans le chargement des données, merci de reessayer plus tard",3000);
    })
  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    this.init();
    setTimeout(() => {
      refresher.complete();
    }, 700);
  }

  init(){
    this.getBill(this.navParams.get('id'));
  }
}
