import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Themes } from './types/themes';
import { Post } from './types/posts';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getThemes() {
    const { apiUrl } = environment;

    return this.http.get<Themes[]>(`${apiUrl}/themes`);
  }

  createTheme(themeName: string, postText: string) {
    const { apiUrl } = environment;
    const payload = { themeName, postText };
    return this.http.post<Themes>(`${apiUrl}/themes`, payload);
  }

  getTheme(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Themes>(`${apiUrl}/themes/${id}`)
  }

  getPosts(limit?: number) {
    const { apiUrl } = environment;

    let url = `${apiUrl}/posts`;

    if (limit) {
      url += `?limit=${limit}`;
    }

    return this.http.get<Post[]>(url);
  }
}
