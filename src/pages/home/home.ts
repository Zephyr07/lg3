import {Component, ViewChild} from '@angular/core';
import {AlertController, ModalController, NavController, Slides} from 'ionic-angular';
import {ProductListPage} from "../product-list/product-list";
import {ProductPage} from "../product/product";
import {ApiProvider} from "../../providers/api/api";
import * as _ from 'lodash';
import {AuthProvider} from "../../providers/auth/auth";
import {LoadingProvider} from "../../providers/loading/loading";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild("slides") slides: Slides;

  categories:any;

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

  openPage(id){
    //console.log("c",id);
    this.navCtrl.push(ProductListPage,{category_id:id});
  }

  presentProfileModal(id) {
    let profileModal = this.modalCtrl.create(ProductPage, { id: id });
    profileModal.present();
  }

  getCategory(){
    this.load.show("des produits");
    this.api.Categories.getList({_includes:"products",should_paginate:false}).subscribe(data=>{
      this.categories=data;
      //console.log(data);
      this.load.close();
    },d=>{
      this.load.close();
      this.api.doToast("Erreur dans le chargement des données, merci d'actualiser la page",5000);
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
    this.categories=[];

    this.getCategory();
  }
}
