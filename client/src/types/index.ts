export interface User {
  email: string;
  username: string;
}

export interface UserState {
  value: {
    user: User | null;
    isLoggedIn: boolean;
    error: string | null;
  };
}

export type CancelRequest = {
  jobId: string;
};

export interface JobState {
  value: {
    jobId: string | null;
    isProcessing: boolean;
    jobError: string | null;
  };
}
