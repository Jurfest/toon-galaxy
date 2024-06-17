import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@toon-galaxy/shared/ui-design-system';
import { CharacterFacade } from '@toon-galaxy/toon-galaxy/domain';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  selector: 'toon-galaxy-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private characterFacade = inject(CharacterFacade);

  readonly totalFavoriteCharacters$ =
    this.characterFacade.totalFavoriteCharacters$;
}
