import {Component, ViewChild} from '@angular/core';
import {ModalController, NavController, Slides} from 'ionic-angular';
import {ProductListPage} from "../product-list/product-list";
import {ProductPage} from "../product/product";
import {ApiProvider} from "../../providers/api/api";
import * as _ from 'lodash';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild("slides") slides: Slides;

  products:any;
  constructor(public navCtrl: NavController,public modalCtrl: ModalController, public api: ApiProvider) {
    this.products=[];
    let data = _.groupBy(this.api.produits,"category.name");

    for(let i in data){
      this.products.push({
        category:i,
        category_id:data[i][0].category_id,
        products:data[i]
      })
    }
    console.log(this.products);

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
    console.log("c",id);
    this.navCtrl.push(ProductListPage,{category_id:id});
  }

  presentProfileModal(id) {
    let profileModal = this.modalCtrl.create(ProductPage, { id: id });
    profileModal.present();
  }

}
