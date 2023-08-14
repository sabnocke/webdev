import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InhibitorService {
  private dialog: HTMLDialogElement | null = null;
  public isOpen: boolean = false;

  setDialog(diag: HTMLDialogElement) {
    this.dialog = diag;
  }
  openDialog() {
    if (this.dialog) {
      this.dialog.showModal();
      this.isOpen = true;
      console.log('confirmed');
    }
  }
  closeDialog() {
    if (this.dialog) {
      this.dialog.close();
      this.isOpen = false;
    }
  }
}
