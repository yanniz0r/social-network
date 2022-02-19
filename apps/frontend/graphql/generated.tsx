import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Upload: any;
};

export type Authentication = {
  __typename?: 'Authentication';
  token: Scalars['String'];
  user: User;
};

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['Date'];
  text: Scalars['String'];
  user: User;
};

export type FriendshipRequest = {
  __typename?: 'FriendshipRequest';
  date: Scalars['Date'];
  from: User;
  id: Scalars['ID'];
  to: User;
};

export type FriendshipRequestNotification = Notification & {
  __typename?: 'FriendshipRequestNotification';
  date: Scalars['String'];
  from: User;
  id: Scalars['ID'];
};

export enum FriendshipStatus {
  Friends = 'FRIENDS',
  None = 'NONE',
  RequestedByMe = 'REQUESTED_BY_ME',
  RequestedByThem = 'REQUESTED_BY_THEM'
}

export type ImagePost = Post & {
  __typename?: 'ImagePost';
  comments: Array<Comment>;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  imageURL: Scalars['String'];
  liked: Scalars['Boolean'];
  likedBy: Array<User>;
  text?: Maybe<Scalars['String']>;
  user: User;
};

export type ImagePostInput = {
  file: Scalars['Upload'];
  text?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptFriendshipRequest: FriendshipRequest;
  authenticateWithGoogle: Authentication;
  commentPost: Post;
  createImagePost: ImagePost;
  createTextPost: TextPost;
  likePost: Post;
  requestFriendship: FriendshipRequest;
  unlikePost: Post;
  updateMe: User;
};


export type MutationAcceptFriendshipRequestArgs = {
  id: Scalars['ID'];
};


export type MutationAuthenticateWithGoogleArgs = {
  code: Scalars['String'];
  redirectURL: Scalars['String'];
};


export type MutationCommentPostArgs = {
  id: Scalars['ID'];
  text: Scalars['String'];
};


export type MutationCreateImagePostArgs = {
  input: ImagePostInput;
};


export type MutationCreateTextPostArgs = {
  input: TextPostInput;
};


export type MutationLikePostArgs = {
  id: Scalars['ID'];
};


export type MutationRequestFriendshipArgs = {
  id: Scalars['ID'];
};


export type MutationUnlikePostArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateMeArgs = {
  input: UpdateMeInput;
};

export type Notification = {
  id: Scalars['ID'];
};

export type Post = {
  comments: Array<Comment>;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  liked: Scalars['Boolean'];
  likedBy: Array<User>;
  text?: Maybe<Scalars['String']>;
  user: User;
};

export type PostLikedNotification = Notification & {
  __typename?: 'PostLikedNotification';
  date: Scalars['String'];
  id: Scalars['ID'];
  liker: User;
  post: Post;
};

export type Query = {
  __typename?: 'Query';
  friendshipRecommendations: Array<User>;
  friendshipRequests: Array<FriendshipRequest>;
  googleOAuthURL: Scalars['String'];
  me: User;
  notifications: Array<Notification>;
  posts: Array<Post>;
  postsOfUser: Array<Post>;
  searchUsers: Array<User>;
  user?: Maybe<User>;
};


export type QueryGoogleOAuthUrlArgs = {
  redirectURL: Scalars['String'];
};


export type QueryPostsOfUserArgs = {
  id: Scalars['ID'];
};


export type QuerySearchUsersArgs = {
  query: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newNotification: Notification;
};

export type TextPost = Post & {
  __typename?: 'TextPost';
  comments: Array<Comment>;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  liked: Scalars['Boolean'];
  likedBy: Array<User>;
  text: Scalars['String'];
  user: User;
};

export type TextPostInput = {
  text: Scalars['String'];
};

export type UpdateMeInput = {
  avatar?: InputMaybe<Scalars['Upload']>;
};

export type User = {
  __typename?: 'User';
  avatarURL?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['Date']>;
  city?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  friends: Array<User>;
  friendshipStatus?: Maybe<FriendshipStatus>;
  hobbies?: Maybe<Array<Scalars['String']>>;
  id: Scalars['ID'];
  job?: Maybe<UserJob>;
  lastName: Scalars['String'];
  name: Scalars['String'];
  online: Scalars['Boolean'];
  status?: Maybe<Scalars['String']>;
};

export type UserJob = {
  __typename?: 'UserJob';
  company: Scalars['String'];
  position: Scalars['String'];
};

export type CreatePostCardTextPostMutationVariables = Exact<{
  input: TextPostInput;
}>;


export type CreatePostCardTextPostMutation = { __typename?: 'Mutation', createTextPost: { __typename?: 'TextPost', id: string } };

export type CreatePostCardImagePostMutationVariables = Exact<{
  input: ImagePostInput;
}>;


export type CreatePostCardImagePostMutation = { __typename?: 'Mutation', createImagePost: { __typename?: 'ImagePost', id: string } };

export type EditAvatarMutationVariables = Exact<{
  avatarUpload: Scalars['Upload'];
}>;


export type EditAvatarMutation = { __typename?: 'Mutation', updateMe: { __typename?: 'User', id: string, avatarURL?: string | null | undefined } };

export type LikeButtonLikeMutationVariables = Exact<{
  postID: Scalars['ID'];
}>;


export type LikeButtonLikeMutation = { __typename?: 'Mutation', likePost: { __typename?: 'ImagePost', id: string, liked: boolean, likedBy: Array<{ __typename?: 'User', id: string }> } | { __typename?: 'TextPost', id: string, liked: boolean, likedBy: Array<{ __typename?: 'User', id: string }> } };

export type LikeButtonUnlikeMutationVariables = Exact<{
  postID: Scalars['ID'];
}>;


export type LikeButtonUnlikeMutation = { __typename?: 'Mutation', unlikePost: { __typename?: 'ImagePost', id: string, liked: boolean, likedBy: Array<{ __typename?: 'User', id: string }> } | { __typename?: 'TextPost', id: string, liked: boolean, likedBy: Array<{ __typename?: 'User', id: string }> } };

export type NavigationQueryVariables = Exact<{ [key: string]: never; }>;


export type NavigationQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, firstName: string, avatarURL?: string | null | undefined }, notifications: Array<{ __typename?: 'FriendshipRequestNotification', id: string } | { __typename?: 'PostLikedNotification', id: string }>, friendshipRequests: Array<{ __typename?: 'FriendshipRequest', date: any, from: { __typename?: 'User', id: string, name: string } }> };

export type NotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type NotificationsQuery = { __typename?: 'Query', notifications: Array<{ __typename?: 'FriendshipRequestNotification', date: string, id: string, from: { __typename?: 'User', id: string, firstName: string, avatarURL?: string | null | undefined } } | { __typename?: 'PostLikedNotification', date: string, id: string, liker: { __typename?: 'User', id: string, firstName: string, avatarURL?: string | null | undefined }, post: { __typename?: 'ImagePost', id: string } | { __typename?: 'TextPost', id: string } }> };

export type NotificationsNewNotificationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NotificationsNewNotificationSubscription = { __typename?: 'Subscription', newNotification: { __typename?: 'FriendshipRequestNotification', id: string } | { __typename?: 'PostLikedNotification', id: string } };

export type PostCardCommentPostMutationVariables = Exact<{
  postID: Scalars['ID'];
  text: Scalars['String'];
}>;


export type PostCardCommentPostMutation = { __typename?: 'Mutation', commentPost: { __typename?: 'ImagePost', id: string, comments: Array<{ __typename?: 'Comment', createdAt: any, text: string, user: { __typename?: 'User', id: string, name: string, online: boolean } }> } | { __typename?: 'TextPost', id: string, comments: Array<{ __typename?: 'Comment', createdAt: any, text: string, user: { __typename?: 'User', id: string, name: string, online: boolean } }> } };

export type SearchQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type SearchQuery = { __typename?: 'Query', searchUsers: Array<{ __typename?: 'User', name: string, avatarURL?: string | null | undefined, id: string, birthday?: any | null | undefined }> };

export type FriendshipsPageQueryVariables = Exact<{ [key: string]: never; }>;


export type FriendshipsPageQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, friends: Array<{ __typename?: 'User', id: string, name: string, online: boolean }> }, friendshipRecommendations: Array<{ __typename?: 'User', id: string, name: string, online: boolean, avatarURL?: string | null | undefined }>, friendshipRequests: Array<{ __typename?: 'FriendshipRequest', id: string, date: any, from: { __typename?: 'User', id: string, name: string, online: boolean, avatarURL?: string | null | undefined } }> };

export type FriendsPageAcceptFriendshipRequestMutationVariables = Exact<{
  friendshipID: Scalars['ID'];
}>;


export type FriendsPageAcceptFriendshipRequestMutation = { __typename?: 'Mutation', acceptFriendshipRequest: { __typename?: 'FriendshipRequest', id: string, date: any, from: { __typename?: 'User', id: string } } };

export type HomePagePostsQueryVariables = Exact<{ [key: string]: never; }>;


export type HomePagePostsQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, name: string, online: boolean }, posts: Array<{ __typename: 'ImagePost', imageURL: string, id: string, text?: string | null | undefined, createdAt: any, liked: boolean, user: { __typename?: 'User', id: string, online: boolean, avatarURL?: string | null | undefined, name: string }, likedBy: Array<{ __typename?: 'User', id: string, firstName: string }>, comments: Array<{ __typename?: 'Comment', text: string, createdAt: any, user: { __typename?: 'User', avatarURL?: string | null | undefined, id: string, name: string, online: boolean } }> } | { __typename: 'TextPost', id: string, text: string, createdAt: any, liked: boolean, user: { __typename?: 'User', id: string, online: boolean, avatarURL?: string | null | undefined, name: string }, likedBy: Array<{ __typename?: 'User', id: string, firstName: string }>, comments: Array<{ __typename?: 'Comment', text: string, createdAt: any, user: { __typename?: 'User', avatarURL?: string | null | undefined, id: string, name: string, online: boolean } }> }> };

export type LoginPageQueryVariables = Exact<{
  googleRedirectURL: Scalars['String'];
}>;


export type LoginPageQuery = { __typename?: 'Query', googleOAuthURL: string };

export type ProfileDetailPageQueryVariables = Exact<{
  userID: Scalars['ID'];
}>;


export type ProfileDetailPageQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name: string, status?: string | null | undefined, online: boolean, birthday?: any | null | undefined, friendshipStatus?: FriendshipStatus | null | undefined, avatarURL?: string | null | undefined, city?: string | null | undefined, hobbies?: Array<string> | null | undefined, job?: { __typename?: 'UserJob', company: string, position: string } | null | undefined, friends: Array<{ __typename?: 'User', id: string, name: string, online: boolean }> } | null | undefined, posts: Array<{ __typename: 'ImagePost', imageURL: string, id: string, text?: string | null | undefined, createdAt: any, liked: boolean, user: { __typename?: 'User', id: string, online: boolean, avatarURL?: string | null | undefined, name: string }, likedBy: Array<{ __typename?: 'User', id: string, firstName: string }>, comments: Array<{ __typename?: 'Comment', text: string, createdAt: any, user: { __typename?: 'User', avatarURL?: string | null | undefined, id: string, name: string, online: boolean } }> } | { __typename: 'TextPost', id: string, text: string, createdAt: any, liked: boolean, user: { __typename?: 'User', id: string, online: boolean, avatarURL?: string | null | undefined, name: string }, likedBy: Array<{ __typename?: 'User', id: string, firstName: string }>, comments: Array<{ __typename?: 'Comment', text: string, createdAt: any, user: { __typename?: 'User', avatarURL?: string | null | undefined, id: string, name: string, online: boolean } }> }>, me: { __typename?: 'User', id: string, name: string, online: boolean } };

export type ProfileDetailPageRequestFriendshipMutationVariables = Exact<{
  userID: Scalars['ID'];
}>;


export type ProfileDetailPageRequestFriendshipMutation = { __typename?: 'Mutation', requestFriendship: { __typename?: 'FriendshipRequest', id: string, to: { __typename?: 'User', id: string, friendshipStatus?: FriendshipStatus | null | undefined } } };

export type ProfileMeQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileMeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, avatarURL?: string | null | undefined, firstName: string, lastName: string, name: string, birthday?: any | null | undefined, online: boolean, friends: Array<{ __typename?: 'User', id: string, online: boolean, name: string }> } };

export type RegisterGooglePageRegisterMutationVariables = Exact<{
  code: Scalars['String'];
  redirectURL: Scalars['String'];
}>;


export type RegisterGooglePageRegisterMutation = { __typename?: 'Mutation', authenticateWithGoogle: { __typename?: 'Authentication', token: string, user: { __typename?: 'User', id: string } } };


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
export const CreatePostCardImagePostDocument = gql`
    mutation CreatePostCardImagePost($input: ImagePostInput!) {
  createImagePost(input: $input) {
    id
  }
}
    `;
export type CreatePostCardImagePostMutationFn = Apollo.MutationFunction<CreatePostCardImagePostMutation, CreatePostCardImagePostMutationVariables>;

/**
 * __useCreatePostCardImagePostMutation__
 *
 * To run a mutation, you first call `useCreatePostCardImagePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostCardImagePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostCardImagePostMutation, { data, loading, error }] = useCreatePostCardImagePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostCardImagePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostCardImagePostMutation, CreatePostCardImagePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostCardImagePostMutation, CreatePostCardImagePostMutationVariables>(CreatePostCardImagePostDocument, options);
      }
export type CreatePostCardImagePostMutationHookResult = ReturnType<typeof useCreatePostCardImagePostMutation>;
export type CreatePostCardImagePostMutationResult = Apollo.MutationResult<CreatePostCardImagePostMutation>;
export type CreatePostCardImagePostMutationOptions = Apollo.BaseMutationOptions<CreatePostCardImagePostMutation, CreatePostCardImagePostMutationVariables>;
export const EditAvatarDocument = gql`
    mutation EditAvatar($avatarUpload: Upload!) {
  updateMe(input: {avatar: $avatarUpload}) {
    id
    avatarURL
  }
}
    `;
export type EditAvatarMutationFn = Apollo.MutationFunction<EditAvatarMutation, EditAvatarMutationVariables>;

/**
 * __useEditAvatarMutation__
 *
 * To run a mutation, you first call `useEditAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editAvatarMutation, { data, loading, error }] = useEditAvatarMutation({
 *   variables: {
 *      avatarUpload: // value for 'avatarUpload'
 *   },
 * });
 */
export function useEditAvatarMutation(baseOptions?: Apollo.MutationHookOptions<EditAvatarMutation, EditAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditAvatarMutation, EditAvatarMutationVariables>(EditAvatarDocument, options);
      }
export type EditAvatarMutationHookResult = ReturnType<typeof useEditAvatarMutation>;
export type EditAvatarMutationResult = Apollo.MutationResult<EditAvatarMutation>;
export type EditAvatarMutationOptions = Apollo.BaseMutationOptions<EditAvatarMutation, EditAvatarMutationVariables>;
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
export const NavigationDocument = gql`
    query Navigation {
  me {
    id
    firstName
    avatarURL
  }
  notifications {
    id
  }
  friendshipRequests {
    date
    from {
      id
      name
    }
  }
}
    `;

/**
 * __useNavigationQuery__
 *
 * To run a query within a React component, call `useNavigationQuery` and pass it any options that fit your needs.
 * When your component renders, `useNavigationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNavigationQuery({
 *   variables: {
 *   },
 * });
 */
export function useNavigationQuery(baseOptions?: Apollo.QueryHookOptions<NavigationQuery, NavigationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NavigationQuery, NavigationQueryVariables>(NavigationDocument, options);
      }
export function useNavigationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NavigationQuery, NavigationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NavigationQuery, NavigationQueryVariables>(NavigationDocument, options);
        }
export type NavigationQueryHookResult = ReturnType<typeof useNavigationQuery>;
export type NavigationLazyQueryHookResult = ReturnType<typeof useNavigationLazyQuery>;
export type NavigationQueryResult = Apollo.QueryResult<NavigationQuery, NavigationQueryVariables>;
export const NotificationsDocument = gql`
    query Notifications {
  notifications {
    id
    ... on FriendshipRequestNotification {
      from {
        id
        firstName
        avatarURL
      }
      date
    }
    ... on PostLikedNotification {
      liker {
        id
        firstName
        avatarURL
      }
      date
      post {
        id
      }
    }
  }
}
    `;

/**
 * __useNotificationsQuery__
 *
 * To run a query within a React component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
      }
export function useNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
export type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsQueryResult = Apollo.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
export const NotificationsNewNotificationDocument = gql`
    subscription NotificationsNewNotification {
  newNotification {
    id
  }
}
    `;

/**
 * __useNotificationsNewNotificationSubscription__
 *
 * To run a query within a React component, call `useNotificationsNewNotificationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsNewNotificationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsNewNotificationSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNotificationsNewNotificationSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NotificationsNewNotificationSubscription, NotificationsNewNotificationSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NotificationsNewNotificationSubscription, NotificationsNewNotificationSubscriptionVariables>(NotificationsNewNotificationDocument, options);
      }
export type NotificationsNewNotificationSubscriptionHookResult = ReturnType<typeof useNotificationsNewNotificationSubscription>;
export type NotificationsNewNotificationSubscriptionResult = Apollo.SubscriptionResult<NotificationsNewNotificationSubscription>;
export const PostCardCommentPostDocument = gql`
    mutation PostCardCommentPost($postID: ID!, $text: String!) {
  commentPost(id: $postID, text: $text) {
    id
    comments {
      createdAt
      text
      user {
        id
        name
        online
      }
    }
  }
}
    `;
export type PostCardCommentPostMutationFn = Apollo.MutationFunction<PostCardCommentPostMutation, PostCardCommentPostMutationVariables>;

/**
 * __usePostCardCommentPostMutation__
 *
 * To run a mutation, you first call `usePostCardCommentPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostCardCommentPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postCardCommentPostMutation, { data, loading, error }] = usePostCardCommentPostMutation({
 *   variables: {
 *      postID: // value for 'postID'
 *      text: // value for 'text'
 *   },
 * });
 */
export function usePostCardCommentPostMutation(baseOptions?: Apollo.MutationHookOptions<PostCardCommentPostMutation, PostCardCommentPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostCardCommentPostMutation, PostCardCommentPostMutationVariables>(PostCardCommentPostDocument, options);
      }
export type PostCardCommentPostMutationHookResult = ReturnType<typeof usePostCardCommentPostMutation>;
export type PostCardCommentPostMutationResult = Apollo.MutationResult<PostCardCommentPostMutation>;
export type PostCardCommentPostMutationOptions = Apollo.BaseMutationOptions<PostCardCommentPostMutation, PostCardCommentPostMutationVariables>;
export const SearchDocument = gql`
    query Search($query: String!) {
  searchUsers(query: $query) {
    name
    avatarURL
    id
    birthday
  }
}
    `;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchQuery(baseOptions: Apollo.QueryHookOptions<SearchQuery, SearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
      }
export function useSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
        }
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<SearchQuery, SearchQueryVariables>;
export const FriendshipsPageDocument = gql`
    query FriendshipsPage {
  me {
    id
    friends {
      id
      name
      online
    }
  }
  friendshipRecommendations {
    id
    name
    online
    avatarURL
  }
  friendshipRequests {
    id
    date
    from {
      id
      name
      online
      avatarURL
    }
  }
}
    `;

/**
 * __useFriendshipsPageQuery__
 *
 * To run a query within a React component, call `useFriendshipsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendshipsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendshipsPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useFriendshipsPageQuery(baseOptions?: Apollo.QueryHookOptions<FriendshipsPageQuery, FriendshipsPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FriendshipsPageQuery, FriendshipsPageQueryVariables>(FriendshipsPageDocument, options);
      }
export function useFriendshipsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendshipsPageQuery, FriendshipsPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FriendshipsPageQuery, FriendshipsPageQueryVariables>(FriendshipsPageDocument, options);
        }
export type FriendshipsPageQueryHookResult = ReturnType<typeof useFriendshipsPageQuery>;
export type FriendshipsPageLazyQueryHookResult = ReturnType<typeof useFriendshipsPageLazyQuery>;
export type FriendshipsPageQueryResult = Apollo.QueryResult<FriendshipsPageQuery, FriendshipsPageQueryVariables>;
export const FriendsPageAcceptFriendshipRequestDocument = gql`
    mutation FriendsPageAcceptFriendshipRequest($friendshipID: ID!) {
  acceptFriendshipRequest(id: $friendshipID) {
    id
    date
    from {
      id
    }
  }
}
    `;
export type FriendsPageAcceptFriendshipRequestMutationFn = Apollo.MutationFunction<FriendsPageAcceptFriendshipRequestMutation, FriendsPageAcceptFriendshipRequestMutationVariables>;

/**
 * __useFriendsPageAcceptFriendshipRequestMutation__
 *
 * To run a mutation, you first call `useFriendsPageAcceptFriendshipRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFriendsPageAcceptFriendshipRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [friendsPageAcceptFriendshipRequestMutation, { data, loading, error }] = useFriendsPageAcceptFriendshipRequestMutation({
 *   variables: {
 *      friendshipID: // value for 'friendshipID'
 *   },
 * });
 */
export function useFriendsPageAcceptFriendshipRequestMutation(baseOptions?: Apollo.MutationHookOptions<FriendsPageAcceptFriendshipRequestMutation, FriendsPageAcceptFriendshipRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FriendsPageAcceptFriendshipRequestMutation, FriendsPageAcceptFriendshipRequestMutationVariables>(FriendsPageAcceptFriendshipRequestDocument, options);
      }
export type FriendsPageAcceptFriendshipRequestMutationHookResult = ReturnType<typeof useFriendsPageAcceptFriendshipRequestMutation>;
export type FriendsPageAcceptFriendshipRequestMutationResult = Apollo.MutationResult<FriendsPageAcceptFriendshipRequestMutation>;
export type FriendsPageAcceptFriendshipRequestMutationOptions = Apollo.BaseMutationOptions<FriendsPageAcceptFriendshipRequestMutation, FriendsPageAcceptFriendshipRequestMutationVariables>;
export const HomePagePostsDocument = gql`
    query HomePagePosts {
  me {
    id
    name
    online
  }
  posts {
    __typename
    id
    text
    createdAt
    liked
    user {
      id
      online
      avatarURL
      name
    }
    likedBy {
      id
      firstName
    }
    comments {
      text
      createdAt
      user {
        avatarURL
        id
        name
        online
      }
    }
    ... on ImagePost {
      imageURL
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
export const LoginPageDocument = gql`
    query LoginPage($googleRedirectURL: String!) {
  googleOAuthURL(redirectURL: $googleRedirectURL)
}
    `;

/**
 * __useLoginPageQuery__
 *
 * To run a query within a React component, call `useLoginPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginPageQuery({
 *   variables: {
 *      googleRedirectURL: // value for 'googleRedirectURL'
 *   },
 * });
 */
export function useLoginPageQuery(baseOptions: Apollo.QueryHookOptions<LoginPageQuery, LoginPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginPageQuery, LoginPageQueryVariables>(LoginPageDocument, options);
      }
export function useLoginPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginPageQuery, LoginPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginPageQuery, LoginPageQueryVariables>(LoginPageDocument, options);
        }
export type LoginPageQueryHookResult = ReturnType<typeof useLoginPageQuery>;
export type LoginPageLazyQueryHookResult = ReturnType<typeof useLoginPageLazyQuery>;
export type LoginPageQueryResult = Apollo.QueryResult<LoginPageQuery, LoginPageQueryVariables>;
export const ProfileDetailPageDocument = gql`
    query ProfileDetailPage($userID: ID!) {
  user(id: $userID) {
    id
    name
    status
    online
    birthday
    friendshipStatus
    avatarURL
    city
    hobbies
    job {
      company
      position
    }
    friends {
      id
      name
      online
    }
  }
  posts: postsOfUser(id: $userID) {
    __typename
    id
    text
    createdAt
    liked
    user {
      id
      online
      avatarURL
      name
    }
    likedBy {
      id
      firstName
    }
    comments {
      text
      createdAt
      user {
        avatarURL
        id
        name
        online
      }
    }
    ... on ImagePost {
      imageURL
    }
  }
  me {
    id
    name
    online
  }
}
    `;

/**
 * __useProfileDetailPageQuery__
 *
 * To run a query within a React component, call `useProfileDetailPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileDetailPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileDetailPageQuery({
 *   variables: {
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useProfileDetailPageQuery(baseOptions: Apollo.QueryHookOptions<ProfileDetailPageQuery, ProfileDetailPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileDetailPageQuery, ProfileDetailPageQueryVariables>(ProfileDetailPageDocument, options);
      }
export function useProfileDetailPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileDetailPageQuery, ProfileDetailPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileDetailPageQuery, ProfileDetailPageQueryVariables>(ProfileDetailPageDocument, options);
        }
export type ProfileDetailPageQueryHookResult = ReturnType<typeof useProfileDetailPageQuery>;
export type ProfileDetailPageLazyQueryHookResult = ReturnType<typeof useProfileDetailPageLazyQuery>;
export type ProfileDetailPageQueryResult = Apollo.QueryResult<ProfileDetailPageQuery, ProfileDetailPageQueryVariables>;
export const ProfileDetailPageRequestFriendshipDocument = gql`
    mutation ProfileDetailPageRequestFriendship($userID: ID!) {
  requestFriendship(id: $userID) {
    id
    to {
      id
      friendshipStatus
    }
  }
}
    `;
export type ProfileDetailPageRequestFriendshipMutationFn = Apollo.MutationFunction<ProfileDetailPageRequestFriendshipMutation, ProfileDetailPageRequestFriendshipMutationVariables>;

/**
 * __useProfileDetailPageRequestFriendshipMutation__
 *
 * To run a mutation, you first call `useProfileDetailPageRequestFriendshipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProfileDetailPageRequestFriendshipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [profileDetailPageRequestFriendshipMutation, { data, loading, error }] = useProfileDetailPageRequestFriendshipMutation({
 *   variables: {
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useProfileDetailPageRequestFriendshipMutation(baseOptions?: Apollo.MutationHookOptions<ProfileDetailPageRequestFriendshipMutation, ProfileDetailPageRequestFriendshipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProfileDetailPageRequestFriendshipMutation, ProfileDetailPageRequestFriendshipMutationVariables>(ProfileDetailPageRequestFriendshipDocument, options);
      }
export type ProfileDetailPageRequestFriendshipMutationHookResult = ReturnType<typeof useProfileDetailPageRequestFriendshipMutation>;
export type ProfileDetailPageRequestFriendshipMutationResult = Apollo.MutationResult<ProfileDetailPageRequestFriendshipMutation>;
export type ProfileDetailPageRequestFriendshipMutationOptions = Apollo.BaseMutationOptions<ProfileDetailPageRequestFriendshipMutation, ProfileDetailPageRequestFriendshipMutationVariables>;
export const ProfileMeDocument = gql`
    query ProfileMe {
  me {
    id
    avatarURL
    firstName
    lastName
    name
    birthday
    online
    friends {
      id
      online
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
export const RegisterGooglePageRegisterDocument = gql`
    mutation RegisterGooglePageRegister($code: String!, $redirectURL: String!) {
  authenticateWithGoogle(code: $code, redirectURL: $redirectURL) {
    user {
      id
    }
    token
  }
}
    `;
export type RegisterGooglePageRegisterMutationFn = Apollo.MutationFunction<RegisterGooglePageRegisterMutation, RegisterGooglePageRegisterMutationVariables>;

/**
 * __useRegisterGooglePageRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterGooglePageRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterGooglePageRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerGooglePageRegisterMutation, { data, loading, error }] = useRegisterGooglePageRegisterMutation({
 *   variables: {
 *      code: // value for 'code'
 *      redirectURL: // value for 'redirectURL'
 *   },
 * });
 */
export function useRegisterGooglePageRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterGooglePageRegisterMutation, RegisterGooglePageRegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterGooglePageRegisterMutation, RegisterGooglePageRegisterMutationVariables>(RegisterGooglePageRegisterDocument, options);
      }
export type RegisterGooglePageRegisterMutationHookResult = ReturnType<typeof useRegisterGooglePageRegisterMutation>;
export type RegisterGooglePageRegisterMutationResult = Apollo.MutationResult<RegisterGooglePageRegisterMutation>;
export type RegisterGooglePageRegisterMutationOptions = Apollo.BaseMutationOptions<RegisterGooglePageRegisterMutation, RegisterGooglePageRegisterMutationVariables>;