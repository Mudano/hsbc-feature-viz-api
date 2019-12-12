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

export type AssigneeProjects = {
  __typename?: 'AssigneeProjects'
  id?: Maybe<Scalars['ID']>
  assignee?: Maybe<Scalars['String']>
  project?: Maybe<Scalars['String']>
}

export type FeatureGraph = {
  __typename?: 'FeatureGraph'
  issueKey?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  storyPoint?: Maybe<Scalars['String']>
  project?: Maybe<Scalars['String']>
  assigneeProjects?: Maybe<AssigneeProjects>
  benStory?: Maybe<Issue>
}

export type Issue = {
  __typename?: 'Issue'
  issueKey?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  storyPoint?: Maybe<Scalars['String']>
  project?: Maybe<Scalars['String']>
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
  AssigneeProjects: ResolverTypeWrapper<AssigneeProjects>
  ID: ResolverTypeWrapper<Scalars['ID']>
  Issue: ResolverTypeWrapper<Issue>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  String: Scalars['String']
  FeatureGraph: FeatureGraph
  AssigneeProjects: AssigneeProjects
  ID: Scalars['ID']
  Issue: Issue
  Boolean: Scalars['Boolean']
}

export type AssigneeProjectsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AssigneeProjects'] = ResolversParentTypes['AssigneeProjects']
> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  assignee?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  project?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type FeatureGraphResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FeatureGraph'] = ResolversParentTypes['FeatureGraph']
> = {
  issueKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  storyPoint?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  project?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  assigneeProjects?: Resolver<
    Maybe<ResolversTypes['AssigneeProjects']>,
    ParentType,
    ContextType
  >
  benStory?: Resolver<Maybe<ResolversTypes['Issue']>, ParentType, ContextType>
}

export type IssueResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Issue'] = ResolversParentTypes['Issue']
> = {
  issueKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  storyPoint?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  project?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
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

export type Resolvers<ContextType = any> = {
  AssigneeProjects?: AssigneeProjectsResolvers<ContextType>
  FeatureGraph?: FeatureGraphResolvers<ContextType>
  Issue?: IssueResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
