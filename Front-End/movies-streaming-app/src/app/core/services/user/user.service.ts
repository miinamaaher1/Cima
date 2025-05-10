import { Injectable, signal } from '@angular/core';
import { IUserSummary } from '../../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _currentUser = signal<IUserSummary | null>(null);
  currentUser = this._currentUser.asReadonly(); // Expose as read-only

  // Update the user state
  setUser(user: IUserSummary | null) {
    this._currentUser.set(user);
  }

  // Check if the user is logged in
  isLoggedIn() {
    return !!this._currentUser()?.isLoggedIn;
  }

  // Clear the user state (logout)
  clearUser() {
    this._currentUser.set(null);
  }
}
