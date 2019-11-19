import {Injectable, Pipe, PipeTransform} from "@angular/core";


@Pipe({
  name: 'billStatus',
})

@Injectable()
export class BillStatutPipe implements PipeTransform{

  transform(value: any, ...args: any[]): any {
    if(value=='expired')
    {
      return "Echue";
    }
    else if(value=='waiting_payment'){
      return "En attente de paiement";
    }
    else if(value=='waiting_cashier_approval'){
      return "En attente visa caisse";
    }
    else if(value=='canceled'){
      return "Extournée";
    }
    else if(value=='paided'){
      return "Payée";
    }
    else if(value==1){
      return "Oui";
    }
    else if(value==0){
      return "Non";
    }
  }
}
