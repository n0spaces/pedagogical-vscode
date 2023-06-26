import * as vscode from "vscode";
import { DebugProtocol } from "@vscode/debugprotocol";
import { DebugEvent } from "shared";
import { DebugSessionObserver } from "./DebugSessionObserver";

/** Debug adapter tracker factory to be registered with vscode */
export const DebugTrackerFactory: vscode.DebugAdapterTrackerFactory = {
  createDebugAdapterTracker(session: vscode.DebugSession): vscode.ProviderResult<DebugTracker> {
    return new DebugTracker(session);
  }
};

class DebugTracker implements vscode.DebugAdapterTracker {
  constructor(private session: vscode.DebugSession) {
    console.log(`Registered "${session.type}" debug session tracker ${session.id}`);
  }

  onDidSendMessage(message: DebugProtocol.ProtocolMessage) {
    console.log(message);
    if (message.type === "event") {
      DebugSessionObserver.sendEvent(this.session, message as unknown as DebugEvent);
    }
  }

  onWillStartSession() {
    DebugSessionObserver.addSession(this.session);
  }

  onWillStopSession() {
    DebugSessionObserver.removeSession(this.session);
  }
}
