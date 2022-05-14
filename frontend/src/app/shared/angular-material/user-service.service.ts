import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
url = environment.apiUrl;

  constructor(
    private httpClient : HttpClient
  ) { }

  login(data: any) {
    return this.httpClient.post(this.url + "/iconnect/login", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  signup(data: any) {
    return this.httpClient.post(this.url + "/iconnect/signup", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }
  checkToken(){
    return this.httpClient.get(this.url + '/iconnect/checkToken');
  }

}
