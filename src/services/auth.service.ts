import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  // Mock users database
  private users: User[] = [
    {
      id: '1',
      email: 'admin@example.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      isActive: true,
      createdAt: new Date('2024-01-01')
    },
    {
      id: '2',
      email: 'user@example.com',
      password: 'user123',
      firstName: 'John',
      lastName: 'Doe',
      role: 'user',
      isActive: true,
      createdAt: new Date('2024-01-15')
    }
  ];

  constructor() {
    // Check for stored user on service initialization
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    this.loadingSubject.next(true);
    
    return of(null).pipe(
      delay(1000), // Simulate API call
      map(() => {
        const user = this.users.find(u => 
          u.email === credentials.email && u.password === credentials.password
        );
        
        if (!user) {
          this.loadingSubject.next(false);
          throw new Error('Email ou mot de passe incorrect');
        }

        if (!user.isActive) {
          this.loadingSubject.next(false);
          throw new Error('Compte désactivé');
        }

        // Update last login
        user.lastLogin = new Date();
        
        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        const token = this.generateToken();
        
        const response: AuthResponse = {
          user: userWithoutPassword,
          token
        };

        // Store user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        localStorage.setItem('token', token);
        
        this.currentUserSubject.next(userWithoutPassword);
        this.loadingSubject.next(false);
        
        return response;
      })
    );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    this.loadingSubject.next(true);
    
    return of(null).pipe(
      delay(1000), // Simulate API call
      map(() => {
        // Check if user already exists
        const existingUser = this.users.find(u => u.email === userData.email);
        if (existingUser) {
          this.loadingSubject.next(false);
          throw new Error('Un compte avec cet email existe déjà');
        }

        // Create new user
        const newUser: User = {
          id: this.generateId(),
          email: userData.email,
          password: userData.password,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: 'user',
          isActive: true,
          createdAt: new Date()
        };

        this.users.push(newUser);

        // Remove password from response
        const { password, ...userWithoutPassword } = newUser;
        const token = this.generateToken();
        
        const response: AuthResponse = {
          user: userWithoutPassword,
          token
        };

        // Store user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        localStorage.setItem('token', token);
        
        this.currentUserSubject.next(userWithoutPassword);
        this.loadingSubject.next(false);
        
        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  getAllUsers(): Observable<User[]> {
    return of(this.users.map(({ password, ...user }) => user)).pipe(delay(500));
  }

  updateUserStatus(userId: string, isActive: boolean): Observable<User> {
    return of(null).pipe(
      delay(500),
      map(() => {
        const user = this.users.find(u => u.id === userId);
        if (!user) {
          throw new Error('Utilisateur non trouvé');
        }
        
        user.isActive = isActive;
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      })
    );
  }

  private generateToken(): string {
    return Math.random().toString(36).substr(2) + Date.now().toString(36);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}