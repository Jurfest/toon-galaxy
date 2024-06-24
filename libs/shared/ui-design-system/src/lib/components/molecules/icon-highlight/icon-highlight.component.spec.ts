import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { IconHighlightComponent } from './icon-highlight.component';

describe('IconHighlightComponent', () => {
  let component: IconHighlightComponent;
  let fixture: ComponentFixture<IconHighlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconHighlightComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(IconHighlightComponent);
    fixture.componentRef.setInput('isSelected', false);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit toggleIconSeleted when onToggleFavCard method is called', () => {
    const toggleIconSeletedEmitSpy = jest.spyOn(
      component.toggleIconSeleted,
      'emit',
    );
    component.onToggleFavCard();

    fixture.detectChanges();

    expect(toggleIconSeletedEmitSpy).toHaveBeenCalled();
  });
});
