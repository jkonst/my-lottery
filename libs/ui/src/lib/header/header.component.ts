import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavItem } from '../../../../lottery-form-models/src/lib/model/nav-item';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input()
  navigationItems: NavItem[] = [];
  isCollapsed = true;
}
