import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PostService } from '../../services/post';

@Component({
  selector: 'app-post-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css'
})
export class PostList {
  posts: any[] = [];

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    this.postService.getPosts().subscribe({
      next: (data) => (this.posts = data),
      error: (err) => console.error('Error loading posts:', err),
    });
  }

  goToPost(postId: string) {
    this.router.navigate(['/posts', postId]);
  }

  goToAdd() {
    this.router.navigate(['/posts/add']);
  }

  editPost(postId: string) {
    this.router.navigate(['/posts/edit', postId]);
  }

  deletePost(postId: string) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(postId).subscribe({
        next: () => {
          this.fetchPosts();
        },
        error: (err) => console.error('Error deleting post:', err),
      });
    }
  }
}
