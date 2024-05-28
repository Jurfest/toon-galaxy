import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

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

export interface InputApi {
  inputType: InputType;
  placeholder?: string;
  value?: string;
}

@Component({
  selector: 'design-system-input',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  inputType = input<InputType>(InputType.text);
  placeholder = input<string>();
  value = input<string>();
  id = input<string>();

  input = viewChild<ElementRef>('input');

  get text(): string {
    return this.input().nativeElement.value;
  }
}
