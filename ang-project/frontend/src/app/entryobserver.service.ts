import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EntryObserverService {
  private dataBank: any[] = [];
  private dataSubject: BehaviorSubject<any[]> = new BehaviorSubject(
    this.dataBank
  );
  addData(data: string[]) {
    this.dataBank = data;
    this.dataSubject.next(this.dataBank);
  }
  getData() {
    return this.dataSubject.asObservable();
  }
}
