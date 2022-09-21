import { Component, OnInit } from '@angular/core';
import {Observable, switchMap} from "rxjs";
import {IPost} from "../shared/interface";
import {ActivatedRoute, Params} from "@angular/router";
import {PostsServices} from "../shared/posts.services";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$: Observable<IPost>

  constructor(private activatedRoute: ActivatedRoute, private postService: PostsServices) { }

  ngOnInit() {
    this.post$ = this.activatedRoute.params
      .pipe(switchMap((params: Params) => {
        return this.postService.getById(params['id'])
      }))
  }

}
