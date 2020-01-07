import {Component, ViewChild} from '@angular/core';
import {ModalController, NavController, Slides} from 'ionic-angular';
import {ProductPage} from "../product/product";
import {ApiProvider} from "../../providers/api/api";
import {LoadingProvider} from "../../providers/loading/loading";
import {ProductQuantityPage} from "../product-quantity/product-quantity";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild("slides") slides: Slides;
  products:any;
  produits:any;

  constructor(public navCtrl: NavController,public modalCtrl: ModalController, public api: ApiProvider,
              public load : LoadingProvider) {
    this.init();
  }

  ionViewDidLoad() {
    this.slides.autoplay=this.api.autoplay_val;
    this.slides.speed=this.api.slide_speed;
  }

  slideChanged(){
    if(this.slides.isBeginning()){
      this.slides.startAutoplay();
    }
  }

  presentProfileModal(id) {
    let profileModal = this.modalCtrl.create(ProductPage, { id: id });
    profileModal.present();
  }

  getProducts(){
    this.load.show("des produits",true);
    this.api.Products.getList({"status":"available",should_paginate:false,'_sort':'name', '_sortDir':'asc'}).subscribe(data=>{
      data.forEach(function(v,k){
        v.description=v.description.split('.');
        v.dosage=v.dosage.split('.');
        v.composition=v.composition.split('.');
      });
      console.log(data);
      this.products=data;
      this.produits=data;
      this.load.close();
    },d=>{
      this.load.close();
      this.api.doToast("Erreur dans le chargement des données, merci d'actualiser la page",5000);
    })
  }

  doRefresh(refresher) {
    this.init();
    setTimeout(() => {
      refresher.complete();
    }, 700);
  }

  init(){
    this.products=[];
    this.getProducts();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.products=this.produits;

    // set val to the value of the searchbar
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.products = this.products.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

    // if the value is an empty string don't filter the items

  }

  presentProfileModalCart(product) {
    let profileModal = this.modalCtrl.create(ProductQuantityPage, { product: product });
    profileModal.present();
  }
}
