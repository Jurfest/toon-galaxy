import { PLATFORM_ID, TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AppShellNoRenderDirective } from './app-shell-no-render.directive';

describe('AppShellNoRenderDirective', () => {
  let templateRef: TemplateRef<any>;
  let viewContainerRef: ViewContainerRef;
  let platformId: string;

  beforeEach(() => {
    templateRef = {
      createEmbeddedView: jest.fn(),
    } as unknown as TemplateRef<any>;

    viewContainerRef = {
      createEmbeddedView: jest.fn(),
      clear: jest.fn(),
    } as unknown as ViewContainerRef;

    platformId = 'server';

    TestBed.configureTestingModule({
      providers: [
        { provide: TemplateRef, useValue: templateRef },
        { provide: ViewContainerRef, useValue: viewContainerRef },
        { provide: PLATFORM_ID, useFactory: () => platformId },
        AppShellNoRenderDirective,
      ],
    });
  });

  it('should create an instance', () => {
    const directive = TestBed.inject(AppShellNoRenderDirective);
    expect(directive).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should clear view container if platform is server', () => {
      platformId = 'server';
      const directive = TestBed.inject(AppShellNoRenderDirective);
      directive.ngOnInit();
      expect(viewContainerRef.clear).toHaveBeenCalled();
    });

    it('should create embedded view if platform is not server', () => {
      platformId = 'browser';
      const directive = TestBed.inject(AppShellNoRenderDirective);
      directive.ngOnInit();
      expect(viewContainerRef.createEmbeddedView).toHaveBeenCalledWith(
        templateRef,
      );
    });
  });
});
