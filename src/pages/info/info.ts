import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {AuthProvider} from "../../providers/auth/auth";
import {Storage} from "@ionic/storage";
import {LoadingProvider} from "../../providers/loading/loading";

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {
  user={customer:{}};
  edit:false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private api : ApiProvider,public alertCtrl: AlertController,
              private auth : AuthProvider, private storage: Storage,private load : LoadingProvider) {
    this.load.show("de vos informations",true);
    this.api.Users.get(this.navParams.get('user_id'),{_includes:'customer'}).subscribe(d=>{
      console.log(d.body);
      this.user=d.body;
    },d=>{
      this.load.close();
      this.api.doToast("Erreur dans le chargement des données, merci de reessayer plus tard",3000);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }


  updateInfo() {
    console.log(this.user);
    this.load.show("Modification...",false);
    // @ts-ignore
    this.user.status="active";
    // @ts-ignore
    this.auth.update_info(this.user).then(d => {
      this.storage.set('user',d.user);
      // mise à jour du customer
      // @ts-ignore
      this.api.Customers.get(this.user.customer.id).subscribe(dd=>{
        // @ts-ignore
        dd.body.name=this.user.customer.name;
        // @ts-ignore
        dd.body.phone=this.user.customer.phone;
        // @ts-ignore
        dd.body.gender=this.user.customer.gender;
        dd.id=d.body.id;
        dd.put().subscribe(data=>{
          console.log(dd,data);
          // mise à jour du storage
          this.storage.set("user",d).then(da=>{
            this.load.close();
            this.edit=false;
            this.api.doToast('Compte modifié',2000);
          },d=>{
            this.load.close();
            this.api.doToast("Erreur dans le chargement des données, merci de réessayer plus tard",3000);
          })
        },d=>{
          this.load.close();
          this.api.doToast("Erreur dans le chargement des données, merci de réessayer plus tard",3000);
        })
      },d=>{
        this.load.close();
        this.api.doToast("Erreur dans le chargement des données, merci de réessayer plus tard",3000);
      })

    },d=>{
      this.load.close();
      this.api.doToast("Erreur dans le chargement des données, merci de réessayer plus tard",3000);
    });
  }
}
