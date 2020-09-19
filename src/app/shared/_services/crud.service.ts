import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {
  public url: string = 'https://jsonplaceholder.typicode.com/';
  public genericListFlagSubject = new BehaviorSubject(false);
  public forceRefreshValue = this.genericListFlagSubject.asObservable();

  constructor(private http: HttpClient) {}
  forwardForceRefresh(flag: boolean) {
    this.genericListFlagSubject.next(flag);
  }

  getData(gate, query): Promise<any> {
    let params = new HttpParams();
    let requestUrl = this.url + gate;
    for (let index in query) {
      params = params.set(index, query[index]);
    }
    return this.http.get(requestUrl, { params: params }).toPromise();
  }

  getOne(gate, ID, query = {}): Promise<any> {
    let params = new HttpParams();
    let requestUrl = this.url + gate;
    for (let index in query) {
      params = params.set(index, query[index]);
    }
    return this.http
      .get(`${requestUrl}/${ID}`, { params: params })
      .toPromise();
  }

  deleteData(gate, query): Promise<any> {
    let params = new HttpParams();
    let requestUrl = this.url + gate;
    for (let index in query) {
      params = params.set(index, query[index]);
    }
    return this.http
      .delete(`${requestUrl}`, { params: params })
      .toPromise();
  }

  addData(gate, data, query = {}): Promise<any> {
    let params = new HttpParams();
    let requestUrl = this.url + gate;
    for (let index in query) {
      params = params.set(index, query[index]);
    }
    return this.http
      .post(requestUrl, data, { params: params })
      .toPromise();
  }

  editData(gate, data, dataid): Promise<any> {
    let requestUrl = this.url + gate;
    return this.http
      .patch(`${requestUrl}/${dataid}`, data)
      .toPromise();
  }

  api(uri, body = {}, method = 'GET', query = {}) {
    let requestPromise;
    switch (method) {
      case 'POST':
        requestPromise = this.http.post(uri, body, {
          params: query
        });
        break;

      case 'GET':
        requestPromise = this.http.get(uri, { params: { ...body } });
        break;

      case 'PATCH':
        requestPromise = this.http.patch(uri, body, {
          params: query
        });
        break;

      case 'PUT':
        requestPromise = this.http.put(uri, body, {
          params: query
        });
        break;

      case 'DELETE':
        requestPromise = this.http.delete(uri, {
          params: {
            ...body
          }
        });
        break;

      default:
        requestPromise = this.http.get(uri, {
          params: { ...body }
        });
        break;
    }
    return requestPromise.toPromise();
  }

  public uploadAttachment(file: any, key = 'files') {
    const input = new FormData();
    input.append(key, file, file.name);

    return this.http
      .post(`/api//attachments/upload`, input, {
        headers: {}
      })
      .toPromise();
  }

  public downloadInvoice(orderID) {
    return this.http
      .get(`/api/orderrequests/${orderID}/invoice`, {
        responseType: 'blob',
        params: {}
      })
      .toPromise()
      .then((response) => {
        const blob = new Blob([response], {
          type: 'application/pdf'
        });
        const url = window.URL.createObjectURL(blob);
        const pwa = window.open(url);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.setAttribute(
          'download',
          `order_#${orderID}_invoice.pdf`
        );
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }
}
