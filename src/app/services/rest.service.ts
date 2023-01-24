import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoaderComponent} from "../component/loader/loader.component";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  baseUrl = environment.url;

  constructor(private http: HttpClient) {
  }

  async post(url: string, body: any, contentType = 'application/json'): Promise<any> {
    LoaderComponent.showLoader();
    return this.http.post(this.baseUrl + url, body, this.getHeaders(contentType)).toPromise()
      .then((response) => {
        LoaderComponent.hideLoader();
        return Promise.resolve(response)
      }).catch((e) => {
        LoaderComponent.hideLoader();
        return Promise.reject(e)
      })

  }

  async get(url: string, contentType = 'application/json'): Promise<any> {
    LoaderComponent.showLoader();
    return this.http.get(this.baseUrl + url, this.getHeaders(contentType)).toPromise()
      .then((response) => {
        LoaderComponent.hideLoader();
        return Promise.resolve(response);
      })
      .catch((e) => {
        LoaderComponent.hideLoader();
        return Promise.reject(e);
      })
  }

  put(url: string, contentType = 'application/json'): Promise<any> {
    return this.http.put(this.baseUrl + url, this.getHeaders(contentType)).toPromise();
  }

  private getHeaders(contentType: string): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': contentType,
        'Accept': 'application/json, text/plain, */*'
      })
    };
  }

  async uploadImage(image, name, uid: string, urlNode: string, nodeName) {
    LoaderComponent.showLoader();
    let data = new FormData();
    let time = new Date();
    data.append(nodeName, image, uid + urlNode + time.toISOString());
    data.append('uid', uid);
    return this.http.post(this.baseUrl + 'user/' + urlNode, data).toPromise()
      .then((res) => {
        LoaderComponent.hideLoader();
        return Promise.resolve(res);
      })
      .catch((e) => {
        LoaderComponent.hideLoader();
        console.log(e);
        return Promise.reject(e)
      })
  }

}
