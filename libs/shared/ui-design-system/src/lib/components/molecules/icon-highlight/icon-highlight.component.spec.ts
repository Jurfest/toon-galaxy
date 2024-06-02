import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconHighlightComponent } from './icon-highlight.component';

describe('IconHighlightComponent', () => {
  let component: IconHighlightComponent;
  let fixture: ComponentFixture<IconHighlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconHighlightComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
