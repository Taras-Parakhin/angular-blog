import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IPost} from "../shared/interface";
import {PostsServices} from "../shared/posts.services";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  posts$: Observable<IPost[]>

  constructor(private postsServices: PostsServices) { }

  ngOnInit(): void {
    this.posts$ = this.postsServices.getAll()
  }

}
