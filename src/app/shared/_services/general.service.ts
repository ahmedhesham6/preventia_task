import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  constructor(private http: HttpClient) {}

  verifyWalletTransactions(walletID: string | number): Promise<any> {
    return this.http
      .get(`/api/wallets/${walletID}/balance/`, {})
      .toPromise();
  }
}
