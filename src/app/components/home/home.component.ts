import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, MatButtonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  imageParis: string =
    'https://papirszarnyak.hu/wp-content/uploads/2024/01/Parizs-12.png';
  imageNewYork: string = 'https://www.travelguide.net/media/new-york.jpeg';
}
