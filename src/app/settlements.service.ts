import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettlementsService {

  public static readonly baseUrl: string = environment.apiUrl; 

  constructor(private http: HttpClient) { }

  getSettlementSummaries(): Observable<Summary[]> {
    return this.http.get<Summary[]>(SettlementsService.baseUrl + "/settlements/summaries");
  }  

  getDriverSettlements(companyId: string, settlementId: string): Observable<DriverSettlement[]> {
    return this.http.get<DriverSettlement[]>(SettlementsService.baseUrl + "/driversettlements/" + companyId + "/" + settlementId);
  }    

  getDriverSettlement(companyId: string, 
        driver: string, 
        force: boolean = false,
        settlementId?: string, 
        year?: number,
        week?: number  
      ): Observable<DriverSettlement> {
    
    var url = SettlementsService.baseUrl;
    
    if (settlementId != null) {
      url += "/driversettlements?driverName=" + driver + "&companyId=" + companyId + 
        "&settlementId=" + settlementId + "&forceRecreate=" + force;
    }
    else {
      url += "/driversettlements/byweek?driverName=" + driver + "&companyId=" + companyId + 
        "&year=" + year + "&week=" + week;

    }
    
    return this.http.get<DriverSettlement>(url);
  }

  saveDriverSettlement(driverSettlement: DriverSettlement) {
    console.log('saving driverSettlement:', driverSettlement);
    return this.http.post<Driver>(SettlementsService.baseUrl + "/driversettlements", driverSettlement);
  }

  getDriver(name: string) {
    return this.http.get<Driver>(SettlementsService.baseUrl + "/driver?name=" + name);
  }

  saveDriver(driver: Driver) {
    return this.http.post<Driver>(SettlementsService.baseUrl + "/driver", driver);
  }

  saveManualEntry(entry: ManualEntry) {
    return this.http.post<DriverSettlement>(
      SettlementsService.baseUrl + "/driversettlements/manual", entry);
  }
}

export class ManualEntry {
  driverSettlementId?: string; 
  description?: string;
  creditAmount?: number; 
  deductionAmount?: number  
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
  notes: string;
}

export interface Deduction {
  id: string;
  date: Date;
  driver: string;
  truckId: number;
  description: string;
  amount: number;
  totalDeductions: number;
  manualDeduction: number;
}

export interface Credit {
  id: string;
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
  base: number;
  manualCredit: number;
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
  driverPromptId: number;
  socialSecurityNumber: string;
  ignoreComchek: boolean;
  created: Date;
}