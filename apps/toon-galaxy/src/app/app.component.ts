import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@toon-galaxy/shared/ui-design-system';

@Component({
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  selector: 'toon-galaxy-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'toon-galaxy';
}
