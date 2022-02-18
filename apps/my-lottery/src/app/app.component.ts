import { Component } from '@angular/core';
import { NavItem } from '@jkonst/ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-lottery';
  links: NavItem[] = [
    { name: 'Home', link: '/', default: true },
    { name: 'Lottery', link: '/lottery', default: false },
  ];
}
