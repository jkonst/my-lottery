import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavItem } from '../model/nav-item';

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
