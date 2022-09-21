import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostsServices} from "../../shared/posts.services";
import {Subscription, switchMap} from 'rxjs'
import {IPost} from "../../shared/interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  post: IPost
  submitted = false
  uSub: Subscription

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostsServices,
    private alertService: AlertService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getById(params['id'])
      })
    ).subscribe((post: IPost) => {
      this.post = post

      this.form = new FormGroup<any>({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      })
    })
  }

  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe()
    }
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    this.uSub = this.postService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,
    }).subscribe(() => {
      this.submitted = false
      this.alertService.warning('Post has been updated')
    })
  }
}
