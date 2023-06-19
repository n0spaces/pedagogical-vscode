import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { vscodeMessageQuery } from "./webviewMessageBaseQuery";
import { DebugProtocol as DP } from "@vscode/debugprotocol";
import { DebugRequest, DebugResponse, WebviewMessage } from "shared";

function debugRequestMsg(req: DebugRequest): WebviewMessage {
  return { type: "debugRequest", data: req };
}

export const debugAdapterApi = createApi({
  reducerPath: "debugAdapterApi",
  baseQuery: vscodeMessageQuery,
  endpoints: (builder) => ({
    getScopes: builder.query<DebugResponse, DP.ScopesArguments>({
      query: (args) => debugRequestMsg({ command: "scopes", args }),
    }),

    getStackTrace: builder.query<DebugResponse, DP.StackTraceArguments>({
      query: (args) => debugRequestMsg({ command: "stackTrace", args }),
    }),

    getThreads: builder.query<DebugResponse, undefined>({
      // threads has no arguments
      query: () => debugRequestMsg({ command: "threads", args: undefined }),
    }),

    getVariables: builder.query<DebugResponse, DP.VariablesArguments>({
      query: (args) => debugRequestMsg({ command: "variables", args }),
    }),
  }),
});

export const {
  useGetScopesQuery,
  useGetStackTraceQuery,
  useGetVariablesQuery,
  useGetThreadsQuery,
} = debugAdapterApi;
