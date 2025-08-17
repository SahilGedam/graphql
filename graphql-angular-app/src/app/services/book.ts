import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private apollo: Apollo) { }

getBooks(): Observable<any[]> {
  return this.apollo
    .watchQuery<{ books: any[] }>({
      query: gql`
        query {
          books {
            id
            title
            author
          }
        }
      `,
      fetchPolicy: 'no-cache', // 👈 disables caching
    })
    .valueChanges.pipe(map((result) => result.data.books));
}

  updateBook(id: string, title: string, author: string) {
    return this.apollo.mutate({
      mutation: gql`
      mutation UpdateBook($id: ID!, $title: String!, $author: String!) {
        updateBook(id: $id, title: $title, author: $author) {
          id
          title
          author
        }
      }
    `,
      variables: { id, title, author }
    });
  }
  createBook(title: string, author: string) {
    return this.apollo.mutate({
      mutation: gql`
      mutation CreateBook($title: String!, $author: String!) {
        createBook(title: $title, author: $author) {
          id
          title
          author
        }
      }
    `,
      variables: { title, author }
    });
  }
deleteBook(id: number): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($id: ID!) {
          deleteBook(id: $id)
        }
      `,
      variables: {
        id,
      },
    });
  }
  getBookById(id: string): Observable<any> {
  return this.apollo
    .watchQuery<{ book: any }>({
      query: gql`
        query ($id: ID!) {
          book(id: $id) {
            id
            title
            author
          }
        }
      `,
      variables: { id },
      fetchPolicy: 'no-cache',
    })
    .valueChanges.pipe(map((result) => result.data.book));
}

}
