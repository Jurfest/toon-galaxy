import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card } from '../../../models/card';
import { CardComponent } from './card.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const cardMock: Card = {
  id: 1,
  name: 'Card Name',
  species: 'Card Species',
  image: 'https://example.com/image.jpg',
  isFavorite: true,
  type: 'Interesting',
};

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let emitSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('card', cardMock);
    emitSpy = jest.spyOn(component.favCardUpdate, 'emit');
    fixture.detectChanges();
  });

  afterEach(() => {
    emitSpy.mockClear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit favCardUpdate when onToggleFavCard is called', () => {
    component.onToggleFavCard(cardMock);

    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalledWith(cardMock);
  });
});
