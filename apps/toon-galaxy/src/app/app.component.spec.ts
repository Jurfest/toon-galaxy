import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { CharacterFacade } from '@toon-galaxy/toon-galaxy/domain';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let characterFacadeMock: jest.Mocked<CharacterFacade>;

  beforeEach(async () => {
    characterFacadeMock = {
      totalFavoriteCharacters$: of(5),
    } as jest.Mocked<CharacterFacade>;

    await TestBed.configureTestingModule({
      imports: [AppComponent, NoopAnimationsModule],
      providers: [
        provideRouter([]),
        { provide: CharacterFacade, useValue: characterFacadeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the navbar component', () => {
    fixture.detectChanges();
    const navbarElement = fixture.debugElement.query(
      By.css('design-system-navbar'),
    ).nativeElement;
    expect(navbarElement).toBeTruthy();
  });

  it('should have totalFavoriteCharacters$ observable from CharacterFacade', (done) => {
    component.totalFavoriteCharacters$.subscribe((value) => {
      expect(value).toEqual(5);
      done();
    });
  });
});
