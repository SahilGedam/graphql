import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private apollo: Apollo) { }

    getPosts(): Observable<any[]> {
    return this.apollo
      .watchQuery<{ posts: any[] }>({
        query: gql`
          query {
            posts {
              id
              title
              content
              createdAt
              commentCount
              user {
                id
                name
              }
            }
          }
        `,
        fetchPolicy: 'no-cache',
      })
      .valueChanges.pipe(map((result) => result.data.posts));
  }

  getPostById(id: string): Observable<any> {
    return this.apollo
      .watchQuery<{ post: any }>({
        query: gql`
          query GetPost($id: ID!) {
            post(id: $id) {
              id
              title
              content
              createdAt
              user {
                id
                name
              }
              comments {
                id
                text
                createdAt
                user {
                  name
                }
              }
            }
          }
        `,
        variables: { id },
        fetchPolicy: 'no-cache',
      })
      .valueChanges.pipe(map((result) => result.data.post));
  }

  createPost(title: string, content: string, userId: any): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation CreatePost($title: String!, $content: String!, $userId: ID!) {
          createPost(title: $title, content: $content, userId: $userId) {
            id
          }
        }
      `,
      variables: { title, content, userId },
    });
  }

  updatePost(id: string, title: string, content: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdatePost($id: ID!, $title: String!, $content: String!) {
          updatePost(id: $id, title: $title, content: $content) {
            id
          }
        }
      `,
      variables: { id, title, content },
    });
  }

  deletePost(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeletePost($id: ID!) {
          deletePost(id: $id)
        }
      `,
      variables: { id },
    });
  }

}
