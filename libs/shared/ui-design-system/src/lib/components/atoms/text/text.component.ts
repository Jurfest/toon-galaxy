import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'design-system-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent {
  label = input.required<string>();
  font = input<'poppins' | 'creepster'>('poppins');
  withBorder = input<boolean>(false);
  size = input<'sm' | 'md' | 'lg'>('md');
  color = input<string>('--green-300');
}
