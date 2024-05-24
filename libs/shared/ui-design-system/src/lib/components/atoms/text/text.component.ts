import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'design-system-text',
  standalone: true,
  imports: [],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent {}
