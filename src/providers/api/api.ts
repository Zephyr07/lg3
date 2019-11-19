import {Injectable} from '@angular/core';
import {ToastController} from "ionic-angular";

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ApiProvider {

  public date_format : string = "Y-M-D";

  public autoplay_val=5000;
  public slide_speed=700;

  constructor(private toastCtrl: ToastController) {

  }

  formarPrice(price){
    if(price==undefined){
      return "";
    }
    else{
      price += "";
      let tab = price.split('');
      let p = "";
      for (let i = tab.length; i > 0; i--) {
        if (i % 3 == 0) {
          p += " ";
        }
        p += tab[tab.length - i];
      }
      return p;
    }
  }

  doToast(text,duration) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: duration,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
