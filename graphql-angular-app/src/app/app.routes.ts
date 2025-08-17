import { Routes } from '@angular/router';
import { BookList } from './components/book-list/book-list';
import { BookAddUpdate } from './pages/book-add-update/book-add-update';
import { PostList } from './components/post-list/post-list';

export const routes: Routes = [
  { path: '', component: BookList },
  { path: 'books', component: BookList },
  { path: 'books/add', component: BookAddUpdate },
  { path: 'books/edit/:id', component: BookAddUpdate },

// { path: '', component: PostList },
//   {
//     path: 'posts/add',
//     loadComponent: () =>
//       import('./components/post-add-update/post-add-update').then(m => m.PostAddUpdate)
//   },
//   {
//     path: 'posts/edit/:id',
//     loadComponent: () =>
//       import('./components/post-add-update/post-add-update').then(m => m.PostAddUpdate)
//   },

//   // Dynamic Post detail route at the end
//   {
//     path: 'posts/:id',
//     loadComponent: () =>
//       import('./components/post-detail/post-detail').then(m => m.PostDetail)
//   },


];
