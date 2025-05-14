import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
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
      displayFor: 'both',
    },
    {
      icon: 'flight',
      label: 'Foglalás',
      route: '/booking',
      displayFor: 'loggedIn',
    },
    {
      icon: 'flight',
      label: 'Keresés',
      route: '/flights',
      displayFor: 'both',
    },
    {
      icon: 'login',
      label: 'Bejelentkezés  ',
      route: '/login',
      displayFor: 'loggedOut',
    },
    {
      icon: 'login',
      label: 'Regisztráció  ',
      route: '/register',
      displayFor: 'loggedOut',
    },
    {
      icon: 'exit_to_app',
      label: 'Kijelentkezés  ',
      displayFor: 'loggedIn',
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
