import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError, pipe, map, Observer } from 'rxjs';
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

  getSettlementSummary(companyId: string, settlementId: string): Observable<SettlementSummary> {
    return this.http.get<SettlementSummary>(SettlementsService.baseUrl + 
        "/settlements/summary/" + companyId + "/" + settlementId);
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
    // replace the pipe call with setTeammate(...)?
    return this.http.get<Driver[]>(SettlementsService.baseUrl + "/driver/list")
      .pipe(map((drivers) => { 
        drivers.forEach((driver, index) => {
          if (driver.teammateDriverId != null && driver.teammateDriverId != '') {
            let teammate = drivers.find(d => d.id === driver.teammateDriverId);
            if (teammate != null)
              driver.teammateName = teammate.name;
          }
        });
        
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

  saveDriver(driver: Driver, teammateChanged: boolean) {
    return this.http.put<Driver>(SettlementsService.baseUrl + "/driver", driver,
      { params: new HttpParams().set('updateTeammate', teammateChanged) });
  }

  saveManualEntry(entry: ManualEntry) {
    return this.http.post<DriverSettlement>(
      SettlementsService.baseUrl + "/driversettlements/manual", entry);
  }

  deleteDriverSettlement(driverSettlementId: string) {
    return this.http.delete(
      SettlementsService.baseUrl + "/driversettlements", { params: new HttpParams()
          .set('driverSettlementId', driverSettlementId) });
  } 

  deleteManualEntry(driverSettlementId: string, itemId: string) {
    return this.http.delete<DriverSettlement>(
      SettlementsService.baseUrl + "/driversettlements/manual", { params: new HttpParams()
          .set('driverSettlementId', driverSettlementId)
          .set('itemId', itemId) });
  }  

  changeTeammate(companyId: string, driverSettlementId: string, teammate: Teammate): Observable<DriverSettlement> {
    var body = {
      companyId: companyId,
      driverSettlementId: driverSettlementId, 
      updatedTeammateDriverId: teammate.driverId
     };

    return this.http.post<DriverSettlement>(
      SettlementsService.baseUrl + "/driversettlements/change-teammate", body);
  }

  createDriverSplit(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(
      SettlementsService.baseUrl + "/driver/split", driver);
  }

  createDriverSettlementSplit(
      driverSettlementId: string, 
      teamleaderDriverId: string, 
      teammateDriverId?: string): Observable<DriverSettlement[]> {

    var body = {
      driverSettlementId: driverSettlementId,
      teamleaderDriverId: teamleaderDriverId, 
      teammateDriverId: teammateDriverId
    };

    return this.http.post<DriverSettlement[]>(
      SettlementsService.baseUrl + "/driversettlements/split", body);
  }

  unsplitDriverSettlement(driverSettlementId: string): Observable<DriverSettlement[]> {
    return this.http.post<DriverSettlement[]>(
      SettlementsService.baseUrl + "/driversettlements/unsplit", null,
        { params: new HttpParams()
          .set('driverSettlementId', driverSettlementId)
        });
  }

  splitItem(driverSettlementId: string, itemId: string) {
    return this.http.post<DriverSettlement[]>(
      SettlementsService.baseUrl + "/driversettlements/split-item", null,
        { params: new HttpParams()
          .set('driverSettlementId', driverSettlementId)
          .set('itemId', itemId)
        });
  }

  unsplitItem(driverSettlementId: string, itemId: string) {
    return this.http.post<DriverSettlement[]>(
      SettlementsService.baseUrl + "/driversettlements/unsplit-item", null,
        { params: new HttpParams()
          .set('driverSettlementId', driverSettlementId)
          .set('itemId', itemId)
        });    
  }

  getVersion() : Observable<VerisonInfo> {
    return this.http.get<VerisonInfo>(SettlementsService.baseUrl + "/version")
  };

  saveFuelCsv(formData: FormData) : Observable<FuelCharge[]> {
    return this.http.post<FuelCharge[]>(SettlementsService.baseUrl + "/fuel/upload",
      formData, {responseType: 'json'});
  }

  getFuelSummary() : Observable<FuelSummary[]> {
    return this.http.get<FuelSummary[]>(SettlementsService.baseUrl + "/fuel/fuel-summary")
  }

  private _deductionCategories!: string[];

  // This function runs when subscribe() is called
  // deductionCategoriesSubscriber(observer: Observer<string[]>) {
  //   observer.next(this._deductionCategories);
  //   observer.complete();

  //   // unsubscribe function doesn't need to do anything in this
  //   // because values are delivered synchronously
  //   return {unsubscribe() {}};
  // }

  getDeductionCategories() : Observable<string[]> {
    let observable: Observable<string[]>;

    if (this._deductionCategories == null) {
      observable = this.http.get<string[]>(SettlementsService.baseUrl + "/settlements/deduction-categories");
      observable.subscribe({
          next: (result) => {
            this._deductionCategories = [];
            result.forEach(c => this._deductionCategories.push(c));
          }
      });
    }
    else { 
      // observable = new Observable(this.deductionCategoriesSubscriber);     
      observable = new Observable(o => o.next(this._deductionCategories));
    }

    return observable;
  }
}

export interface ManualEntry {
  itemId?: string;
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
  week: Week;
}

export interface Week {
  startDate: Date;
  endDate: Date;
  payDate: Date;
  weekNumber: number;
  year: number;
}

export interface DriverSettlement {
  driverSettlementId: string;
  settlementId: string;
  companyId: string;
  year: number;
  week: number;
  trucks: number[];
  driver: string;
  driverId: string;
  teammateDriver: string;
  teammateDriverId: string;
  isSplit: boolean;
  isTeamLeader: boolean;
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
  manualCreditsTotal: number;
  deductionsTotal: number;
  milesTotal: number;
  income: number;
  previousNegativeBalance: number;
  paidMilesYtd: number;
  currentYtdIncome: number;
  securityDeposit: number;
  qualcomm: number;
  notes: string;
  generatorVersion: string;
  deleted: boolean;
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
  isSplit: boolean;
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
  isSplit: boolean;
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
  driverPercent: DriverPercent;
  ratePerMile: number;
  driverPromptId: number;
  socialSecurityNumber: string;
  ignoreComchek: boolean;
  created: Date;
  isTeamLeader: boolean;
  teammateDriverId?: string;
  teammateName?: string;
  isSplit: boolean;
  paymentHistory: Payment[];
}

export interface DriverPercent {
  base: number;
  empty: number;
  deadhead: number;
  fuelSurcharge: number;
  accessorial: number;
  tolls: number;
}

export interface Payment { 
  weekNumber: number;
  settlementId: string;
  settlementDate: Date;
  companyId: string;
  amount: number;
  incomeYtd: number;
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

export interface FuelSummary {
  week: {
    weekNumber: number,
    year: number
  };
  totalGallons: number;
  totalCost: number;
}

export interface Teammate {
  driverId?: string;
  name?: string;
  teamLeaderDriverId?: string;
  isSplit: boolean;
  splitChanged: boolean;
}

export interface VerisonInfo
{
    projectId: string;
    version: string;
    computeInstanceId: string;
    serviceRevision: string;
}