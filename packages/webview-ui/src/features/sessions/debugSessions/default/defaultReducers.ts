import { ActionCreator, AnyAction, CaseReducer } from "@reduxjs/toolkit";
import { DefaultSessionState } from "./DefaultSession";
import { setAllDebugObjects, setAllFlowObjects } from "./defaultActions";
import { threadsAdapter, stackFramesAdapter, scopesAdapter, variablesAdapter, edgesAdapter, nodesAdapter } from "../../entities";

type CR<A extends ActionCreator<AnyAction>> = CaseReducer<
  DefaultSessionState,
  ReturnType<A>
>;

export const setAllDebugObjectsReducer: CR<typeof setAllDebugObjects> = (state, action) => {
  threadsAdapter.setAll(state.threads, action.payload.threads);
  stackFramesAdapter.setAll(state.stackFrames, action.payload.stackFrames);
  scopesAdapter.setAll(state.scopes, action.payload.scopes);
  variablesAdapter.setAll(state.variables, action.payload.variables);
};

export const setAllFlowObjectsReducer: CR<typeof setAllFlowObjects> = (state, action) => {
  nodesAdapter.setAll(state.nodes, action.payload.nodes);
  edgesAdapter.setAll(state.edges, action.payload.edges);
};