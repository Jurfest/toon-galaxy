import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabName } from '../../../models/tab-name';
import { ToggleButtonComponent } from './toggle-button.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ToggleButtonComponent', () => {
  let component: ToggleButtonComponent;
  let fixture: ComponentFixture<ToggleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleButtonComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('totalFavoriteCharacters', 3);
    fixture.componentRef.setInput('isHandset', false);
    fixture.componentRef.setInput('activeTab', TabName.Home);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit toggleActive when onToggle method is called', () => {
    const toggleActiveSpy = jest.spyOn(component.toggleActive, 'emit');
    component.onToggle(TabName.Favorites);

    fixture.detectChanges();

    expect(toggleActiveSpy).toHaveBeenCalledWith(TabName.Favorites);
  });
});
