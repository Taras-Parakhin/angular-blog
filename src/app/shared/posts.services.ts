import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, map} from "rxjs";
import {IPost} from "./interface";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class PostsServices {
  constructor(private http: HttpClient) { }

  create(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(map((response: any ) => {
        const newPost: IPost = {
          ...post,
          id: response.id,
          date: new Date(post.date)
        }
        return newPost
      }))
  }

  getAll(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${environment.fbDbUrl}/posts.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }))
      }))
  }

  getById(id: string): Observable<IPost> {
    return this.http.get<IPost>(`${environment.fbDbUrl}/posts/${id}.json`)
      .pipe(map((post: any) => {
        const newPost: IPost = {
          ...post,
          id,
          date: new Date(post.date)
        }
        return newPost
      }))
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
  }

  update(post: IPost): Observable<IPost> {
    return this.http.patch<IPost>(`${environment.fbDbUrl}/posts/${post.id}.json`, post)
  }

}
