import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'design-system-empty-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-result.component.html',
  styleUrl: './empty-result.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyResultComponent {
  headingContent = input<string>('Nada foi encontrado');
  paragraphContent = input<string>('Tente realizar uma nova busca.');
}
