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

  private url = "http://smartcityapi.seppealaerts.be/api";

  getBinInfoList(): Observable<BinInfo[]> {
    return this.http.get<BinInfo[]>(this.url + '/bininfo');
  }

  getBinInfo(id: number): Observable<BinInfo> {
    return this.http.get<BinInfo>(this.url + '/bininfo/' + id);
  }

  loadNewBins(): Observable<BinInfo[]> {
    return this.http.post<BinInfo[]>(this.url + '/bininfo/update', null);
  }

  updateBinInfo(binInfo: BinInfo): Observable<BinInfo> {
    return this.http.put<BinInfo>(this.url + '/bininfo/' + binInfo.id, binInfo);
  }

  deleteBinInfo(id: number) {
    return this.http.delete<BinInfo>(this.url + '/bininfo/' + id);
  }

  getZones(): Observable<Zone[]> {
    return this.http.get<Zone[]>(this.url + '/zones');
  }

  postZone(zone: Zone): Observable<Zone> {
    return this.http.post<Zone>(this.url + '/zones', zone);
  }

  deleteZone(id: number) {
    return this.http.delete<Zone>(this.url + '/zones/' + id);
  }
}
