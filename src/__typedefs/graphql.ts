import { GraphQLResolveInfo } from 'graphql'
export type Maybe<T> = T | null
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type BubbleData = {
  __typename?: 'BubbleData'
  nodes?: Maybe<Array<Maybe<Scalars['String']>>>
  links?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type Epic = {
  __typename?: 'Epic'
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  features?: Maybe<Array<Maybe<Scalars['String']>>>
  featureCount?: Maybe<Scalars['Int']>
}

export type FeatureGraph = {
  __typename?: 'FeatureGraph'
  id?: Maybe<Scalars['String']>
  bubbleData?: Maybe<BubbleData>
  quadData?: Maybe<QuadData>
  epic?: Maybe<Scalars['String']>
  system?: Maybe<Scalars['String']>
  agreedDependencies?: Maybe<Array<Maybe<Scalars['String']>>>
  inferredDependencies?: Maybe<Array<Maybe<Scalars['String']>>>
  featureName?: Maybe<Scalars['String']>
  market?: Maybe<Scalars['String']>
  cluster?: Maybe<Scalars['String']>
  crossFunctionalTeam?: Maybe<Scalars['String']>
  pod?: Maybe<Scalars['String']>
  users?: Maybe<Array<Maybe<Scalars['String']>>>
  dueDate?: Maybe<Scalars['String']>
  primaryFeature?: Maybe<Scalars['Boolean']>
}

export type QuadData = {
  __typename?: 'QuadData'
  xCat?: Maybe<Scalars['String']>
  yCat?: Maybe<Scalars['String']>
  ragStatus?: Maybe<Scalars['String']>
  rCat?: Maybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  _empty?: Maybe<Scalars['String']>
  featureGraphs: Array<Maybe<FeatureGraph>>
  featureGraph?: Maybe<FeatureGraph>
}

export type QueryFeatureGraphArgs = {
  id: Scalars['ID']
}

export type System = {
  __typename?: 'System'
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  features?: Maybe<Array<Maybe<Scalars['String']>>>
  featureCount?: Maybe<Scalars['Int']>
}

export type TimelineData = {
  __typename?: 'TimelineData'
  label?: Maybe<Scalars['String']>
}

export type User = {
  __typename?: 'User'
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>
  String: ResolverTypeWrapper<Scalars['String']>
  FeatureGraph: ResolverTypeWrapper<FeatureGraph>
  BubbleData: ResolverTypeWrapper<BubbleData>
  QuadData: ResolverTypeWrapper<QuadData>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  ID: ResolverTypeWrapper<Scalars['ID']>
  Epic: ResolverTypeWrapper<Epic>
  Int: ResolverTypeWrapper<Scalars['Int']>
  System: ResolverTypeWrapper<System>
  TimelineData: ResolverTypeWrapper<TimelineData>
  User: ResolverTypeWrapper<User>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  String: Scalars['String']
  FeatureGraph: FeatureGraph
  BubbleData: BubbleData
  QuadData: QuadData
  Boolean: Scalars['Boolean']
  ID: Scalars['ID']
  Epic: Epic
  Int: Scalars['Int']
  System: System
  TimelineData: TimelineData
  User: User
}

export type BubbleDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['BubbleData'] = ResolversParentTypes['BubbleData']
> = {
  nodes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['String']>>>,
    ParentType,
    ContextType
  >
  links?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['String']>>>,
    ParentType,
    ContextType
  >
}

export type EpicResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Epic'] = ResolversParentTypes['Epic']
> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  features?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['String']>>>,
    ParentType,
    ContextType
  >
  featureCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
}

export type FeatureGraphResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FeatureGraph'] = ResolversParentTypes['FeatureGraph']
> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  bubbleData?: Resolver<
    Maybe<ResolversTypes['BubbleData']>,
    ParentType,
    ContextType
  >
  quadData?: Resolver<
    Maybe<ResolversTypes['QuadData']>,
    ParentType,
    ContextType
  >
  epic?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  system?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  agreedDependencies?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['String']>>>,
    ParentType,
    ContextType
  >
  inferredDependencies?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['String']>>>,
    ParentType,
    ContextType
  >
  featureName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  market?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  cluster?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  crossFunctionalTeam?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  pod?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  users?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['String']>>>,
    ParentType,
    ContextType
  >
  dueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  primaryFeature?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
}

export type QuadDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['QuadData'] = ResolversParentTypes['QuadData']
> = {
  xCat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  yCat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  ragStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  rCat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  featureGraphs?: Resolver<
    Array<Maybe<ResolversTypes['FeatureGraph']>>,
    ParentType,
    ContextType
  >
  featureGraph?: Resolver<
    Maybe<ResolversTypes['FeatureGraph']>,
    ParentType,
    ContextType,
    RequireFields<QueryFeatureGraphArgs, 'id'>
  >
}

export type SystemResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['System'] = ResolversParentTypes['System']
> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  features?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['String']>>>,
    ParentType,
    ContextType
  >
  featureCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
}

export type TimelineDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TimelineData'] = ResolversParentTypes['TimelineData']
> = {
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  BubbleData?: BubbleDataResolvers<ContextType>
  Epic?: EpicResolvers<ContextType>
  FeatureGraph?: FeatureGraphResolvers<ContextType>
  QuadData?: QuadDataResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  System?: SystemResolvers<ContextType>
  TimelineData?: TimelineDataResolvers<ContextType>
  User?: UserResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
