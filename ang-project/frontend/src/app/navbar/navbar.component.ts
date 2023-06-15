import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IconComponent } from '../icon/icon.component';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
  imports: [MatIconModule, IconComponent],
})
export class NavbarComponent {
  search = 'search';
  searchText = 'tooltip';

  settings = 'settings';

  add = 'add';

  delete = 'delete';

  publish = 'publish';
}
