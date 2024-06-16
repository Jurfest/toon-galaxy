import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'design-system-button',
  standalone: true,
  imports: [MatButtonModule, IconComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  buttonClickEvent = output();

  sendClickEvent(): void {
    this.buttonClickEvent.emit();
  }
}
