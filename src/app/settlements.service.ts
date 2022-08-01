import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettlementsService {

  baseUrl: string = "https://trucks-api-tmco3bin6q-uc.a.run.app";
  // baseUrl: string = "http://localhost:5000";


  constructor(private http: HttpClient) { }

  getSettlementSummaries(): Observable<Summary[]> {
    return this.http.get<Summary[]>(this.baseUrl + "/settlements/summaries");
  }  
}

export interface Summary {
  SettlementId: string;
  SettlementDate: Date;
  WeekNumber: number;
  Year: number;
  CompanyId: number;
  CheckAmount: number;
}