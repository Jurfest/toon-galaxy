import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getContrast } from 'polished';

import { colors } from '../../../tokens/colors';

interface ColorObj {
  key: string;
  color: string;
}

@Component({
  selector: 'design-system-colors-grid',
  standalone: true,
  imports: [],
  templateUrl: './colors-grid.component.html',
  styleUrl: './colors-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsGridComponent {
  colorObjList: ColorObj[] = Object.entries(colors).map(([key, color]) => ({
    key,
    color: getContrast(color, '#FFF') < 3.5 ? '#000' : '#FFF',
  }));
}
