import { Component, input, output, OnDestroy, signal, afterNextRender, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  templateUrl: './notification.html',
  styleUrl: './notification.css',
  encapsulation: ViewEncapsulation.None
})
export class NotificationComponent implements OnDestroy {
  success = input<boolean>(true);
  message = input<string>('');
  duration = input<number>(3500);

  closed = output<void>();
  visible = signal(false);

  private timer: any;

  constructor() {
    afterNextRender(() => {
      this.visible.set(true);
      this.timer = setTimeout(() => this.close(), this.duration());
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }

  close(): void {
    this.visible.set(false);
    setTimeout(() => this.closed.emit(), 200);
  }
}