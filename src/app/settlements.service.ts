import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettlementsService {

  // baseUrl: string = "https://trucks-api-tmco3bin6q-uc.a.run.app";
  baseUrl: string = "http://localhost:5000";


  constructor(private http: HttpClient) { }

  getSettlementSummaries(): Observable<Summary[]> {
    return this.http.get<Summary[]>(this.baseUrl + "/settlements/summaries");
  }  

  getDriverSettlements(companyId: string, settlementId: string): Observable<DriverSettlement[]> {
    return this.http.get<DriverSettlement[]>(this.baseUrl + "/driversettlements/" + companyId + "/" + settlementId);
  }    

  getDriverSettlement(companyId: string, settlementId: string, driver: string): Observable<DriverSettlement> {
    return this.http.get<DriverSettlement>(this.baseUrl + "/driversettlements/driver/" + 
      driver + "?companyId=" + companyId + "&settlementId=" + settlementId);
  }    
}

export interface Summary {
  settlementId: string;
  settlementDate: Date;
  weekNumber: number;
  year: number;
  companyId: string;
  checkAmount: number;
}

export interface DriverSettlement {
  driverSettlementId: string;
  settlementId: string;
  companyId: string;
  year: number;
  week: number;
  trucks: number[];
  driver: string;
  settlementDate: Date;
  debits: Debit[];
  credits: Credit[];
  fuel: number;
  occupationalInsurance: number;
  ignoreComchek: boolean;
}

export interface Debit {
  date: Date;
  driver: string;
  truckId: number;
  description: string;
  amount: number;
  totalDeductions: number;
}

export interface Credit {
  proNumber: string;
  deliveryDate: Date;
  driver: string;
  truckId: number;
  ratePerMile: number;
  miles: number;
  extendedAmount: number;
  detention: number;
  deadHead: number;
  stopOff: number;
  canada: number;
  layover: number;
  handLoad: number;
  tolls: number;
  bonus: number;
  empty: number;
  totalPaid: number;
  creditDate: Date;
  creditDescriptions: string;
  ratePerMileDescription: string;
  creditAmount: number;
  advanceDate: Date;
  advanceDescription: string;
  advanceNumber: string;
  advanceAmount: number;
  other: number;
}