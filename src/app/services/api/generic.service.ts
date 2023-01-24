import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  baseUrl: string = environment.url;

  constructor(private http: HttpClient) { }

  private handleError(error: any) {
    console.log(error);
    return throwError(error);
  }

  getAll(apiUrl: string): Observable<any> {
    return this.http.get<any>(this.baseUrl+apiUrl).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  getSingle(apiUrl: string): Observable<any> {
    return this.http.get<any>(this.baseUrl+apiUrl).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  addSingle(apiUrl: string,entity: any): Observable<any> { 
      console.log("Url:"+this.baseUrl+apiUrl+" Entity:"+JSON.stringify(entity));
      return this.http.post<any>(this.baseUrl+apiUrl, entity).pipe(
      tap(
        data => console.log(data)
      ),
      catchError(this.handleError)
    );
  }

  updateSingle(apiUrl: string,entity: any, id: any): Observable<any> { 
      
    return this.http.put<any>(this.baseUrl+apiUrl+"/"+id, entity).pipe(
    tap(
      data => console.log(data)
    ),
    catchError(this.handleError)
  );
}

  addAll(apiUrl: string,entities: any[]): Observable<any> { 
      
      return this.http.post<any>(this.baseUrl+apiUrl, entities).pipe(
      tap(
        data => console.log(data)
      ),
      catchError(this.handleError)
    );
  }

  deleteAll (apiUrl : string, entities: any[]): Observable<any> { 
      return this.http.post<any>(this.baseUrl+apiUrl, entities).pipe(
      tap(
        data => console.log(data)
      ),
      catchError(this.handleError)
    );
  }

  deleteSingle (apiUrl : string, entity: any): Observable<any> { 
      return this.http.post<any>(this.baseUrl+apiUrl,entity).pipe(
      tap(
        data => console.log(data)
      ),
      catchError(this.handleError)
    );
  }

  activeAll(apiUrl : string, entities: any[]): Observable<any> { 
      return this.http.post<any>(this.baseUrl+apiUrl, entities).pipe(
      tap(
        data => console.log(data)
      ),
      catchError(this.handleError)
    );
  }

  inActiveAll(apiUrl : string, entities: any[]): Observable<any> { 
      return this.http.post<any>(apiUrl, entities).pipe(
      tap(
        data => console.log(data)
      ),
      catchError(this.handleError)
    );
  }
}
