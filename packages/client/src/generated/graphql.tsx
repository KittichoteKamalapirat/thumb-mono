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
  DateTime: any;
};

export type Channel = {
  __typename?: 'Channel';
  channelName: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  testings: Array<Testing>;
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
  ytChannelId: Scalars['String'];
};

export type CreateChannelInput = {
  channelName: Scalars['String'];
  userId: Scalars['String'];
  ytChannelId: Scalars['String'];
};

export type CreateTestingInput = {
  channelId: Scalars['String'];
  duration: Scalars['Float'];
  durationType: Scalars['String'];
  ori: Scalars['String'];
  type: Scalars['String'];
  varis: Array<Scalars['String']>;
  videoId: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  channel?: Maybe<Channel>;
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAndSaveTokens: LoginResponse;
  createChannel: Channel;
  createTesting: TestingResponse;
  getAuthURL: Scalars['String'];
  logout: Scalars['Boolean'];
  removeTesting: Testing;
  removeUser: User;
  updateTesting: Testing;
};


export type MutationCreateAndSaveTokensArgs = {
  code: Scalars['String'];
};


export type MutationCreateChannelArgs = {
  createChannelInput: CreateChannelInput;
};


export type MutationCreateTestingArgs = {
  input: CreateTestingInput;
};


export type MutationRemoveTestingArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['String'];
};


export type MutationUpdateTestingArgs = {
  updateTestingInput: UpdateTestingInput;
};

export type Query = {
  __typename?: 'Query';
  channel: Channel;
  channels: Array<Channel>;
  getEmail: Scalars['String'];
  meChannel?: Maybe<Channel>;
  meUser?: Maybe<User>;
  myTestings: Array<Testing>;
  stats: Array<SummaryItem>;
  testing?: Maybe<Testing>;
  user: User;
  users: Array<User>;
  videos: Array<YoutubeVideo>;
};


export type QueryChannelArgs = {
  id: Scalars['Int'];
};


export type QueryStatsArgs = {
  testingId: Scalars['String'];
};


export type QueryTestingArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryVideosArgs = {
  channelId: Scalars['String'];
};

export type SummaryItem = {
  __typename?: 'SummaryItem';
  annotationClickThroughRate: Scalars['Float'];
  annotationClickableImpressions: Scalars['Float'];
  annotationCloseRate: Scalars['Float'];
  averageViewDuration: Scalars['Float'];
  comments: Scalars['Float'];
  dislikes: Scalars['Float'];
  estimatedMinutesWatched: Scalars['Float'];
  likes: Scalars['Float'];
  shares: Scalars['Float'];
  subject: Scalars['String'];
  subscribersGained: Scalars['Float'];
  subscribersLost: Scalars['Float'];
  videoId: Scalars['String'];
  views: Scalars['Float'];
};

export type TestHistory = {
  __typename?: 'TestHistory';
  date: Scalars['String'];
  valueIndex: Scalars['Float'];
};

export type Testing = {
  __typename?: 'Testing';
  channel: Channel;
  channelId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  duration: Scalars['Int'];
  durationType: Scalars['String'];
  history: Array<TestHistory>;
  id: Scalars['ID'];
  ori: Scalars['String'];
  startDate: Scalars['String'];
  status: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  varis: Array<Scalars['String']>;
  videoId: Scalars['String'];
};

export type TestingResponse = {
  __typename?: 'TestingResponse';
  errors?: Maybe<Array<FieldError>>;
  testing?: Maybe<Testing>;
};

export type Token = {
  __typename?: 'Token';
  access_token: Scalars['String'];
  refresh_token: Scalars['String'];
};

export type UpdateTestingInput = {
  channelId?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Float']>;
  durationType?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  ori?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  varis?: InputMaybe<Array<Scalars['String']>>;
  videoId?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  channels: Array<Channel>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  membership: Scalars['String'];
  token: Token;
  updatedAt: Scalars['DateTime'];
};

export type YoutubeVideo = {
  __typename?: 'YoutubeVideo';
  thumbUrl: Scalars['String'];
  title: Scalars['String'];
  videoId: Scalars['String'];
};

export type StatsQueryVariables = Exact<{
  testingId: Scalars['String'];
}>;


export type StatsQuery = { __typename?: 'Query', stats: Array<{ __typename?: 'SummaryItem', subject: string, videoId: string, views: number, annotationClickThroughRate: number, annotationCloseRate: number, annotationClickableImpressions: number, averageViewDuration: number, comments: number, dislikes: number, estimatedMinutesWatched: number, likes: number, shares: number, subscribersGained: number, subscribersLost: number }> };

export type CreateAndSaveTokensMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type CreateAndSaveTokensMutation = { __typename?: 'Mutation', createAndSaveTokens: { __typename?: 'LoginResponse', channel?: { __typename?: 'Channel', id: string, ytChannelId: string } | null, user?: { __typename?: 'User', id: string, membership: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetAuthUrlMutationVariables = Exact<{ [key: string]: never; }>;


export type GetAuthUrlMutation = { __typename?: 'Mutation', getAuthURL: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MeUserQueryVariables = Exact<{ [key: string]: never; }>;


export type MeUserQuery = { __typename?: 'Query', meUser?: { __typename?: 'User', id: string, email: string } | null };

export type MeChannelQueryVariables = Exact<{ [key: string]: never; }>;


export type MeChannelQuery = { __typename?: 'Query', meChannel?: { __typename?: 'Channel', id: string, ytChannelId: string, channelName: string } | null };

export type CreateTestingMutationVariables = Exact<{
  input: CreateTestingInput;
}>;


export type CreateTestingMutation = { __typename?: 'Mutation', createTesting: { __typename?: 'TestingResponse', testing?: { __typename?: 'Testing', id: string, type: string, status: string, duration: number, durationType: string, videoId: string, startDate: string, channelId: string, ori: string, varis: Array<string>, history: Array<{ __typename?: 'TestHistory', date: string, valueIndex: number }> } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type MyTestingsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyTestingsQuery = { __typename?: 'Query', myTestings: Array<{ __typename?: 'Testing', id: string, type: string, status: string, duration: number, durationType: string, videoId: string, startDate: string, channelId: string, ori: string, varis: Array<string>, history: Array<{ __typename?: 'TestHistory', date: string, valueIndex: number }> }> };

export type TestingQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type TestingQuery = { __typename?: 'Query', testing?: { __typename?: 'Testing', id: string, type: string, status: string, duration: number, durationType: string, videoId: string, startDate: string, channelId: string, ori: string, varis: Array<string>, history: Array<{ __typename?: 'TestHistory', date: string, valueIndex: number }> } | null };

export type TestingSnippetFragment = { __typename?: 'Testing', id: string, type: string, status: string, duration: number, durationType: string, videoId: string, startDate: string, channelId: string, ori: string, varis: Array<string>, history: Array<{ __typename?: 'TestHistory', date: string, valueIndex: number }> };

export type VideosQueryVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type VideosQuery = { __typename?: 'Query', videos: Array<{ __typename?: 'YoutubeVideo', videoId: string, title: string, thumbUrl: string }> };

export const TestingSnippetFragmentDoc = gql`
    fragment TestingSnippet on Testing {
  id
  type
  status
  duration
  durationType
  videoId
  startDate
  channelId
  history {
    date
    valueIndex
  }
  ori
  varis
}
    `;
export const StatsDocument = gql`
    query Stats($testingId: String!) {
  stats(testingId: $testingId) {
    subject
    videoId
    views
    annotationClickThroughRate
    annotationCloseRate
    annotationClickableImpressions
    averageViewDuration
    comments
    dislikes
    estimatedMinutesWatched
    likes
    shares
    subscribersGained
    subscribersLost
  }
}
    `;

/**
 * __useStatsQuery__
 *
 * To run a query within a React component, call `useStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStatsQuery({
 *   variables: {
 *      testingId: // value for 'testingId'
 *   },
 * });
 */
export function useStatsQuery(baseOptions: Apollo.QueryHookOptions<StatsQuery, StatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StatsQuery, StatsQueryVariables>(StatsDocument, options);
      }
export function useStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StatsQuery, StatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StatsQuery, StatsQueryVariables>(StatsDocument, options);
        }
export type StatsQueryHookResult = ReturnType<typeof useStatsQuery>;
export type StatsLazyQueryHookResult = ReturnType<typeof useStatsLazyQuery>;
export type StatsQueryResult = Apollo.QueryResult<StatsQuery, StatsQueryVariables>;
export const CreateAndSaveTokensDocument = gql`
    mutation CreateAndSaveTokens($code: String!) {
  createAndSaveTokens(code: $code) {
    channel {
      id
      ytChannelId
    }
    user {
      id
      membership
    }
    errors {
      field
      message
    }
  }
}
    `;
export type CreateAndSaveTokensMutationFn = Apollo.MutationFunction<CreateAndSaveTokensMutation, CreateAndSaveTokensMutationVariables>;

/**
 * __useCreateAndSaveTokensMutation__
 *
 * To run a mutation, you first call `useCreateAndSaveTokensMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAndSaveTokensMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAndSaveTokensMutation, { data, loading, error }] = useCreateAndSaveTokensMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useCreateAndSaveTokensMutation(baseOptions?: Apollo.MutationHookOptions<CreateAndSaveTokensMutation, CreateAndSaveTokensMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAndSaveTokensMutation, CreateAndSaveTokensMutationVariables>(CreateAndSaveTokensDocument, options);
      }
export type CreateAndSaveTokensMutationHookResult = ReturnType<typeof useCreateAndSaveTokensMutation>;
export type CreateAndSaveTokensMutationResult = Apollo.MutationResult<CreateAndSaveTokensMutation>;
export type CreateAndSaveTokensMutationOptions = Apollo.BaseMutationOptions<CreateAndSaveTokensMutation, CreateAndSaveTokensMutationVariables>;
export const GetAuthUrlDocument = gql`
    mutation GetAuthURL {
  getAuthURL
}
    `;
export type GetAuthUrlMutationFn = Apollo.MutationFunction<GetAuthUrlMutation, GetAuthUrlMutationVariables>;

/**
 * __useGetAuthUrlMutation__
 *
 * To run a mutation, you first call `useGetAuthUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetAuthUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getAuthUrlMutation, { data, loading, error }] = useGetAuthUrlMutation({
 *   variables: {
 *   },
 * });
 */
export function useGetAuthUrlMutation(baseOptions?: Apollo.MutationHookOptions<GetAuthUrlMutation, GetAuthUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetAuthUrlMutation, GetAuthUrlMutationVariables>(GetAuthUrlDocument, options);
      }
export type GetAuthUrlMutationHookResult = ReturnType<typeof useGetAuthUrlMutation>;
export type GetAuthUrlMutationResult = Apollo.MutationResult<GetAuthUrlMutation>;
export type GetAuthUrlMutationOptions = Apollo.BaseMutationOptions<GetAuthUrlMutation, GetAuthUrlMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeUserDocument = gql`
    query MeUser {
  meUser {
    id
    email
  }
}
    `;

/**
 * __useMeUserQuery__
 *
 * To run a query within a React component, call `useMeUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeUserQuery(baseOptions?: Apollo.QueryHookOptions<MeUserQuery, MeUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeUserQuery, MeUserQueryVariables>(MeUserDocument, options);
      }
export function useMeUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeUserQuery, MeUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeUserQuery, MeUserQueryVariables>(MeUserDocument, options);
        }
export type MeUserQueryHookResult = ReturnType<typeof useMeUserQuery>;
export type MeUserLazyQueryHookResult = ReturnType<typeof useMeUserLazyQuery>;
export type MeUserQueryResult = Apollo.QueryResult<MeUserQuery, MeUserQueryVariables>;
export const MeChannelDocument = gql`
    query MeChannel {
  meChannel {
    id
    ytChannelId
    channelName
  }
}
    `;

/**
 * __useMeChannelQuery__
 *
 * To run a query within a React component, call `useMeChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeChannelQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeChannelQuery(baseOptions?: Apollo.QueryHookOptions<MeChannelQuery, MeChannelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeChannelQuery, MeChannelQueryVariables>(MeChannelDocument, options);
      }
export function useMeChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeChannelQuery, MeChannelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeChannelQuery, MeChannelQueryVariables>(MeChannelDocument, options);
        }
export type MeChannelQueryHookResult = ReturnType<typeof useMeChannelQuery>;
export type MeChannelLazyQueryHookResult = ReturnType<typeof useMeChannelLazyQuery>;
export type MeChannelQueryResult = Apollo.QueryResult<MeChannelQuery, MeChannelQueryVariables>;
export const CreateTestingDocument = gql`
    mutation CreateTesting($input: CreateTestingInput!) {
  createTesting(input: $input) {
    testing {
      ...TestingSnippet
    }
    errors {
      field
      message
    }
  }
}
    ${TestingSnippetFragmentDoc}`;
export type CreateTestingMutationFn = Apollo.MutationFunction<CreateTestingMutation, CreateTestingMutationVariables>;

/**
 * __useCreateTestingMutation__
 *
 * To run a mutation, you first call `useCreateTestingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTestingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTestingMutation, { data, loading, error }] = useCreateTestingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTestingMutation(baseOptions?: Apollo.MutationHookOptions<CreateTestingMutation, CreateTestingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTestingMutation, CreateTestingMutationVariables>(CreateTestingDocument, options);
      }
export type CreateTestingMutationHookResult = ReturnType<typeof useCreateTestingMutation>;
export type CreateTestingMutationResult = Apollo.MutationResult<CreateTestingMutation>;
export type CreateTestingMutationOptions = Apollo.BaseMutationOptions<CreateTestingMutation, CreateTestingMutationVariables>;
export const MyTestingsDocument = gql`
    query myTestings {
  myTestings {
    ...TestingSnippet
  }
}
    ${TestingSnippetFragmentDoc}`;

/**
 * __useMyTestingsQuery__
 *
 * To run a query within a React component, call `useMyTestingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyTestingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyTestingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyTestingsQuery(baseOptions?: Apollo.QueryHookOptions<MyTestingsQuery, MyTestingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyTestingsQuery, MyTestingsQueryVariables>(MyTestingsDocument, options);
      }
export function useMyTestingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyTestingsQuery, MyTestingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyTestingsQuery, MyTestingsQueryVariables>(MyTestingsDocument, options);
        }
export type MyTestingsQueryHookResult = ReturnType<typeof useMyTestingsQuery>;
export type MyTestingsLazyQueryHookResult = ReturnType<typeof useMyTestingsLazyQuery>;
export type MyTestingsQueryResult = Apollo.QueryResult<MyTestingsQuery, MyTestingsQueryVariables>;
export const TestingDocument = gql`
    query Testing($id: String!) {
  testing(id: $id) {
    ...TestingSnippet
  }
}
    ${TestingSnippetFragmentDoc}`;

/**
 * __useTestingQuery__
 *
 * To run a query within a React component, call `useTestingQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTestingQuery(baseOptions: Apollo.QueryHookOptions<TestingQuery, TestingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestingQuery, TestingQueryVariables>(TestingDocument, options);
      }
export function useTestingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestingQuery, TestingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestingQuery, TestingQueryVariables>(TestingDocument, options);
        }
export type TestingQueryHookResult = ReturnType<typeof useTestingQuery>;
export type TestingLazyQueryHookResult = ReturnType<typeof useTestingLazyQuery>;
export type TestingQueryResult = Apollo.QueryResult<TestingQuery, TestingQueryVariables>;
export const VideosDocument = gql`
    query Videos($channelId: String!) {
  videos(channelId: $channelId) {
    videoId
    title
    thumbUrl
  }
}
    `;

/**
 * __useVideosQuery__
 *
 * To run a query within a React component, call `useVideosQuery` and pass it any options that fit your needs.
 * When your component renders, `useVideosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideosQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useVideosQuery(baseOptions: Apollo.QueryHookOptions<VideosQuery, VideosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VideosQuery, VideosQueryVariables>(VideosDocument, options);
      }
export function useVideosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VideosQuery, VideosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VideosQuery, VideosQueryVariables>(VideosDocument, options);
        }
export type VideosQueryHookResult = ReturnType<typeof useVideosQuery>;
export type VideosLazyQueryHookResult = ReturnType<typeof useVideosLazyQuery>;
export type VideosQueryResult = Apollo.QueryResult<VideosQuery, VideosQueryVariables>;