import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/users';

  currentUser = signal<User | null>(this.getUserFromStorage());

  private getUserFromStorage(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  login(email: string, password: string): Observable<boolean> {
    const params = new HttpParams().set('email', email).set('password', password);

    return this.http.get<User[]>(this.apiUrl, { params }).pipe(
      map((users) => users[0] ?? null),
      tap((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', 'fake-token');
          this.currentUser.set(user);
        }
      }),
      map((user) => !!user)
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUser.set(null);
  }

  isLogged(): boolean {
    return this.currentUser() !== null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
