import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post';

@Component({
  selector: 'app-post-add-update',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-add-update.html',
  styleUrl: './post-add-update.css'
})
export class PostAddUpdate {
 postForm!: FormGroup;
  isEditMode = false;
  postId?: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {
    this.initForm();

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.postId = params['id'];
        this.loadPost();
      }
    });
  }

  get pageTitle() {
    return this.isEditMode ? '✏️ Edit Post' : '➕ Add Post';
  }

  initForm() {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      userId: [1, Validators.required], // default user
    });
  }

  loadPost() {
    if (!this.postId) return;
    this.postService.getPostById(this.postId).subscribe({
      next: (post) => this.postForm.patchValue({
        title: post.title,
        content: post.content,
        userId: post.user.id
      }),
      error: (err) => console.error(err)
    });
  }

  onSubmit() {
    if (this.postForm.invalid) return;

    const { title, content, userId } = this.postForm.value;

    if (this.isEditMode && this.postId) {
      this.postService.updatePost(this.postId, title, content).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error(err)
      });
    } else {
      this.postService.createPost(title, content, userId).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error(err)
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
