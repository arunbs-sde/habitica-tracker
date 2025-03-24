import React, { useState, useEffect } from "react";
import "./App.css";
import UserHistory from "./UserHistory";

export const DATE_KEY_FORMAT = "YYYYMMDD";

export enum AppState {
  PROMPT_FOR_USER_CREDS,
  USER_INPUT_ACCEPTED,
  ERROR,
}

// ✅ Hardcode your user ID and API key here:
const HARD_CODED_USER_ID = "e1b6023c-c5ce-4143-ba05-1c0f0649c1c3";
const HARD_CODED_API_KEY = "07947907-3092-43a8-9c5f-6c9cce2db1ea";


function App() {
  const [userId, setUserId] = useState<string>("");
  const [userApiKey, setUserApiKey] = useState<string>("");
  const [error, setError] = useState<Error>();
  const [appState, setAppState] = useState<AppState>(AppState.PROMPT_FOR_USER_CREDS);

  const setAppError = (error: Error) => {
    setError(error);
    setAppState(AppState.ERROR);
  };

  // Set hardcoded values
  useEffect(() => {
    setUserId(HARD_CODED_USER_ID);
    setUserApiKey(HARD_CODED_API_KEY);
  }, []);

  // Submit after states are set
  useEffect(() => {
    if (userId && userApiKey) {
      setAppState(AppState.USER_INPUT_ACCEPTED);
    } else if (userId || userApiKey) {
      setAppError(new Error("User ID or API Key is missing"));
    }
  }, [userId, userApiKey]);

  if (appState === AppState.USER_INPUT_ACCEPTED) {
    return (
      <UserHistory
        userId={userId}
        userApiKey={userApiKey}
        setError={setAppError}
      />
    );
  }

  return (
    <div className="App">
      <h1>Habitica Tracker</h1>
      {error && <div className="error">Error: {error.message}</div>}
      <p>
        Hardcoded credentials missing. Please check your code and provide `HARD_CODED_USER_ID` and `HARD_CODED_API_KEY`.
      </p>
    </div>
  );
}

export default App;
