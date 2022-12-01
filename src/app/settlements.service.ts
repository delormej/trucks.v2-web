import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError, pipe, map, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as Types from './settlements.service.types';

@Injectable({
  providedIn: 'root'
})
export class SettlementsService {

  public static readonly baseUrl: string = environment.apiUrl; 

  constructor(private http: HttpClient) { }

  getSettlementSummaries(): Observable<Types.SettlementSummary[]> {
    return this.http.get<Types.SettlementSummary[]>(SettlementsService.baseUrl + "/settlements/summaries");
  }  

  getSettlementSummary(companyId: string, settlementId: string): Observable<Types.SettlementSummary> {
    return this.http.get<Types.SettlementSummary>(SettlementsService.baseUrl + 
        "/settlements/summary/" + companyId + "/" + settlementId);
  }  

  getSettlementWeeks(): Observable<Types.Week[]> {
    return this.http.get<Types.Week[]>(SettlementsService.baseUrl + "/settlements/weeks");
  }

  getDriverSettlements(companyId: string, settlementId: string, 
      forceRecreate: boolean = false): Observable<Types.DriverSettlement[]> {
    return this.http.get<Types.DriverSettlement[]>(
      SettlementsService.baseUrl + "/driversettlements/" + companyId + "/" + settlementId,
      { params: new HttpParams().set('forceRecreate', forceRecreate)});
  }    

  getDriverSettlement(
      companyId: string, 
      driver: string, 
      force: boolean = false,
      settlementId?: string, 
      year?: number,
      week?: number  
    ): Observable<Types.DriverSettlement> {
    
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

    return this.http.get<Types.DriverSettlement>(url, { params: params });
  }

  getFuel(year: number, week?: number, driverPromptId?: number) : Observable<Types.FuelCharge[]> {
    var params: HttpParams = new HttpParams();
    if (year != null)
      params = params.set('year', year);
    if (week != null)
      params = params.set('week', week);
    if (driverPromptId != null)
      params = params.set('driverPromptId', driverPromptId);

    return this.http.get<Types.FuelCharge[]>(SettlementsService.baseUrl + "/fuel",
      { params: params });
  }

  saveDriverSettlementNotes(driverSettlementId: string, notes: string) {
    console.log('saving notes for driverSettlement:', driverSettlementId);
    return this.http.post<Types.Driver>(SettlementsService.baseUrl + "/driversettlements/notes", 
      { driverSettlementId: driverSettlementId, notes: notes } );
  }

  getDriver(name: string) : Observable<Types.Driver> {
    return this.http.get<Types.Driver>(SettlementsService.baseUrl + "/driver?name=" + name);
  }

  getAllDrivers() : Observable<DriverAndTeammate[]> {
    // replace the pipe call with setTeammate(...)?
    return this.http.get<DriverAndTeammate[]>(SettlementsService.baseUrl + "/driver/list")
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

  getDriverByPin(driverPromptId: number) : Observable<Types.DriverSummary> {
    return this.http.get<Types.DriverSummary>(
        SettlementsService.baseUrl + "/driver/pin/" + driverPromptId );
  }

  // setTeammate(drivers: Observable<Driver[]>) : Observable<Driver[]> {
  // }

  getTeammateSuggestion(driver: string) : Observable<Types.Driver[]> {
    return this.http.get<Types.Driver[]>(SettlementsService.baseUrl + "/driver/suggest-teammate",
      { params: new HttpParams().set('driver', driver) } );
  }

  getDriverPin(driver: string) : Observable<number> {
    return this.http.get<number>(SettlementsService.baseUrl + "/driver/pin",
      { params: new HttpParams().set('driver', driver) } );
  }

  saveDriver(driver: Types.Driver, teammateChanged: boolean) {
    return this.http.put<Types.Driver>(SettlementsService.baseUrl + "/driver", driver,
      { params: new HttpParams().set('updateTeammate', teammateChanged) });
  }

  saveManualEntry(entry: Types.ManualEntryRequest) {
    return this.http.post<Types.DriverSettlement>(
      SettlementsService.baseUrl + "/driversettlements/manual", entry);
  }

  deleteDriverSettlement(driverSettlementId: string) {
    return this.http.delete(
      SettlementsService.baseUrl + "/driversettlements", { params: new HttpParams()
          .set('driverSettlementId', driverSettlementId) });
  } 

  deleteManualEntry(driverSettlementId: string, itemId: string) {
    return this.http.delete<Types.DriverSettlement>(
      SettlementsService.baseUrl + "/driversettlements/manual", { params: new HttpParams()
          .set('driverSettlementId', driverSettlementId)
          .set('itemId', itemId) });
  }  

  changeTeammate(companyId: string, driverSettlementId: string, 
      teammate: Teammate): Observable<Types.DriverSettlement> {
    var body = {
      companyId: companyId,
      driverSettlementId: driverSettlementId, 
      updatedTeammateDriverId: teammate.driverId
     };

    return this.http.post<Types.DriverSettlement>(
      SettlementsService.baseUrl + "/driversettlements/change-teammate", body);
  }

  createDriverSplit(driver: Types.Driver): Observable<Types.Driver> {
    return this.http.post<Types.Driver>(
      SettlementsService.baseUrl + "/driver/split", driver);
  }

  createDriverSettlementSplit(
      driverSettlementId: string, 
      teamleaderDriverId: string, 
      teammateDriverId?: string): Observable<Types.DriverSettlement[]> {

    var body = {
      driverSettlementId: driverSettlementId,
      teamleaderDriverId: teamleaderDriverId, 
      teammateDriverId: teammateDriverId
    };

    return this.http.post<Types.DriverSettlement[]>(
      SettlementsService.baseUrl + "/driversettlements/split", body);
  }

  unsplitDriverSettlement(driverSettlementId: string): Observable<Types.DriverSettlement[]> {
    return this.http.post<Types.DriverSettlement[]>(
      SettlementsService.baseUrl + "/driversettlements/unsplit", null,
        { params: new HttpParams()
          .set('driverSettlementId', driverSettlementId)
        });
  }

  splitItem(driverSettlementId: string, itemId: string) {
    return this.http.post<Types.DriverSettlement[]>(
      SettlementsService.baseUrl + "/driversettlements/split-item", null,
        { params: new HttpParams()
          .set('driverSettlementId', driverSettlementId)
          .set('itemId', itemId)
        });
  }

  unsplitItem(driverSettlementId: string, itemId: string) {
    return this.http.post<Types.DriverSettlement[]>(
      SettlementsService.baseUrl + "/driversettlements/unsplit-item", null,
        { params: new HttpParams()
          .set('driverSettlementId', driverSettlementId)
          .set('itemId', itemId)
        });    
  }

  getVersion() : Observable<Types.VersionInfo> {
    return this.http.get<Types.VersionInfo>(SettlementsService.baseUrl + "/version")
  };

  saveFuelCsv(formData: FormData) : Observable<Types.FuelCharge[]> {
    return this.http.post<Types.FuelCharge[]>(SettlementsService.baseUrl + "/fuel/upload",
      formData, {responseType: 'json'});
  }

  getFuelSummary() : Observable<Types.FuelSummary[]> {
    return this.http.get<Types.FuelSummary[]>(SettlementsService.baseUrl + "/fuel/fuel-summary")
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

export interface DriverAndTeammate extends Types.Driver {
  teammateName?: string;
}

export interface Teammate {
  driverId?: string;
  name?: string;
  teamLeaderDriverId?: string;
  isSplit: boolean;
  splitChanged: boolean;
}
