import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private API_SERVER = "https://randomuser.me/api";
  private HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  });
  constructor(private httpClient: HttpClient) {}

  getrandomuser() {
    return this.httpClient.get<any>(`${this.API_SERVER}/?results=10`, {
      headers: this.HttpHeaders,
    });
  }
}
