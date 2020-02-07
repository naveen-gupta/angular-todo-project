import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class DataService {
  private REST_API_SERVER = "http://localhost:3000/todos";

  constructor(private httpClient: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    let errorMessage = "Unknown error!";
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRequest() {
    return this.httpClient
      .get(this.REST_API_SERVER)
      .pipe(retry(3), catchError(this.handleError));
  }

  public sendPutRequest(id, newData) {
     return this.httpClient
      .put(`${this.REST_API_SERVER}/${id}`, newData, {})
      .pipe(catchError(this.handleError));
  }

  public sendDeleteRequest(id) {
     return this.httpClient
      .delete(`${this.REST_API_SERVER}/${id}`, {})
      .pipe(catchError(this.handleError));
  }

  public sendPostRequest(data) {
     return this.httpClient
      .post(`${this.REST_API_SERVER}`, data, {})
      .pipe(catchError(this.handleError));
  }
}
