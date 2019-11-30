import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {ProductPage} from "../product/product";
import {ApiProvider} from "../../providers/api/api";

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  name="";
  products=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private api : ApiProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  presentProfileModal(id) {
    let profileModal = this.modalCtrl.create(ProductPage, { id: id });
    profileModal.present();
  }

  findProduct(name){
    if(name==''){
      this.products=[];
    }
    else{
      this.api.Products.getList({'name-lk':name,'_sort':'name', 'dir':'asc'}).subscribe(d=>{
        console.log(d);
        this.products=d;
      })
    }
  }
}
