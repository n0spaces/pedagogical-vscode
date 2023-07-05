import { DebugEvent, VsCodeMessage } from "shared";
import { store } from "../store";
import { addSession, removeSession } from "../features/sessions/sessionsSlice";
import { fetchSession } from "../features/sessions/thunks";
import { messageController } from "../util";

export function startMessageObserver() {
  messageController.addObserver(messageObserver);
}

function messageObserver(msg: VsCodeMessage) {
  switch (msg.type) {
    case "sessionStartedEvent":
      store.dispatch(addSession(msg.data));
      return;
    
    case "sessionStoppedEvent":
      store.dispatch(removeSession(msg.data));
      return;

    case "debugEvent":
      handleDebugEvent(msg.data.sessionId, msg.data.event);
      return;
  }
}

function handleDebugEvent(sessionId: string, event: DebugEvent) {
  switch (event.event) {
    case "stopped": {
      const session = store.getState().sessions[sessionId];
      store.dispatch(fetchSession(session));
      return;
    }
    
    case "thread":
      // TODO
      return;
  }
}