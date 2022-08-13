import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettlementsService {

  public static readonly baseUrl: string = "http://localhost:5000"; // "https://trucks-api-tmco3bin6q-uc.a.run.app"; // 

  constructor(private http: HttpClient) { }

  getSettlementSummaries(): Observable<Summary[]> {
    return this.http.get<Summary[]>(SettlementsService.baseUrl + "/settlements/summaries");
  }  

  getDriverSettlements(companyId: string, settlementId: string): Observable<DriverSettlement[]> {
    return this.http.get<DriverSettlement[]>(SettlementsService.baseUrl + "/driversettlements/" + companyId + "/" + settlementId);
  }    

  getDriverSettlement(companyId: string, settlementId: string, driver: string): Observable<DriverSettlement> {
    return this.http.get<DriverSettlement>(SettlementsService.baseUrl + "/driversettlements?driverName=" + 
      driver + "&companyId=" + companyId + "&settlementId=" + settlementId);
  }
  
  getDriver(name: string) {
    return this.http.get<Driver>(SettlementsService.baseUrl + "/driver?name=" + name);
  }

  saveDriver(driver: Driver) {
    return this.http.post<Driver>(SettlementsService.baseUrl + "/driver", driver);
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
  deductions: Deduction[];
  credits: Credit[];
  fuel: number;
  occupationalInsurance: number;
  ignoreComchek: boolean;
  basePercent: number;
  accessorialPercent: number;
  ratePerMile: number;
  lastUpdated: Date;
  amountDue: number;
  baseTotal: number; 
  fscTotal: number;
  accessorialTotal: number; 
  creditsTotal: number;
  deductionsTotal: number;
  milesTotal: number;
  income: number;
  previousNegativeBalance: number;
  paidMilesYtd: number;
  previousYtdIncome: number;
  currentYtdIncome: number;
  securityDeposit: number;
  qualComm: number;
}

export interface Deduction {
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

export interface Driver {
  id: string;
  isAdmin: boolean;
  email: string;
  name: string;
  pictureUrl: string; 
  lastLogin: Date;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  basePercent: number;
  accessorialPercent: number;
  ratePerMile: number;
  socialSecurityNumber: string;
  ignoreComchek: boolean;
  created: Date;
}