import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListComponent } from './card-list.component';

// characterList = [
//   {
//     name: 'Rick Sanchez',
//     species: 'Human',
//     image:
//       'assets/images/b4d6eaa1b26cc94aac79d3d234cd9d18a1cbe6b5184ec5346029ce92c300267a?apiKey=a95f3f5d0c8f491eb3bd2f0feef189ba&',
//     info: null,
//     id: 1,
//   },
//   {
//     name: 'Morty Smith',
//     species: 'Human',
//     image:
//       'assets/images/737eacb0f0af70944b275d64f8f6e9e5280458e8e719e648a8effe8ccd8921f1?apiKey=a95f3f5d0c8f491eb3bd2f0feef189ba&',
//     info: null,
//     id: 2,
//   },
// ];

describe('CardListComponent', () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
