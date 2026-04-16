import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export default class NavbarComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  isLogged = computed(() => this.authService.currentUser() !== null);

  userName = computed(() => this.authService.currentUser()?.name ?? '');

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
