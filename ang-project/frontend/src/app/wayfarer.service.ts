import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WayfarerService {
  private dataBank: any[] = [];
  private dataSubject = new BehaviorSubject<any>(this.dataBank);
  private counter: number = 0;
  addData(data: any) {
    this.dataBank.push(data);
    this.counter++;
    this.dataSubject.next(data);
    if (this.dataBank.length > 5) {
      const preparation = JSON.stringify(this.dataBank);
      localStorage.setItem('dataBank', preparation);
      console.log('Saved...');
      this.purgeData();
    }
  }
  getData() {
    return this.dataSubject.asObservable();
  }
  accessDataSet() {
    return this.dataBank;
  }
  purgeData() {
    this.dataBank = [];
  }
  accessDataBank(): string | never[] | any[] {
    const properBank = localStorage.getItem('dataBank');
    return properBank ? JSON.parse(properBank) : [];
  }
  estimateAvailibleMemory() {
    try {
      const storageKey = 'MemTest';
      let data = '';
      for (let i = 0; i < 1024; i++) {
        data += 'x';
      }
      const initialMemory = JSON.stringify(localStorage).length;
      try {
        while (true) {
          localStorage.setItem(storageKey, data);
          data += data;
        }
      } catch (error) {
        const finalMemory = JSON.stringify(localStorage).length;
        const memoryCapacity = finalMemory - initialMemory;
        console.log(
          `Total localStorage memory: ${
            memoryCapacity * 1e-6
          } MB | ${memoryCapacity} bytes`
        );
        localStorage.removeItem(storageKey);
      }
    } catch (error) {
      console.log(
        'There was an error trying to calculate localStorage memory: ',
        error
      );
    }
  }
}
