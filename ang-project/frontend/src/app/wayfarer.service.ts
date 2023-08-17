import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WayfarerService {
  private dataBank: any[] = [];
  private dataSubject = new BehaviorSubject<any[]>(this.dataBank);
  addData(data: any) {
    this.dataBank.push(data);
    this.dataSubject.next(this.dataBank);
  }
  getData() {
    return this.dataSubject.asObservable();
  }
}
