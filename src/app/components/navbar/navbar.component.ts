import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isMenuOpen = false;
  screenWidth: number = window.innerWidth;

  menuItems = [
    { icon: 'home', label: 'Home', route: '/home' },
    { icon: 'flight', label: 'Foglalás', route: '/booking' },
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Menü nyitása vagy zárása
  }
}
