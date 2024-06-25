import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // TODO: Zoneless
    // TestBed.configureTestingModule({
    //   providers: [provideExperimentalZonelessChangeDetection()],
    // });
    //
    // const fixture = TestBed.createComponent(ButtonComponent);
    // await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call method sendClickEvent and emit void event when clicked', () => {
    const clickSpy = jest.spyOn(component.buttonClickEvent, 'emit');
    const sendClickEventMethodSpy = jest.spyOn(component, 'sendClickEvent');

    const buttonElement = fixture.debugElement.query(
      By.css('button'),
    ).nativeElement;
    buttonElement.click();
    expect(clickSpy).toHaveBeenCalled();
    expect(sendClickEventMethodSpy).toHaveBeenCalled();
  });
});
