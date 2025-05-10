import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../Account/account.service';
import { SubscribtionType } from '../../dtos/SubscriptionType';
import { environment } from '../../environments/environment';

export interface SubscriptionResponse {
  paymentUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubscribtionService {
  private apiUrl = '/api/Subscription/Session';

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) { }

  subscribe(domain: string, type: SubscribtionType): Observable<SubscriptionResponse> {
    const token = this.accountService.getToken();
    if (!token) {
      return new Observable<SubscriptionResponse>(); 
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const url = `${environment.account_base_url}${this.apiUrl}?domain=${domain}&type=${type}`;
    
    return this.http.post<SubscriptionResponse>(url, {}, { headers });
  }
}
