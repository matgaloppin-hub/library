import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../model/users';
import { RequestLogin } from '../model/requestLogin';

@Injectable({
  providedIn: 'root' // Rend le service disponible dans toute l'application (Singleton)
})
export class UserService {

  private readonly baseUrl = `${environment.apiUrl}/users`;

  // Injection du HttpClient
  constructor(private http: HttpClient) {}

  /** Récupérer tous les utilisateurs */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  /** Créer un nouvel utilisateur */
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + '/register', user);
  }

  login(userlogin: RequestLogin): Observable<string>{
    return this.http.post<string>(this.baseUrl + '/login', userlogin);
  }
}