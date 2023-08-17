import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LSObserverService {
  private LSChanges = new Subject<string>();
  notify(key: string) {
    this.LSChanges.next(key);
  }
  getObservable(): Observable<string> {
    return this.LSChanges.asObservable();
  }
  constructor() {}
}
