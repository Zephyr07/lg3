import {Injectable} from "@angular/core";
import {LoadingController} from "ionic-angular";


@Injectable()
export class LoadingProvider {

  loader:any;
  constructor(public loadingCtrl: LoadingController) { }


  show(text, etat) {
    let content="";
    if(etat){
      content="Chargement "+text
    }
    else{
      content=text;
    }

    this.loader = this.loadingCtrl.create({
      content: content
    });
    this.loader.present();
    setTimeout(() => {
      this.loader.dismiss();
      console.log("arret du loading");
    }, 10000)
  }

  close(){
    this.loader.dismiss();
  }
}
