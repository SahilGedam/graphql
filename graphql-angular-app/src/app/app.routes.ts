import { Routes } from '@angular/router';
import { BookList } from './components/book-list/book-list';
import { BookAddUpdate } from './pages/book-add-update/book-add-update';

export const routes: Routes = [
  { path: '', component: BookList },
  { path: 'books', component: BookList },
  { path: 'books/add', component: BookAddUpdate },
  { path: 'books/edit/:id', component: BookAddUpdate },
];
