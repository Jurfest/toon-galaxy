import { isPlatformServer } from '@angular/common';
import {
  Directive,
  inject,
  OnInit,
  PLATFORM_ID,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

/* Template directive to hide content when is on Server Platform */
@Directive({
  selector: '[commonAppShellNoRender]',
  standalone: true,
})
export class AppShellNoRenderDirective implements OnInit {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      this.viewContainer.clear();
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
