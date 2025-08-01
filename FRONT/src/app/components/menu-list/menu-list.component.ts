import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'lib-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
})
export class MenuListComponent implements OnInit {
  menuListPosition!: string;
  @Input() listaMenu: any[] = []; 
  @Output() onMenuClick = new EventEmitter<any>(); 
  @ViewChild('menuList')
  menuList!: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }
  onClickItem(item: string) {
    this.onMenuClick.emit(item); 
  }
  abrirMenuList() {
    const menuListElement = this.menuList.nativeElement;
    const rect = menuListElement.getBoundingClientRect();
    const distanceFromTop = rect.top;
    if (distanceFromTop < rect.height) {
      this.menuListPosition = 'menu-list-up';
    } else {
      this.menuListPosition = 'menu-list-down';
    }
  }
}
