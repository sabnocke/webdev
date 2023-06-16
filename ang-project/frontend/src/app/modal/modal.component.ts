import {
  Component,
  ElementRef,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { DialogService } from '../dialog-service.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
})
export class ModalComponent {
  constructor(
    private elRef: ElementRef,
    private dialogService: DialogService,
    private cdr: ChangeDetectorRef
  ) {}
  ngAfterViewInit(): void {
    const dialog = this.elRef.nativeElement.querySelector(
      '#diag'
    ) as HTMLDialogElement;
    this.cdr.detectChanges();
    this.dialogService.setDialog(dialog);
  }
  openDialog(): void {
    this.dialogService.openDialog();
  }
  closeDialog(): void {
    this.dialogService.closeDialog();
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeDialog();
    }
  }
}
