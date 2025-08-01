import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @Input() list: any[] = [];
  constructor(public router: Router) { }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/'])
  }
}
