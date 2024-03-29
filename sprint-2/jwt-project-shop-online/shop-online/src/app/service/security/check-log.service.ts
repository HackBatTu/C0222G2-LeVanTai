import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from '../../../environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CheckLogService {
  constructor(private httpClient: HttpClient) {
  }

  onLogin(account: any): Observable<any> {
    return this.httpClient.post(API_URL + "/authenticate", account);
  }
  onLogout():Observable<any> {
    return this.httpClient.post(API_URL + "/log/out", null);
  }
}
