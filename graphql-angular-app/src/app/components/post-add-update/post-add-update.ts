import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post';

@Component({
  selector: 'app-post-add-update',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-add-update.html',
  styleUrl: './post-add-update.css'
})
export class PostAddUpdate {
  postForm!: FormGroup;
  @Input() isEditMode: boolean = false;
  @Input() postId?: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService
  ) {
    this.initForm();
  }

  initForm(): void {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });

    if (this.isEditMode && this.postId) {
      this.loadPostData();
    }
  }

  loadPostData(): void {
    this.postService.getPostById(this.postId!).subscribe({
      next: (post) => {
        this.postForm.patchValue({
          title: post.title,
          content: post.content,
        });
      },
      error: (err) => console.error('Error loading post:', err),
    });
  }

  onSubmit(): void {
    if (this.postForm.invalid) return;

    const { title, content } = this.postForm.value;

    if (this.isEditMode && this.postId) {
      this.postService.updatePost(this.postId, title, content).subscribe({
        next: () => this.goBack(),
        error: (err) => console.error('Error updating post:', err),
      });
    } else {
      const userId = 1; // 🔁 hardcoded for now — later you may fetch from login
      this.postService.createPost(title, content, userId).subscribe({
        next: () => this.goBack(),
        error: (err) => console.error('Error creating post:', err),
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/posts']);
  }
}