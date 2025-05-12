import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Component } from '@angular/core';
import { RouterModule, CanActivate } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isMenuOpen = false;
  screenWidth: number = window.innerWidth;

  constructor(private authService: AuthService) {}

  menuItems = [
    {
      icon: 'home',
      label: 'Home',
      route: '/home',
    },
    {
      icon: 'flight',
      label: 'Foglalás',
      route: '/booking',
    },
    {
      icon: 'flight',
      label: 'Keresés',
      route: '/flights',
    },
    {
      icon: 'login',
      label: 'Bejelentkezés  ',
      route: '/login',
    },
    {
      icon: 'login',
      label: 'Regisztráció  ',
      route: '/register',
    },
    {
      icon: 'login',
      label: 'Kijelentkezés  ',
      action: () => {
        this.authService.logout().then(() => {
          window.location.reload();
        });
      },
    },
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
