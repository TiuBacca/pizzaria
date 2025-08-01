import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isDropdownOpen: boolean = false;
  @Input() titulo: string = ''
  @Input() usuario: string = ''
  @Input() perfil: string = ''
  @Input() logo: string = ''
  @Input() usuarioImg: string = ''
  @Input() acoes: string[] = []; 
  @Output() onAcaoClick = new EventEmitter<string>(); 

  constructor() { }
  onAcaoClickItem(item: string) {
    this.onAcaoClick.emit(item); 
  }
  ngOnInit(): void {
    document.body.classList.toggle('toggle-sidebar');
  }
  @HostListener('document:click', ['$event'])
  fecharDropdownForaComponente(event: Event) {
    const dropdownElement = document.getElementById('navbarSupportedContent');
    if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
      this.isDropdownOpen = false;
    }
  }
  toggleSidebar() {
    document.body.classList.toggle('toggle-sidebar');
  }

  toggleDropdown(dropdown: HTMLElement) {
    this.isDropdownOpen = !this.isDropdownOpen;

    if (this.isDropdownOpen) {
      dropdown.setAttribute('aria-expanded', 'true');
    } else {
      dropdown.setAttribute('aria-expanded', 'false');
    }
  }
}
