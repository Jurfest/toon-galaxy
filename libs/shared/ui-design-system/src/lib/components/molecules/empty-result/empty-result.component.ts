import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'design-system-empty-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-result.component.html',
  styleUrl: './empty-result.component.scss',
})
export class EmptyResultComponent {
  headingContent = input<string>('Nada foi encontrado');
  paragraphContent = input<string>('Tente realizar uma nova busca.');
}
