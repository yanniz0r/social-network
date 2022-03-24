import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { UserModel, FriendshipModel } from '../repositories/user-repository';
import { PostModel } from '../repositories/post-repository';
import { PostComment } from '../types/post';
import { NotificationModel, FriendshipRequestNotificationModel, PostLikedNotificationModel } from '../repositories/notification-repository';
import { Context } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  deletePost?: Maybe<Scalars['Boolean']>;
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


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
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
  myPosts: Array<Post>;
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
  birthday?: InputMaybe<Scalars['Date']>;
  hobbys?: InputMaybe<Array<Scalars['String']>>;
  jobCompany?: InputMaybe<Scalars['String']>;
  jobPosition?: InputMaybe<Scalars['String']>;
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Authentication: ResolverTypeWrapper<Omit<Authentication, 'user'> & { user: ResolversTypes['User'] }>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Comment: ResolverTypeWrapper<PostComment>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  FriendshipRequest: ResolverTypeWrapper<FriendshipModel>;
  FriendshipRequestNotification: ResolverTypeWrapper<FriendshipRequestNotificationModel>;
  FriendshipStatus: FriendshipStatus;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  ImagePost: ResolverTypeWrapper<PostModel>;
  ImagePostInput: ImagePostInput;
  Mutation: ResolverTypeWrapper<{}>;
  Notification: ResolverTypeWrapper<NotificationModel>;
  Post: ResolverTypeWrapper<PostModel>;
  PostLikedNotification: ResolverTypeWrapper<PostLikedNotificationModel>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  TextPost: ResolverTypeWrapper<PostModel>;
  TextPostInput: TextPostInput;
  UpdateMeInput: UpdateMeInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<UserModel>;
  UserJob: ResolverTypeWrapper<UserJob>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Authentication: Omit<Authentication, 'user'> & { user: ResolversParentTypes['User'] };
  Boolean: Scalars['Boolean'];
  Comment: PostComment;
  Date: Scalars['Date'];
  FriendshipRequest: FriendshipModel;
  FriendshipRequestNotification: FriendshipRequestNotificationModel;
  ID: Scalars['ID'];
  ImagePost: PostModel;
  ImagePostInput: ImagePostInput;
  Mutation: {};
  Notification: NotificationModel;
  Post: PostModel;
  PostLikedNotification: PostLikedNotificationModel;
  Query: {};
  String: Scalars['String'];
  Subscription: {};
  TextPost: PostModel;
  TextPostInput: TextPostInput;
  UpdateMeInput: UpdateMeInput;
  Upload: Scalars['Upload'];
  User: UserModel;
  UserJob: UserJob;
};

export type AuthenticationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Authentication'] = ResolversParentTypes['Authentication']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type FriendshipRequestResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FriendshipRequest'] = ResolversParentTypes['FriendshipRequest']> = {
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FriendshipRequestNotificationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FriendshipRequestNotification'] = ResolversParentTypes['FriendshipRequestNotification']> = {
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImagePostResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ImagePost'] = ResolversParentTypes['ImagePost']> = {
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageURL?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  liked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  likedBy?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  acceptFriendshipRequest?: Resolver<ResolversTypes['FriendshipRequest'], ParentType, ContextType, RequireFields<MutationAcceptFriendshipRequestArgs, 'id'>>;
  authenticateWithGoogle?: Resolver<ResolversTypes['Authentication'], ParentType, ContextType, RequireFields<MutationAuthenticateWithGoogleArgs, 'code' | 'redirectURL'>>;
  commentPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCommentPostArgs, 'id' | 'text'>>;
  createImagePost?: Resolver<ResolversTypes['ImagePost'], ParentType, ContextType, RequireFields<MutationCreateImagePostArgs, 'input'>>;
  createTextPost?: Resolver<ResolversTypes['TextPost'], ParentType, ContextType, RequireFields<MutationCreateTextPostArgs, 'input'>>;
  deletePost?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>;
  likePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationLikePostArgs, 'id'>>;
  requestFriendship?: Resolver<ResolversTypes['FriendshipRequest'], ParentType, ContextType, RequireFields<MutationRequestFriendshipArgs, 'id'>>;
  unlikePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationUnlikePostArgs, 'id'>>;
  updateMe?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateMeArgs, 'input'>>;
};

export type NotificationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Notification'] = ResolversParentTypes['Notification']> = {
  __resolveType: TypeResolveFn<'FriendshipRequestNotification' | 'PostLikedNotification', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type PostResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  __resolveType: TypeResolveFn<'ImagePost' | 'TextPost', ParentType, ContextType>;
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  liked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  likedBy?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type PostLikedNotificationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostLikedNotification'] = ResolversParentTypes['PostLikedNotification']> = {
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  liker?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  friendshipRecommendations?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  friendshipRequests?: Resolver<Array<ResolversTypes['FriendshipRequest']>, ParentType, ContextType>;
  googleOAuthURL?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<QueryGoogleOAuthUrlArgs, 'redirectURL'>>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  myPosts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  notifications?: Resolver<Array<ResolversTypes['Notification']>, ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  postsOfUser?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostsOfUserArgs, 'id'>>;
  searchUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QuerySearchUsersArgs, 'query'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
};

export type SubscriptionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  newNotification?: SubscriptionResolver<ResolversTypes['Notification'], "newNotification", ParentType, ContextType>;
};

export type TextPostResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TextPost'] = ResolversParentTypes['TextPost']> = {
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  liked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  likedBy?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  avatarURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  birthday?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  friends?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  friendshipStatus?: Resolver<Maybe<ResolversTypes['FriendshipStatus']>, ParentType, ContextType>;
  hobbies?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  job?: Resolver<Maybe<ResolversTypes['UserJob']>, ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  online?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserJobResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserJob'] = ResolversParentTypes['UserJob']> = {
  company?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Authentication?: AuthenticationResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Date?: GraphQLScalarType;
  FriendshipRequest?: FriendshipRequestResolvers<ContextType>;
  FriendshipRequestNotification?: FriendshipRequestNotificationResolvers<ContextType>;
  ImagePost?: ImagePostResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Notification?: NotificationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostLikedNotification?: PostLikedNotificationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  TextPost?: TextPostResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserJob?: UserJobResolvers<ContextType>;
};

