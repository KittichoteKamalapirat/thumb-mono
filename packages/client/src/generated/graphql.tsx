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
  channelId: Scalars['String'];
  channelName: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  testings: Array<Testing>;
  token: Token;
  updatedAt: Scalars['DateTime'];
  userConnections: Array<UserChannel>;
};

export type CreateChannelInput = {
  access_token: Scalars['String'];
  channelId: Scalars['String'];
  channelName: Scalars['String'];
  refresh_token: Scalars['String'];
};

export type CreateUserChannelInput = {
  channelId: Scalars['String'];
  userId: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
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
  createUserChannel: UserChannel;
  getAuthURL: Scalars['String'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  removeUser: User;
  removeUserChannel: UserChannel;
  updateUserChannel: UserChannel;
};


export type MutationCreateAndSaveTokensArgs = {
  code: Scalars['String'];
};


export type MutationCreateChannelArgs = {
  createChannelInput: CreateChannelInput;
};


export type MutationCreateUserChannelArgs = {
  createUserChannelInput: CreateUserChannelInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRemoveUserArgs = {
  id: Scalars['String'];
};


export type MutationRemoveUserChannelArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateUserChannelArgs = {
  updateUserChannelInput: UpdateUserChannelInput;
};

export type Query = {
  __typename?: 'Query';
  channel: Channel;
  channels: Array<Channel>;
  getEmail: Scalars['String'];
  me?: Maybe<User>;
  user: User;
  userChannel: UserChannel;
  userChannels: Array<UserChannel>;
  users: Array<User>;
};


export type QueryChannelArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryUserChannelArgs = {
  id: Scalars['Int'];
};

export type Testing = {
  __typename?: 'Testing';
  channel: Channel;
  channelId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type Token = {
  __typename?: 'Token';
  access_token: Scalars['String'];
  refresh_token: Scalars['String'];
};

export type UpdateUserChannelInput = {
  channelId?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  userId?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  channelConnections: Array<UserChannel>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  membership: Scalars['String'];
  password: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserChannel = {
  __typename?: 'UserChannel';
  channel: Channel;
  channelId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type CreateAndSaveTokensMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type CreateAndSaveTokensMutation = { __typename?: 'Mutation', createAndSaveTokens: { __typename?: 'LoginResponse', channel?: { __typename?: 'Channel', id: string, channelId: string } | null, user?: { __typename?: 'User', id: string, membership: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetAuthUrlMutationVariables = Exact<{ [key: string]: never; }>;


export type GetAuthUrlMutation = { __typename?: 'Mutation', getAuthURL: string };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: string, email: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string } | null };


export const CreateAndSaveTokensDocument = gql`
    mutation CreateAndSaveTokens($code: String!) {
  createAndSaveTokens(code: $code) {
    channel {
      id
      channelId
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
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    errors {
      field
      message
    }
    user {
      id
      email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
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
export const MeDocument = gql`
    query Me {
  me {
    id
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;