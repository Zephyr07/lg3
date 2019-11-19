import {AutoCompleteService} from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map'

@Injectable()
export class AutoCompleteServiceService implements AutoCompleteService {
  labelAttribute = "name";

  constructor(private http:Http) {

  }
  getResults() {
    return this.http.get("https://restcountries.eu/rest/v1/name/")
      .map(
        result =>
        {
          return result.json()
        });
  }
}
