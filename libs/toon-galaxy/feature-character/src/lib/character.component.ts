import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CharacterFacade } from '@toon-galaxy/toon-galaxy/domain';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'toon-galaxy-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {
  private characterFacade = inject(CharacterFacade);

  characterList$ = this.characterFacade.characterList$;

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.characterFacade.load();
  }
}

export default CharacterComponent;
