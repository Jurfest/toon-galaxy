import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Card } from '../../../models/card';
import { CardListComponent } from './card-list.component';

const characterListMock: Card[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    species: 'Human',
    image: 'images/example_1',
    type: 'Type 1',
    isFavorite: true,
  },
  {
    id: 2,
    name: 'Morty Smith',
    species: 'Humanoid',
    image: 'images/example_2',
    type: 'Type 2',
    isFavorite: false,
  },
];

describe('CardListComponent', () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardListComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CardListComponent);
    fixture.componentRef.setInput('cardList', characterListMock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit favCardUpdate when onToggleFavCard method is called', () => {
    const favCardUpdateSpy = jest.spyOn(component.favCardUpdate, 'emit');
    component.onToggleFavCard(characterListMock[1]);

    fixture.detectChanges();

    expect(favCardUpdateSpy).toHaveBeenCalledWith(characterListMock[1]);
  });
});
