import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarComponent } from './navbar.component';
import { NavigationEnd, Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject, of } from 'rxjs';
import { TabName } from '../../../models/tab-name';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let routerMock: Partial<Router>;
  let breakpointObserverMock: Partial<BreakpointObserver>;

  beforeEach(async () => {
    routerMock = {
      navigate: jest.fn(),
      events: new Subject<any>(),
    };

    breakpointObserverMock = {
      observe: jest.fn().mockReturnValue(of({ matches: false })),
    };

    await TestBed.configureTestingModule({
      imports: [NavbarComponent, NoopAnimationsModule],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: BreakpointObserver, useValue: breakpointObserverMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('totalFavoriteCharacters', 0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it.each([[TabName.Favorites], [TabName.Home]])(
    'should navigate to the correct tab (%tabName) when navigateToTabName is called',
    (tabName) => {
      component.navigateToTabName(tabName);
      expect(routerMock.navigate).toHaveBeenCalledWith([
        `manage-characters/${tabName}`,
      ]);
    },
  );
});
