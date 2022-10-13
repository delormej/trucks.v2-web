import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError, pipe, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettlementsService {

  public static readonly baseUrl: string = environment.apiUrl; 

  constructor(private http: HttpClient) { }

  getSettlementSummaries(): Observable<SettlementSummary[]> {
    return this.http.get<SettlementSummary[]>(SettlementsService.baseUrl + "/settlements/summaries");
  }  

  getDriverSettlements(companyId: string, settlementId: string, forceRecreate: boolean = false): Observable<DriverSettlement[]> {
    return this.http.get<DriverSettlement[]>(SettlementsService.baseUrl + "/driversettlements/" + companyId + "/" + settlementId,
      { params: new HttpParams().set('forceRecreate', forceRecreate)});
  }    

  getDriverSettlement(
      companyId: string, 
      driver: string, 
      force: boolean = false,
      settlementId?: string, 
      year?: number,
      week?: number  
    ): Observable<DriverSettlement> {
    
    var url = SettlementsService.baseUrl;
    var params = new HttpParams()
        .append('companyId', companyId)
        .append('forceRecreate', force);
    
    if (settlementId != null) {
      console.log('settlementId', settlementId);
      url += "/driversettlements";
      params = params.append('settlementId', settlementId);
    }
    else if (year != null && week != null) {
      url += "/driversettlements/byweek";
      params = params.append('year', year)
        .append('week', week);
    }
    else {
      throwError(() => new Error("No settlement id, year or week provided."));
    }

    params = params.append('driverName', driver);

    return this.http.get<DriverSettlement>(url, { params: params });
  }

  getFuel(year: number, week: number, driverPromptId: number) : Observable<FuelCharge[]> {
    return this.http.get<FuelCharge[]>(SettlementsService.baseUrl + "/fuel",
      { params: new HttpParams()
        .set('year', year)
        .set('week', week)
        .set('driverPromptId', driverPromptId) 
      });
  }

  saveDriverSettlementNotes(driverSettlementId: string, notes: string) {
    console.log('saving notes for driverSettlement:', driverSettlementId);
    return this.http.post<Driver>(SettlementsService.baseUrl + "/driversettlements/notes", 
      { driverSettlementId: driverSettlementId, notes: notes } );
  }

  getDriver(name: string) {
    return this.http.get<Driver>(SettlementsService.baseUrl + "/driver?name=" + name);
  }

  getAllDrivers() : Observable<Driver[]> {
    return this.http.get<Driver[]>(SettlementsService.baseUrl + "/driver/list")
      .pipe(map((drivers) => { 
        drivers.forEach((driver, index) => {
          if (driver.teammateDriverId != null && driver.teammateDriverId != '') {
            let teammate = drivers.find(d => d.id === driver.teammateDriverId);
            if (teammate != null)
              driver.teammateName = teammate.name;
          }
        })
        console.log('drivers', drivers);
        return drivers; 
      }));
  }

  // setTeammate(drivers: Observable<Driver[]>) : Observable<Driver[]> {

  // }

  getTeammateSuggestion(driver: string) : Observable<Driver[]> {
    return this.http.get<Driver[]>(SettlementsService.baseUrl + "/driver/suggest-teammate",
      { params: new HttpParams().set('driver', driver) } );
  }

  getDriverPin(driver: string) : Observable<number> {
    return this.http.get<number>(SettlementsService.baseUrl + "/driver/pin",
      { params: new HttpParams().set('driver', driver) } );
  }

  saveDriver(driver: Driver) {
    return this.http.post<Driver>(SettlementsService.baseUrl + "/driver", driver);
  }

  saveManualEntry(entry: ManualEntry) {
    return this.http.post<DriverSettlement>(
      SettlementsService.baseUrl + "/driversettlements/manual", entry);
  }

  deleteManualEntry(driverSettlementId: string, itemId: string) {
    return this.http.delete<DriverSettlement>(
      SettlementsService.baseUrl + "/driversettlements/manual", { params: new HttpParams()
          .set('driverSettlementId', driverSettlementId)
          .set('itemId', itemId) });
  }  

  getVersion() : Observable<VerisonInfo> {
    return this.http.get<VerisonInfo>(SettlementsService.baseUrl + "/version")
  };

  saveFuelCsv(formData: FormData) : Observable<FuelCharge[]> {
    return this.http.post<FuelCharge[]>(SettlementsService.baseUrl + "/fuel/upload",
      formData, {responseType: 'json'});
  }
}

export class ManualEntry {
  driverSettlementId?: string; 
  description?: string;
  creditAmount?: number; 
  deductionAmount?: number  
}

export interface SettlementSummary {
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
  qualcomm: number;
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
  isTeamLeader: Boolean;
  teammateDriverId: string;
  teammateName?: string;
  paymentHistory: Payment[];
}

export interface Payment { 
  settlementId: string;
  settlementDate: Date;
  companyId: string;
  amount: number;
}

export interface FuelCharge {
  id:	string;
  weekNumber:	number;
  year:	number;
  driverPromptId: number;
  transactionDate:	string;
  transactionTime:	string;
  transactionTicketNumber:	string;
  netCost:	number;
  truckId:	string;
  product:	string;
  units:	number;
  unitCost:	number;
  merchantName:	string;
  merchantAddress:	string;
  merchantCity:	string;
  merchantState: string;
  merchantPostal:	string;
}

export interface VerisonInfo
{
    projectId: string;
    version: string;
    computeInstanceId: string;
    serviceRevision: string;
}