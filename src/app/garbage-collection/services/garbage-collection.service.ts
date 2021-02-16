import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BinInfo } from 'src/app/shared/models/bin-info.model';
import { Zone } from 'src/app/shared/models/zone.model';

@Injectable({
  providedIn: 'root'
})
export class GarbageCollectionService {

  constructor(private http: HttpClient) { }

  private url = "https://laravel-smartcity.azurewebsites.net/api";
  //private url = "http://localhost:8000/api";

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
    return this.http.get<BinInfo>(this.url + '/bininfo/' + id);
  }

  loadNewBins(): Observable<BinInfo[]> {
    return this.http.post<BinInfo[]>(this.url + '/bininfo/update', null);
  }

  loadLatestBinCoords(id: number): Observable<BinInfo> {
    return this.http.post<BinInfo>(this.url + '/bininfo/updatebin', null);
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
    return this.http.get<Zone>(this.url + '/zones/' + zoneID);
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
}
