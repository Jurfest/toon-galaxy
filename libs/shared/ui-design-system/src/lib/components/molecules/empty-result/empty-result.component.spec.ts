import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyResultComponent } from './empty-result.component';
import { By } from '@angular/platform-browser';

describe('EmptyResultComponent', () => {
  let component: EmptyResultComponent;
  let fixture: ComponentFixture<EmptyResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyResultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the empty result heading', () => {
    const headingElement = fixture.debugElement.query(
      By.css('h2'),
    ).nativeElement;
    expect(headingElement.textContent).toContain('Nada foi encontrado');
  });

  it('should display the empty result paragraph', () => {
    const paragraphElement = fixture.debugElement.query(
      By.css('p'),
    ).nativeElement;
    expect(paragraphElement.textContent).toContain(
      'Tente realizar uma nova busca.',
    );
  });
});
