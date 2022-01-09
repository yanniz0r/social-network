import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Comment = {
  __typename?: "Comment";
  createdAt: Scalars["Date"];
  text: Scalars["String"];
  user: User;
};

export type FriendshipRequest = {
  __typename?: "FriendshipRequest";
  date: Scalars["Date"];
  from: User;
  id: Scalars["ID"];
};

export type Mutation = {
  __typename?: "Mutation";
  acceptFriendshipRequest: FriendshipRequest;
  commentPost: Post;
  createTextPost: TextPost;
  likePost: Post;
  unlikePost: Post;
};

export type MutationAcceptFriendshipRequestArgs = {
  id: Scalars["ID"];
};

export type MutationCommentPostArgs = {
  id: Scalars["ID"];
  text: Scalars["String"];
};

export type MutationCreateTextPostArgs = {
  input: TextPostInput;
};

export type MutationLikePostArgs = {
  id: Scalars["ID"];
};

export type MutationUnlikePostArgs = {
  id: Scalars["ID"];
};

export type Post = {
  comments: Array<Comment>;
  createdAt: Scalars["Date"];
  id: Scalars["ID"];
  liked: Scalars["Boolean"];
  likedBy: Array<User>;
  text?: Maybe<Scalars["String"]>;
  user: User;
};

export type Query = {
  __typename?: "Query";
  friendshipRequests: Array<FriendshipRequest>;
  me: User;
  posts: Array<Post>;
  user?: Maybe<User>;
};

export type QueryUserArgs = {
  id: Scalars["ID"];
};

export type TextPost = Post & {
  __typename?: "TextPost";
  comments: Array<Comment>;
  createdAt: Scalars["Date"];
  id: Scalars["ID"];
  liked: Scalars["Boolean"];
  likedBy: Array<User>;
  text: Scalars["String"];
  user: User;
};

export type TextPostInput = {
  text: Scalars["String"];
};

export type User = {
  __typename?: "User";
  birthday?: Maybe<Scalars["Date"]>;
  firstName: Scalars["String"];
  friends: Array<User>;
  id: Scalars["ID"];
  lastName: Scalars["String"];
  name: Scalars["String"];
  online: Scalars["Boolean"];
  status?: Maybe<Scalars["String"]>;
};

export type CreatePostCardTextPostMutationVariables = Exact<{
  input: TextPostInput;
}>;

export type CreatePostCardTextPostMutation = {
  __typename?: "Mutation";
  createTextPost: { __typename?: "TextPost"; id: string };
};

export type LikeButtonLikeMutationVariables = Exact<{
  postID: Scalars["ID"];
}>;

export type LikeButtonLikeMutation = {
  __typename?: "Mutation";
  likePost: {
    __typename?: "TextPost";
    id: string;
    liked: boolean;
    likedBy: Array<{ __typename?: "User"; id: string }>;
  };
};

export type LikeButtonUnlikeMutationVariables = Exact<{
  postID: Scalars["ID"];
}>;

export type LikeButtonUnlikeMutation = {
  __typename?: "Mutation";
  unlikePost: {
    __typename?: "TextPost";
    id: string;
    liked: boolean;
    likedBy: Array<{ __typename?: "User"; id: string }>;
  };
};

export type NavigationQueryVariables = Exact<{ [key: string]: never }>;

export type NavigationQuery = {
  __typename?: "Query";
  friendshipRequests: Array<{
    __typename?: "FriendshipRequest";
    date: any;
    from: { __typename?: "User"; id: string; name: string };
  }>;
};

export type PostCardCommentPostMutationVariables = Exact<{
  postID: Scalars["ID"];
  text: Scalars["String"];
}>;

export type PostCardCommentPostMutation = {
  __typename?: "Mutation";
  commentPost: {
    __typename?: "TextPost";
    id: string;
    comments: Array<{
      __typename?: "Comment";
      createdAt: any;
      text: string;
      user: { __typename?: "User"; id: string; name: string; online: boolean };
    }>;
  };
};

export type FriendshipsPageQueryVariables = Exact<{ [key: string]: never }>;

export type FriendshipsPageQuery = {
  __typename?: "Query";
  me: {
    __typename?: "User";
    id: string;
    friends: Array<{
      __typename?: "User";
      id: string;
      name: string;
      online: boolean;
    }>;
  };
  friendshipRequests: Array<{
    __typename?: "FriendshipRequest";
    id: string;
    date: any;
    from: { __typename?: "User"; id: string; name: string; online: boolean };
  }>;
};

export type FriendsPageAcceptFriendshipRequestMutationVariables = Exact<{
  friendshipID: Scalars["ID"];
}>;

export type FriendsPageAcceptFriendshipRequestMutation = {
  __typename?: "Mutation";
  acceptFriendshipRequest: {
    __typename?: "FriendshipRequest";
    id: string;
    date: any;
    from: { __typename?: "User"; id: string };
  };
};

export type HomePagePostsQueryVariables = Exact<{ [key: string]: never }>;

export type HomePagePostsQuery = {
  __typename?: "Query";
  me: { __typename?: "User"; id: string; name: string; online: boolean };
  posts: Array<{
    __typename?: "TextPost";
    id: string;
    text: string;
    createdAt: any;
    liked: boolean;
    user: { __typename?: "User"; id: string; name: string };
    likedBy: Array<{ __typename?: "User"; id: string; firstName: string }>;
    comments: Array<{
      __typename?: "Comment";
      text: string;
      createdAt: any;
      user: { __typename?: "User"; id: string; name: string; online: boolean };
    }>;
  }>;
};

export type ProfileDetailPageQueryVariables = Exact<{
  userID: Scalars["ID"];
}>;

export type ProfileDetailPageQuery = {
  __typename?: "Query";
  user?:
    | {
        __typename?: "User";
        id: string;
        name: string;
        status?: string | null | undefined;
        online: boolean;
        birthday?: any | null | undefined;
        friends: Array<{
          __typename?: "User";
          id: string;
          name: string;
          online: boolean;
        }>;
      }
    | null
    | undefined;
};

export type ProfileMeQueryVariables = Exact<{ [key: string]: never }>;

export type ProfileMeQuery = {
  __typename?: "Query";
  me: {
    __typename?: "User";
    id: string;
    firstName: string;
    lastName: string;
    name: string;
    birthday?: any | null | undefined;
    online: boolean;
    friends: Array<{ __typename?: "User"; id: string; name: string }>;
  };
};

export const CreatePostCardTextPostDocument = gql`
  mutation CreatePostCardTextPost($input: TextPostInput!) {
    createTextPost(input: $input) {
      id
    }
  }
`;
export type CreatePostCardTextPostMutationFn = Apollo.MutationFunction<
  CreatePostCardTextPostMutation,
  CreatePostCardTextPostMutationVariables
>;

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
export function useCreatePostCardTextPostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePostCardTextPostMutation,
    CreatePostCardTextPostMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreatePostCardTextPostMutation,
    CreatePostCardTextPostMutationVariables
  >(CreatePostCardTextPostDocument, options);
}
export type CreatePostCardTextPostMutationHookResult = ReturnType<
  typeof useCreatePostCardTextPostMutation
>;
export type CreatePostCardTextPostMutationResult =
  Apollo.MutationResult<CreatePostCardTextPostMutation>;
export type CreatePostCardTextPostMutationOptions = Apollo.BaseMutationOptions<
  CreatePostCardTextPostMutation,
  CreatePostCardTextPostMutationVariables
>;
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
export type LikeButtonLikeMutationFn = Apollo.MutationFunction<
  LikeButtonLikeMutation,
  LikeButtonLikeMutationVariables
>;

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
export function useLikeButtonLikeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LikeButtonLikeMutation,
    LikeButtonLikeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    LikeButtonLikeMutation,
    LikeButtonLikeMutationVariables
  >(LikeButtonLikeDocument, options);
}
export type LikeButtonLikeMutationHookResult = ReturnType<
  typeof useLikeButtonLikeMutation
>;
export type LikeButtonLikeMutationResult =
  Apollo.MutationResult<LikeButtonLikeMutation>;
export type LikeButtonLikeMutationOptions = Apollo.BaseMutationOptions<
  LikeButtonLikeMutation,
  LikeButtonLikeMutationVariables
>;
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
export type LikeButtonUnlikeMutationFn = Apollo.MutationFunction<
  LikeButtonUnlikeMutation,
  LikeButtonUnlikeMutationVariables
>;

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
export function useLikeButtonUnlikeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LikeButtonUnlikeMutation,
    LikeButtonUnlikeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    LikeButtonUnlikeMutation,
    LikeButtonUnlikeMutationVariables
  >(LikeButtonUnlikeDocument, options);
}
export type LikeButtonUnlikeMutationHookResult = ReturnType<
  typeof useLikeButtonUnlikeMutation
>;
export type LikeButtonUnlikeMutationResult =
  Apollo.MutationResult<LikeButtonUnlikeMutation>;
export type LikeButtonUnlikeMutationOptions = Apollo.BaseMutationOptions<
  LikeButtonUnlikeMutation,
  LikeButtonUnlikeMutationVariables
>;
export const NavigationDocument = gql`
  query Navigation {
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
export function useNavigationQuery(
  baseOptions?: Apollo.QueryHookOptions<
    NavigationQuery,
    NavigationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<NavigationQuery, NavigationQueryVariables>(
    NavigationDocument,
    options
  );
}
export function useNavigationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    NavigationQuery,
    NavigationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<NavigationQuery, NavigationQueryVariables>(
    NavigationDocument,
    options
  );
}
export type NavigationQueryHookResult = ReturnType<typeof useNavigationQuery>;
export type NavigationLazyQueryHookResult = ReturnType<
  typeof useNavigationLazyQuery
>;
export type NavigationQueryResult = Apollo.QueryResult<
  NavigationQuery,
  NavigationQueryVariables
>;
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
export type PostCardCommentPostMutationFn = Apollo.MutationFunction<
  PostCardCommentPostMutation,
  PostCardCommentPostMutationVariables
>;

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
export function usePostCardCommentPostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PostCardCommentPostMutation,
    PostCardCommentPostMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    PostCardCommentPostMutation,
    PostCardCommentPostMutationVariables
  >(PostCardCommentPostDocument, options);
}
export type PostCardCommentPostMutationHookResult = ReturnType<
  typeof usePostCardCommentPostMutation
>;
export type PostCardCommentPostMutationResult =
  Apollo.MutationResult<PostCardCommentPostMutation>;
export type PostCardCommentPostMutationOptions = Apollo.BaseMutationOptions<
  PostCardCommentPostMutation,
  PostCardCommentPostMutationVariables
>;
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
    friendshipRequests {
      id
      date
      from {
        id
        name
        online
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
export function useFriendshipsPageQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FriendshipsPageQuery,
    FriendshipsPageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FriendshipsPageQuery, FriendshipsPageQueryVariables>(
    FriendshipsPageDocument,
    options
  );
}
export function useFriendshipsPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FriendshipsPageQuery,
    FriendshipsPageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FriendshipsPageQuery,
    FriendshipsPageQueryVariables
  >(FriendshipsPageDocument, options);
}
export type FriendshipsPageQueryHookResult = ReturnType<
  typeof useFriendshipsPageQuery
>;
export type FriendshipsPageLazyQueryHookResult = ReturnType<
  typeof useFriendshipsPageLazyQuery
>;
export type FriendshipsPageQueryResult = Apollo.QueryResult<
  FriendshipsPageQuery,
  FriendshipsPageQueryVariables
>;
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
export type FriendsPageAcceptFriendshipRequestMutationFn =
  Apollo.MutationFunction<
    FriendsPageAcceptFriendshipRequestMutation,
    FriendsPageAcceptFriendshipRequestMutationVariables
  >;

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
export function useFriendsPageAcceptFriendshipRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    FriendsPageAcceptFriendshipRequestMutation,
    FriendsPageAcceptFriendshipRequestMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    FriendsPageAcceptFriendshipRequestMutation,
    FriendsPageAcceptFriendshipRequestMutationVariables
  >(FriendsPageAcceptFriendshipRequestDocument, options);
}
export type FriendsPageAcceptFriendshipRequestMutationHookResult = ReturnType<
  typeof useFriendsPageAcceptFriendshipRequestMutation
>;
export type FriendsPageAcceptFriendshipRequestMutationResult =
  Apollo.MutationResult<FriendsPageAcceptFriendshipRequestMutation>;
export type FriendsPageAcceptFriendshipRequestMutationOptions =
  Apollo.BaseMutationOptions<
    FriendsPageAcceptFriendshipRequestMutation,
    FriendsPageAcceptFriendshipRequestMutationVariables
  >;
export const HomePagePostsDocument = gql`
  query HomePagePosts {
    me {
      id
      name
      online
    }
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
      comments {
        text
        createdAt
        user {
          id
          name
          online
        }
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
export function useHomePagePostsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    HomePagePostsQuery,
    HomePagePostsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<HomePagePostsQuery, HomePagePostsQueryVariables>(
    HomePagePostsDocument,
    options
  );
}
export function useHomePagePostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    HomePagePostsQuery,
    HomePagePostsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<HomePagePostsQuery, HomePagePostsQueryVariables>(
    HomePagePostsDocument,
    options
  );
}
export type HomePagePostsQueryHookResult = ReturnType<
  typeof useHomePagePostsQuery
>;
export type HomePagePostsLazyQueryHookResult = ReturnType<
  typeof useHomePagePostsLazyQuery
>;
export type HomePagePostsQueryResult = Apollo.QueryResult<
  HomePagePostsQuery,
  HomePagePostsQueryVariables
>;
export const ProfileDetailPageDocument = gql`
  query ProfileDetailPage($userID: ID!) {
    user(id: $userID) {
      id
      name
      status
      online
      birthday
      friends {
        id
        name
        online
      }
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
export function useProfileDetailPageQuery(
  baseOptions: Apollo.QueryHookOptions<
    ProfileDetailPageQuery,
    ProfileDetailPageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ProfileDetailPageQuery,
    ProfileDetailPageQueryVariables
  >(ProfileDetailPageDocument, options);
}
export function useProfileDetailPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProfileDetailPageQuery,
    ProfileDetailPageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ProfileDetailPageQuery,
    ProfileDetailPageQueryVariables
  >(ProfileDetailPageDocument, options);
}
export type ProfileDetailPageQueryHookResult = ReturnType<
  typeof useProfileDetailPageQuery
>;
export type ProfileDetailPageLazyQueryHookResult = ReturnType<
  typeof useProfileDetailPageLazyQuery
>;
export type ProfileDetailPageQueryResult = Apollo.QueryResult<
  ProfileDetailPageQuery,
  ProfileDetailPageQueryVariables
>;
export const ProfileMeDocument = gql`
  query ProfileMe {
    me {
      id
      firstName
      lastName
      name
      birthday
      online
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
export function useProfileMeQuery(
  baseOptions?: Apollo.QueryHookOptions<ProfileMeQuery, ProfileMeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProfileMeQuery, ProfileMeQueryVariables>(
    ProfileMeDocument,
    options
  );
}
export function useProfileMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProfileMeQuery,
    ProfileMeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProfileMeQuery, ProfileMeQueryVariables>(
    ProfileMeDocument,
    options
  );
}
export type ProfileMeQueryHookResult = ReturnType<typeof useProfileMeQuery>;
export type ProfileMeLazyQueryHookResult = ReturnType<
  typeof useProfileMeLazyQuery
>;
export type ProfileMeQueryResult = Apollo.QueryResult<
  ProfileMeQuery,
  ProfileMeQueryVariables
>;
