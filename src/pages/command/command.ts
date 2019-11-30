import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";

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
  bill={bill_products:[]};

  constructor(public navCtrl: NavController, public navParams: NavParams, private api : ApiProvider) {
    this.getBill(this.navParams.get('id'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommandPage');
  }

  closeModal() {
    this.navCtrl.pop();
  }

  getBill(id){
    this.api.Bills.get(id,{_includes:'bill_products.product'}).subscribe(d=>{
      console.log(d);
      this.bill=d.body;
    })
  }
}
