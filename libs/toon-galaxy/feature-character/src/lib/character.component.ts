import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterFacade } from '@toon-galaxy/toon-galaxy/domain';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'toon-galaxy-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {
  characterList$ = this.characterFacade.characterList$;

  constructor(private characterFacade: CharacterFacade) {}

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.characterFacade.load();
  }
}
