import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingComponent } from './heading.component';

describe('HeadingComponent', () => {
  let component: HeadingComponent;
  let fixture: ComponentFixture<HeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct text', () => {
    fixture.componentRef.setInput('label', 'Hello!');

    fixture.detectChanges();
    const headingElement = fixture.nativeElement.querySelector('h1');
    expect(headingElement.textContent).toContain('Hello!');
  });

  it('should apply the correct CSS class based on the size', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const headingElement = fixture.nativeElement.querySelector('h1');
    expect(headingElement.classList).toContain('text-6xl');
  });
});
