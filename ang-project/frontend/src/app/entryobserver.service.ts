import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EntryObserverService {
  bank: NodeListOf<HTMLInputElement> | never[] = [];
  save(content: HTMLElement, type: string = "input[type='checkbox']") {
    this.bank = content.querySelectorAll(type);
  }
  load() {
    return this.bank;
  }
}
