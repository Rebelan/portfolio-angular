import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatButtonModule, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export default class NavbarComponent {

  private authService = inject(AuthService);
  private router = inject(Router);
  private translate = inject(TranslateService);

  isLogged = computed(() => this.authService.currentUser() !== null);

  userName = computed(() => this.authService.currentUser()?.name ?? '');


  currentLang = signal(localStorage.getItem('lang') || 'es');


  constructor() {
    this.translate.addLangs(['es', 'en', 'pt']);
    this.translate.setFallbackLang('es').subscribe();

    const savedLang = localStorage.getItem('lang') || 'es';
    this.currentLang.set(savedLang);
    this.translate.use(savedLang).subscribe();
  }

  changeLanguage(lang: string): void {
    this.currentLang.set(lang);
    this.translate.use(lang).subscribe(() => {
      localStorage.setItem('lang', lang);
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
