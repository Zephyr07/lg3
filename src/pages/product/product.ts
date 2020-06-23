import {Component, ViewChild} from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, Slides} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {LoadingProvider} from "../../providers/loading/loading";
import {ProductQuantityPage} from "../product-quantity/product-quantity";
import {PRODUCT_LIST} from '../../data/products';
import * as _ from 'lodash';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  choix:string="info";
  product={name:''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private load: LoadingProvider,
              private api:ApiProvider,public modalCtrl: ModalController) {
    this.init();
  }

  ionViewDidLoad() {
    this.slides.autoplay=this.api.autoplay_val;
    this.slides.speed=this.api.slide_speed;
  }

  closeModal() {
    this.navCtrl.pop();
  }


  presentProfileModal() {
    let profileModal = this.modalCtrl.create(ProductQuantityPage, { product: this.product });
    profileModal.present();
  }

  @ViewChild("slides") slides: Slides;
  slideChanged(){
    if(this.slides.isBeginning()){
      this.slides.startAutoplay();
    }
  }

  getProduct(id){
    //this.load.show("des informations sur le produit",true);
    let data = _.find(PRODUCT_LIST,{id:id});
    console.log(data);
    this.product = data;
    /*/ @ts-ignore
    this.product.description=this.product.description.split('.');
    // @ts-ignore
    this.product.dosage=this.product.dosage.split('.');
    // @ts-ignore
    this.product.composition=this.product.composition.split('.');
    */
    //this.load.close();
  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    this.init();
    setTimeout(() => {
      refresher.complete();
    }, 700);
  }

  init(){
    //this.getProduct(14)
    this.getProduct(parseInt(this.navParams.get('id')))
  }
}
