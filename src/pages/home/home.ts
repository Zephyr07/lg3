import {Component, ViewChild} from '@angular/core';
import {ModalController, NavController, Slides} from 'ionic-angular';
import {ProductListPage} from "../product-list/product-list";
import {ProductPage} from "../product/product";
import {ApiProvider} from "../../providers/api/api";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild("slides") slides: Slides;

  constructor(public navCtrl: NavController,public modalCtrl: ModalController, public api: ApiProvider) {


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

  openPage(text){
    this.navCtrl.push(ProductListPage);
  }

  presentProfileModal(id) {
    let profileModal = this.modalCtrl.create(ProductPage, { id: id });
    profileModal.present();
  }

}
