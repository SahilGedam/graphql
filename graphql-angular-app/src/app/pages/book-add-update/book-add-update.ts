import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-book-add-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-add-update.html',
  styleUrl: './book-add-update.css',
})
export class BookAddUpdate {
  bookForm!: FormGroup;
  isEditMode: boolean = false;
  bookId?: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService
  ) {
    this.initForm();

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.bookId = id;
        this.loadBook(id);
      }
    });
  }

  initForm(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
    });
  }

  loadBook(id: string): void {
    this.bookService.getBookById(id).subscribe({
      next: (book) => {
        this.bookForm.patchValue({
          title: book.title,
          author: book.author,
        });
      },
      error: (err) => console.error('Error loading book:', err),
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const { title, author } = this.bookForm.value;

      if (this.isEditMode && this.bookId) {
        this.bookService.updateBook(this.bookId, title, author).subscribe({
          next: () => this.goBack(),
          error: (err) => console.error('Error updating book:', err),
        });
      } else {
        this.bookService.createBook(title, author).subscribe({
          next: () => this.goBack(),
          error: (err) => console.error('Error creating book:', err),
        });
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
