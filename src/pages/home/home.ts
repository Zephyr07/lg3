import {Component, ViewChild} from '@angular/core';
import {ModalController, NavController, Slides} from 'ionic-angular';
import {ProductPage} from "../product/product";
import {ApiProvider} from "../../providers/api/api";
import {LoadingProvider} from "../../providers/loading/loading";
import {ProductQuantityPage} from "../product-quantity/product-quantity";
import {PRODUCT_LIST} from '../../data/products';
import * as _ from 'lodash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild("slides") slides: Slides;
  products:any;
  produits:any;
  productList=PRODUCT_LIST;

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

    this.productList.forEach(function(v,k){
      // @ts-ignore
      v.description=v.description.split('.');
      // @ts-ignore
      v.dosage=v.dosage.split('.');
      // @ts-ignore
      v.composition=v.composition.split('.');
    });
    this.productList=_.sortBy(this.productList, 'name');
    this.produits=this.productList;
    this.load.close();

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
    this.productList=this.produits;

    // set val to the value of the searchbar
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.productList = this.productList.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

    // if the value is an empty string don't filter the items

  }

  presentProfileModalCart(product) {
    let p={
      id:product.id,
      name:product.name,
      picture1:product.picture1,
      description:product.description,
      price:product.price
    };
    let profileModal = this.modalCtrl.create(ProductQuantityPage, { product: p });
    profileModal.present();
  }
}
