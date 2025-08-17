import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post';

@Component({
  selector: 'app-post-detail',
  imports: [CommonModule],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css'
})
export class PostDetail implements OnInit {
  post: any;

  constructor(private route: ActivatedRoute, private postService: PostService, private router: Router,) { }

  ngOnInit(): void {
    console.log('called PostDetail component');

    this.fetchPostDetails();
  }

  fetchPostDetails(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.postService.getPostById(postId).subscribe((post) => {
        this.post = post;
      });
    }
  }
  goBack() {
    this.router.navigate(['/']);
  }
}
