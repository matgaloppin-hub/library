import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  notif = signal<{ success: boolean; message: string } | null>(null);

  show(success: boolean, message: string): void {
    this.notif.set({ success, message });
  }

  dismiss(): void {
    this.notif.set(null);
  }
}