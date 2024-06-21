import { isPlatformServer } from '@angular/common';
import {
  Directive,
  inject,
  OnInit,
  PLATFORM_ID,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

/**
 * Template directive to show content when is on Server platform
 * (hide when is in Browser plataform)
 */
@Directive({
  selector: '[commonAppShellRender]',
  standalone: true,
})
export class AppShellRenderDirective implements OnInit {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}

export default AppShellRenderDirective;
