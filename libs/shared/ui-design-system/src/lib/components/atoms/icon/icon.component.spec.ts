import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent, FontAwesomeModule],
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    fixture.componentRef.setInput('iconName', 'heart');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the icon state after click for clickable icons', () => {
    fixture.componentRef.setInput('isClickable', true);
    fixture.componentRef.setInput('initialIconPrefix', 'fas');

    const initialIconState = component.faIcon;

    component.toggleIconState();
    expect(component.faIcon).not.toBe(initialIconState);
  });
});
