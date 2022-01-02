import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTextPost: TextPost;
  likePost: Post;
  unlikePost: Post;
};


export type MutationCreateTextPostArgs = {
  input: TextPostInput;
};


export type MutationLikePostArgs = {
  id: Scalars['ID'];
};


export type MutationUnlikePostArgs = {
  id: Scalars['ID'];
};

export type Post = {
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  liked: Scalars['Boolean'];
  likedBy: Array<User>;
  text?: Maybe<Scalars['String']>;
  user: User;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  posts: Array<Post>;
};

export type TextPost = Post & {
  __typename?: 'TextPost';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  liked: Scalars['Boolean'];
  likedBy: Array<User>;
  text: Scalars['String'];
  user: User;
};

export type TextPostInput = {
  text: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  firstName: Scalars['String'];
  friends: Array<User>;
  id: Scalars['ID'];
  lastName: Scalars['String'];
  name: Scalars['String'];
};

export type CreatePostCardTextPostMutationVariables = Exact<{
  input: TextPostInput;
}>;


export type CreatePostCardTextPostMutation = { __typename?: 'Mutation', createTextPost: { __typename?: 'TextPost', id: string } };

export type LikeButtonLikeMutationVariables = Exact<{
  postID: Scalars['ID'];
}>;


export type LikeButtonLikeMutation = { __typename?: 'Mutation', likePost: { __typename?: 'TextPost', id: string, liked: boolean, likedBy: Array<{ __typename?: 'User', id: string }> } };

export type LikeButtonUnlikeMutationVariables = Exact<{
  postID: Scalars['ID'];
}>;


export type LikeButtonUnlikeMutation = { __typename?: 'Mutation', unlikePost: { __typename?: 'TextPost', id: string, liked: boolean, likedBy: Array<{ __typename?: 'User', id: string }> } };

export type HomePagePostsQueryVariables = Exact<{ [key: string]: never; }>;


export type HomePagePostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'TextPost', id: string, text: string, createdAt: string, liked: boolean, user: { __typename?: 'User', id: string, name: string }, likedBy: Array<{ __typename?: 'User', id: string, firstName: string }> }> };

export type ProfileMeQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileMeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, firstName: string, lastName: string, name: string, friends: Array<{ __typename?: 'User', id: string, name: string }> } };


export const CreatePostCardTextPostDocument = gql`
    mutation CreatePostCardTextPost($input: TextPostInput!) {
  createTextPost(input: $input) {
    id
  }
}
    `;
export type CreatePostCardTextPostMutationFn = Apollo.MutationFunction<CreatePostCardTextPostMutation, CreatePostCardTextPostMutationVariables>;

/**
 * __useCreatePostCardTextPostMutation__
 *
 * To run a mutation, you first call `useCreatePostCardTextPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostCardTextPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostCardTextPostMutation, { data, loading, error }] = useCreatePostCardTextPostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostCardTextPostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostCardTextPostMutation, CreatePostCardTextPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostCardTextPostMutation, CreatePostCardTextPostMutationVariables>(CreatePostCardTextPostDocument, options);
      }
export type CreatePostCardTextPostMutationHookResult = ReturnType<typeof useCreatePostCardTextPostMutation>;
export type CreatePostCardTextPostMutationResult = Apollo.MutationResult<CreatePostCardTextPostMutation>;
export type CreatePostCardTextPostMutationOptions = Apollo.BaseMutationOptions<CreatePostCardTextPostMutation, CreatePostCardTextPostMutationVariables>;
export const LikeButtonLikeDocument = gql`
    mutation LikeButtonLike($postID: ID!) {
  likePost(id: $postID) {
    id
    likedBy {
      id
    }
    liked
  }
}
    `;
export type LikeButtonLikeMutationFn = Apollo.MutationFunction<LikeButtonLikeMutation, LikeButtonLikeMutationVariables>;

/**
 * __useLikeButtonLikeMutation__
 *
 * To run a mutation, you first call `useLikeButtonLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeButtonLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeButtonLikeMutation, { data, loading, error }] = useLikeButtonLikeMutation({
 *   variables: {
 *      postID: // value for 'postID'
 *   },
 * });
 */
export function useLikeButtonLikeMutation(baseOptions?: Apollo.MutationHookOptions<LikeButtonLikeMutation, LikeButtonLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeButtonLikeMutation, LikeButtonLikeMutationVariables>(LikeButtonLikeDocument, options);
      }
export type LikeButtonLikeMutationHookResult = ReturnType<typeof useLikeButtonLikeMutation>;
export type LikeButtonLikeMutationResult = Apollo.MutationResult<LikeButtonLikeMutation>;
export type LikeButtonLikeMutationOptions = Apollo.BaseMutationOptions<LikeButtonLikeMutation, LikeButtonLikeMutationVariables>;
export const LikeButtonUnlikeDocument = gql`
    mutation LikeButtonUnlike($postID: ID!) {
  unlikePost(id: $postID) {
    id
    likedBy {
      id
    }
    liked
  }
}
    `;
export type LikeButtonUnlikeMutationFn = Apollo.MutationFunction<LikeButtonUnlikeMutation, LikeButtonUnlikeMutationVariables>;

/**
 * __useLikeButtonUnlikeMutation__
 *
 * To run a mutation, you first call `useLikeButtonUnlikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeButtonUnlikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeButtonUnlikeMutation, { data, loading, error }] = useLikeButtonUnlikeMutation({
 *   variables: {
 *      postID: // value for 'postID'
 *   },
 * });
 */
export function useLikeButtonUnlikeMutation(baseOptions?: Apollo.MutationHookOptions<LikeButtonUnlikeMutation, LikeButtonUnlikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeButtonUnlikeMutation, LikeButtonUnlikeMutationVariables>(LikeButtonUnlikeDocument, options);
      }
export type LikeButtonUnlikeMutationHookResult = ReturnType<typeof useLikeButtonUnlikeMutation>;
export type LikeButtonUnlikeMutationResult = Apollo.MutationResult<LikeButtonUnlikeMutation>;
export type LikeButtonUnlikeMutationOptions = Apollo.BaseMutationOptions<LikeButtonUnlikeMutation, LikeButtonUnlikeMutationVariables>;
export const HomePagePostsDocument = gql`
    query HomePagePosts {
  posts {
    id
    text
    createdAt
    liked
    user {
      id
      name
    }
    likedBy {
      id
      firstName
    }
  }
}
    `;

/**
 * __useHomePagePostsQuery__
 *
 * To run a query within a React component, call `useHomePagePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomePagePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomePagePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomePagePostsQuery(baseOptions?: Apollo.QueryHookOptions<HomePagePostsQuery, HomePagePostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomePagePostsQuery, HomePagePostsQueryVariables>(HomePagePostsDocument, options);
      }
export function useHomePagePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomePagePostsQuery, HomePagePostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomePagePostsQuery, HomePagePostsQueryVariables>(HomePagePostsDocument, options);
        }
export type HomePagePostsQueryHookResult = ReturnType<typeof useHomePagePostsQuery>;
export type HomePagePostsLazyQueryHookResult = ReturnType<typeof useHomePagePostsLazyQuery>;
export type HomePagePostsQueryResult = Apollo.QueryResult<HomePagePostsQuery, HomePagePostsQueryVariables>;
export const ProfileMeDocument = gql`
    query ProfileMe {
  me {
    id
    firstName
    lastName
    name
    friends {
      id
      name
    }
  }
}
    `;

/**
 * __useProfileMeQuery__
 *
 * To run a query within a React component, call `useProfileMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileMeQuery(baseOptions?: Apollo.QueryHookOptions<ProfileMeQuery, ProfileMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileMeQuery, ProfileMeQueryVariables>(ProfileMeDocument, options);
      }
export function useProfileMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileMeQuery, ProfileMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileMeQuery, ProfileMeQueryVariables>(ProfileMeDocument, options);
        }
export type ProfileMeQueryHookResult = ReturnType<typeof useProfileMeQuery>;
export type ProfileMeLazyQueryHookResult = ReturnType<typeof useProfileMeLazyQuery>;
export type ProfileMeQueryResult = Apollo.QueryResult<ProfileMeQuery, ProfileMeQueryVariables>;