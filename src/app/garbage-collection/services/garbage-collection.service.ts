import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BinInfo } from 'src/app/shared/models/bin-info.model';
import { Zone } from 'src/app/shared/models/zone.model';

@Injectable({
  providedIn: 'root'
})
export class GarbageCollectionService {

  constructor(private http: HttpClient) { }

  private url = "https://laravel-smartcity.azurewebsites.net/api";

  getBinInfoList(): Observable<BinInfo[]> {
    return this.http.get<BinInfo[]>(this.url + '/bininfo');
  }

  getBinInfoListByZone(id: number): Observable<BinInfo[]> {
    return this.http.get<BinInfo[]>(this.url + '/bininfo/byzone/' + id);
  }

  getBinInfoListNozone(): Observable<BinInfo[]> {
    return this.http.get<BinInfo[]>(this.url + '/bininfo/nozone');
  }

  getBinInfo(id: number): Observable<BinInfo> {
    return this.http.get<BinInfo>(this.url + '/bininfo/get/' + id);
  }

  loadNewBins(): Observable<BinInfo[]> {
    return this.http.post<BinInfo[]>(this.url + '/bininfo/update', null);
  }

  loadLatestBinCoords(id: number): Observable<BinInfo> {
    return this.http.put<BinInfo>(this.url + '/bininfo/update/coords/' + id, null);
  }

  updateBinInfo(binInfo: BinInfo): Observable<BinInfo> {
    return this.http.put<BinInfo>(this.url + '/bininfo/' + binInfo.id, binInfo);
  }

  updateZoneBins(id: number, bin_id_list: number[]): Observable<BinInfo> {
    return this.http.put<BinInfo>(this.url + '/zones/bins/' + id, { 'bin_id_list': bin_id_list });
  }

  deleteBinInfo(id: number) {
    return this.http.delete<BinInfo>(this.url + '/bininfo/' + id);
  }

  getZones(): Observable<Zone[]> {
    return this.http.get<Zone[]>(this.url + '/zones');
  }

  getZone(zoneID: number): Observable<Zone> {
    return this.http.get<Zone>(this.url + '/zones/get/' + zoneID);
  }

  postZone(zone: Zone): Observable<Zone> {
    return this.http.post<Zone>(this.url + '/zones', zone);
  }

  updateZone(zone: Zone): Observable<Zone> {
    return this.http.put<Zone>(this.url + '/zones/' + zone.id, zone);
  }

  deleteZone(id: number) {
    return this.http.delete<Zone>(this.url + '/zones/' + id);
  }

  getGoogleAPIKey(): Observable<boolean> {
    return this.http.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyDfT7wBNXL5JBXhA7LI6TwIPKQqG1JQ29Q', 'callback')
    .pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }
}
