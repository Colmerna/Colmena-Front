import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [type]="type" 
      class="ui-button" 
      [ngClass]="{'full-width': fullWidth, 'disabled': disabled}"
      [disabled]="disabled"
      (click)="onClick.emit($event)">
      <span *ngIf="icon" class="material-icons icon">{{ icon }}</span>
      {{ label }}
    </button>
  `,
  styles: [`
    .ui-button {
      background-color: var(--primary-yellow);
      color: var(--text-dark);
      border: none;
      padding: 10px 20px;
      border-radius: 20px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: opacity 0.2s, background-color 0.2s;
    }
    .ui-button:hover:not(.disabled) {
      opacity: 0.9;
    }
    .ui-button.disabled {
      background-color: #ccc;
      color: #666;
      cursor: not-allowed;
      opacity: 0.7;
    }
    .full-width {
      width: 100%;
    }
    .icon {
      font-size: 1.2em;
    }
  `]
})
export class UiButtonComponent {
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() fullWidth: boolean = false;
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter<Event>();
}
