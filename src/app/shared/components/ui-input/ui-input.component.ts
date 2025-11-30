import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-ui-input',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UiInputComponent),
            multi: true
        }
    ],
    template: `
    <div class="input-container">
      <label *ngIf="label" class="input-label">{{ label }}</label>
      <div class="input-wrapper">
        <span *ngIf="icon" class="input-icon material-icons">{{ icon }}</span>
        <input
          [type]="type"
          [placeholder]="placeholder"
          [value]="value"
          (input)="onInput($event)"
          (blur)="onTouched()"
          class="ui-input"
        />
      </div>
    </div>
  `,
    styles: [`
    .input-container {
      margin-bottom: 15px;
    }
    .input-label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
      color: var(--primary-blue);
    }
    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    .input-icon {
      position: absolute;
      left: 15px;
      color: var(--text-dark);
      opacity: 0.7;
    }
    .ui-input {
      width: 100%;
      padding: 12px 15px 12px 45px; /* Space for icon */
      border: 1px solid var(--primary-blue);
      border-radius: 25px; /* Rounded corners like image */
      background-color: var(--primary-yellow); /* Yellow background like image */
      color: var(--text-dark);
      font-size: 1rem;
      outline: none;
    }
    .ui-input::placeholder {
      color: var(--text-dark);
      opacity: 0.6;
    }
    .ui-input:focus {
      border-width: 2px;
    }
  `]
})
export class UiInputComponent implements ControlValueAccessor {
    @Input() label: string = '';
    @Input() placeholder: string = '';
    @Input() type: string = 'text';
    @Input() icon: string = '';

    value: string = '';
    onChange: any = () => { };
    onTouched: any = () => { };

    onInput(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        this.value = value;
        this.onChange(value);
    }

    writeValue(value: any): void {
        this.value = value || '';
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}
