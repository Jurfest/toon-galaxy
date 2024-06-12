import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'design-system-heading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heading.component.html',
  styleUrl: './heading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadingComponent {
  label = input<string>();
  font = input<'poppins' | 'creepster'>('poppins');
  withBorder = input<boolean>(false);
  size = input<'sm' | 'md' | 'lg'>('md');
  color = input<string>('--green-300');
}
