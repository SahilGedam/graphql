import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList implements OnInit {
  books: any[] = [];

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe((data) => {
      console.log('✅ BookService called');
      console.trace()
      this.books = data;
    });
  }
  goToAdd() {
    this.router.navigate(['/books/add']);
  }
  goToEdit(book: any): void {
    this.router.navigate(['/books/edit', book.id], {
      state: { book }
    });
  }

  deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => { this.getBooks() },
        error: (err) => { console.error('Error deleting book:', err) }
      });
    }
  }
}
