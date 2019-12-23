import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {ProductPage} from "../product/product";
import {ApiProvider} from "../../providers/api/api";
import {LoadingProvider} from "../../providers/loading/loading";

/**
 * Generated class for the ProductListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

  products=[{category:{}}];
  name="";
  category_id=0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public  api : ApiProvider, private load: LoadingProvider,) {

    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
  }

  presentProfileModal(id) {
    let profileModal = this.modalCtrl.create(ProductPage, { id: id });
    profileModal.present();
  }

  getProductByCategory(category_id){
    this.load.show("des produits",true);
    this.api.Products.getList({_includes:'category',should_paginate:false,'category_id':category_id,'_sort':'name', '_sortDir':'asc','status':'available'}).subscribe(data=>{
      this.products=data;
      console.log(data);
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
    this.category_id=this.navParams.get("category_id");
    //this.products=_.filter(this.api.produits,{category_id:this.category_id});
    //this.name=this.products[0].category.name;
    this.getProductByCategory(this.category_id)
  }
}
