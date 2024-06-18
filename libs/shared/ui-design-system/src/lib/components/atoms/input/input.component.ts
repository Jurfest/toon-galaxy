import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  input,
} from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingFacade } from '@toon-galaxy/shared/util-common';

export enum InputType {
  button = 'button',
  checkbox = 'checkbox',
  color = 'color',
  date = 'date',
  datetimelocal = 'datetime-local',
  email = 'email',
  file = 'file',
  hidden = 'hidden',
  image = 'image',
  month = 'month',
  number = 'number',
  password = 'password',
  radio = 'radio',
  range = 'range',
  reset = 'reset',
  search = 'search',
  submit = 'submit',
  tel = 'tel',
  text = 'text',
  time = 'time',
  url = 'url',
  week = 'week',
}

type OnChange = (value: string) => void;
type OnTouch = () => void;

@Component({
  selector: 'design-system-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  inputType = input<InputType>(InputType.text);
  placeholder = input<string>('');
  label = input<string>('Pesquisar');
  // value = input<string>('');
  // id = input<string>();

  private loadingFacade = inject(LoadingFacade);
  isLoading$ = this.loadingFacade.isLoading$;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: OnChange = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouch: OnTouch = () => {};

  set value(val: string) {
    // this.internalControl.setValue(val, { emitEvent: false });
    this.onChange(val);
    this.onTouch();
  }

  writeValue(obj: string): void {
    this.value = obj;
  }

  registerOnChange(fn: OnChange): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouch): void {
    this.onTouch = fn;
  }

  // input = viewChild<ElementRef>('input');

  // get text(): string {
  //   return this.input().nativeElement.value;
  // }
}
