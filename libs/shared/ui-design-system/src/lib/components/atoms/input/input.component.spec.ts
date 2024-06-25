import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingFacade } from '@toon-galaxy/shared/util-common';
import { of } from 'rxjs';

import { InputComponent, InputType } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent, NoopAnimationsModule],
      providers: [
        {
          provide: LoadingFacade,
          useValue: {
            isLoading$: of(false),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.inputType()).toEqual(InputType.text);
    expect(component.placeholder()).toEqual('');
    expect(component.label()).toEqual('Pesquisar');
    expect(component.enableLoading()).toEqual(true);
  });

  it('should render input field with correct attributes', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement).toBeTruthy();
    expect(inputElement.type).toEqual('text');
    expect(inputElement.placeholder).toEqual('');
  });

  it('should emit value changes correctly', () => {
    const onChangeSpy = jest.spyOn(component, 'onChange');

    const testValue = 'Test input value';
    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(onChangeSpy).toHaveBeenCalledWith(testValue);
  });

  it('should call registerOnChange and registerOnTouched', () => {
    const onChangeSpy = jest.fn();
    const onTouchSpy = jest.fn();

    component.registerOnChange(onChangeSpy);
    component.registerOnTouched(onTouchSpy);

    const testValue = 'Test value';
    component.writeValue(testValue);

    expect(onChangeSpy).toHaveBeenCalledWith(testValue);
    expect(onTouchSpy).toHaveBeenCalled();
  });
});
