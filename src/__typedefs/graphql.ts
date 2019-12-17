import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from 'graphql'
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** Date custom scalar type */
  Date: any
}

export type _TimelineData = {
  __typename?: '_TimelineData'
  label?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  customClass?: Maybe<Scalars['String']>
  at?: Maybe<Scalars['Date']>
}

export type BubbleData = {
  __typename?: 'BubbleData'
  nodes?: Maybe<Array<Maybe<BubbleNode>>>
  links?: Maybe<Array<Maybe<BubbleLink>>>
}

export type BubbleLink = {
  __typename?: 'BubbleLink'
  source?: Maybe<Scalars['String']>
  target?: Maybe<Scalars['String']>
}

export type BubbleNode = {
  __typename?: 'BubbleNode'
  id?: Maybe<Scalars['String']>
  agreedDependencies?: Maybe<Array<Maybe<Scalars['String']>>>
  primaryFeature?: Maybe<Scalars['String']>
  group?: Maybe<Scalars['String']>
  colour?: Maybe<Scalars['String']>
}

export type Epic = {
  __typename?: 'Epic'
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  features?: Maybe<Array<Maybe<Scalars['String']>>>
  featureCount?: Maybe<Scalars['Int']>
}

export type Feature = {
  __typename?: 'Feature'
  id?: Maybe<Scalars['String']>
  featureName?: Maybe<Scalars['String']>
  epic?: Maybe<Scalars['String']>
  system?: Maybe<Scalars['String']>
  market?: Maybe<Scalars['String']>
  cluster?: Maybe<Scalars['String']>
  crossFunctionalTeam?: Maybe<Scalars['String']>
  pod?: Maybe<Scalars['String']>
  agreedDependencies?: Maybe<Array<Maybe<Scalars['String']>>>
  inferredDependencies?: Maybe<Array<Maybe<Scalars['String']>>>
  users?: Maybe<Array<Maybe<Scalars['String']>>>
  dueDate?: Maybe<Scalars['Date']>
  primaryFeature?: Maybe<Scalars['Boolean']>
  xCat?: Maybe<Scalars['String']>
  yCat?: Maybe<Scalars['String']>
  ragStatus?: Maybe<Scalars['String']>
  rCat?: Maybe<Scalars['String']>
  colour?: Maybe<Scalars['String']>
  budget?: Maybe<Scalars['String']>
}

export type FeatureGraphs = {
  __typename?: 'FeatureGraphs'
  features?: Maybe<Array<Maybe<Feature>>>
  bubbleFeatures?: Maybe<BubbleData>
  quadFeatures?: Maybe<Array<Maybe<QuadData>>>
  timelineFeatures?: Maybe<Array<Maybe<TimelineData>>>
}

export type QuadData = {
  __typename?: 'QuadData'
  id?: Maybe<Scalars['String']>
  xCat?: Maybe<Scalars['String']>
  yCat?: Maybe<Scalars['String']>
  ragStatus?: Maybe<Scalars['String']>
  rCat?: Maybe<Scalars['String']>
  featureName?: Maybe<Scalars['String']>
  primaryFeature?: Maybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  _empty?: Maybe<Scalars['String']>
  featureGraphs: FeatureGraphs
  testIssues?: Maybe<Array<Maybe<TestIssue>>>
}

export type System = {
  __typename?: 'System'
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  features?: Maybe<Array<Maybe<Scalars['String']>>>
  featureCount?: Maybe<Scalars['Int']>
}

export type TestIssue = {
  __typename?: 'TestIssue'
  issuekey?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  storypoint?: Maybe<Scalars['String']>
  project?: Maybe<Scalars['String']>
  dependencies?: Maybe<Array<Maybe<TestIssue>>>
}

export type TimelineData = {
  __typename?: 'TimelineData'
  label?: Maybe<Scalars['String']>
  data?: Maybe<Array<Maybe<_TimelineData>>>
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
  FeatureGraphs: ResolverTypeWrapper<FeatureGraphs>
  Feature: ResolverTypeWrapper<Feature>
  Date: ResolverTypeWrapper<Scalars['Date']>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  BubbleData: ResolverTypeWrapper<BubbleData>
  BubbleNode: ResolverTypeWrapper<BubbleNode>
  BubbleLink: ResolverTypeWrapper<BubbleLink>
  QuadData: ResolverTypeWrapper<QuadData>
  TimelineData: ResolverTypeWrapper<TimelineData>
  _TimelineData: ResolverTypeWrapper<_TimelineData>
  TestIssue: ResolverTypeWrapper<TestIssue>
  Epic: ResolverTypeWrapper<Epic>
  Int: ResolverTypeWrapper<Scalars['Int']>
  System: ResolverTypeWrapper<System>
  User: ResolverTypeWrapper<User>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  String: Scalars['String']
  FeatureGraphs: FeatureGraphs
  Feature: Feature
  Date: Scalars['Date']
  Boolean: Scalars['Boolean']
  BubbleData: BubbleData
  BubbleNode: BubbleNode
  BubbleLink: BubbleLink
  QuadData: QuadData
  TimelineData: TimelineData
  _TimelineData: _TimelineData
  TestIssue: TestIssue
  Epic: Epic
  Int: Scalars['Int']
  System: System
  User: User
}

export type _TimelineDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['_TimelineData'] = ResolversParentTypes['_TimelineData']
> = {
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  customClass?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  at?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
}

export type BubbleDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['BubbleData'] = ResolversParentTypes['BubbleData']
> = {
  nodes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['BubbleNode']>>>,
    ParentType,
    ContextType
  >
  links?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['BubbleLink']>>>,
    ParentType,
    ContextType
  >
}

export type BubbleLinkResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['BubbleLink'] = ResolversParentTypes['BubbleLink']
> = {
  source?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  target?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type BubbleNodeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['BubbleNode'] = ResolversParentTypes['BubbleNode']
> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  agreedDependencies?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['String']>>>,
    ParentType,
    ContextType
  >
  primaryFeature?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  group?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  colour?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
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

export type FeatureResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Feature'] = ResolversParentTypes['Feature']
> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  featureName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  epic?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  system?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  market?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  cluster?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  crossFunctionalTeam?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  pod?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
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
  users?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['String']>>>,
    ParentType,
    ContextType
  >
  dueDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
  primaryFeature?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  xCat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  yCat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  ragStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  rCat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  colour?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  budget?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type FeatureGraphsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FeatureGraphs'] = ResolversParentTypes['FeatureGraphs']
> = {
  features?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Feature']>>>,
    ParentType,
    ContextType
  >
  bubbleFeatures?: Resolver<
    Maybe<ResolversTypes['BubbleData']>,
    ParentType,
    ContextType
  >
  quadFeatures?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['QuadData']>>>,
    ParentType,
    ContextType
  >
  timelineFeatures?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['TimelineData']>>>,
    ParentType,
    ContextType
  >
}

export type QuadDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['QuadData'] = ResolversParentTypes['QuadData']
> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  xCat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  yCat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  ragStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  rCat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  featureName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  primaryFeature?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  featureGraphs?: Resolver<
    ResolversTypes['FeatureGraphs'],
    ParentType,
    ContextType
  >
  testIssues?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['TestIssue']>>>,
    ParentType,
    ContextType
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

export type TestIssueResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TestIssue'] = ResolversParentTypes['TestIssue']
> = {
  issuekey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  storypoint?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  project?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  dependencies?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['TestIssue']>>>,
    ParentType,
    ContextType
  >
}

export type TimelineDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TimelineData'] = ResolversParentTypes['TimelineData']
> = {
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  data?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['_TimelineData']>>>,
    ParentType,
    ContextType
  >
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  _TimelineData?: _TimelineDataResolvers<ContextType>
  BubbleData?: BubbleDataResolvers<ContextType>
  BubbleLink?: BubbleLinkResolvers<ContextType>
  BubbleNode?: BubbleNodeResolvers<ContextType>
  Date?: GraphQLScalarType
  Epic?: EpicResolvers<ContextType>
  Feature?: FeatureResolvers<ContextType>
  FeatureGraphs?: FeatureGraphsResolvers<ContextType>
  QuadData?: QuadDataResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  System?: SystemResolvers<ContextType>
  TestIssue?: TestIssueResolvers<ContextType>
  TimelineData?: TimelineDataResolvers<ContextType>
  User?: UserResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
