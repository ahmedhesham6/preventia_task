import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  getFilesUrl = 'api/file/meta';
  getFileTypesUrl = 'api/file/type';

  constructor(private http: HttpClient) {}

  // Get Files
  getFiles(): Observable<any> {
    return this.http.get<any>(this.getFilesUrl);
  }

  // Search Files
  searchFiles(params): Observable<any> {
    return this.http.get<any>(`${this.getFilesUrl}/search`, { params });
  }

  // Get File Types
  getFileTypes(): Observable<any> {
    return this.http.get<any>(this.getFileTypesUrl);
  }

  //Delete File
  deleteFile(fileId): Observable<any> {
    return this.http.delete<any>(`${this.getFilesUrl}/${fileId}`);
  }
}
