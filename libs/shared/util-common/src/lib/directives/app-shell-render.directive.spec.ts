import { PLATFORM_ID, TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AppShellRenderDirective } from './app-shell-render.directive';

describe('AppShellRenderDirective', () => {
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

    platformId = 'server'; // Default to server for initial setup

    TestBed.configureTestingModule({
      providers: [
        { provide: TemplateRef, useValue: templateRef },
        { provide: ViewContainerRef, useValue: viewContainerRef },
        { provide: PLATFORM_ID, useFactory: () => platformId },
        AppShellRenderDirective, // Provide the directive
      ],
    });
  });

  it('should create an instance', () => {
    const directive = TestBed.inject(AppShellRenderDirective);
    expect(directive).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should create embedded view if platform is server', () => {
      platformId = 'server';
      const directive = TestBed.inject(AppShellRenderDirective);
      directive.ngOnInit();
      expect(viewContainerRef.createEmbeddedView).toHaveBeenCalledWith(
        templateRef,
      );
    });

    it('should clear view container if platform is not server', () => {
      platformId = 'browser';
      const directive = TestBed.inject(AppShellRenderDirective);
      directive.ngOnInit();
      expect(viewContainerRef.clear).toHaveBeenCalled();
    });
  });
});
