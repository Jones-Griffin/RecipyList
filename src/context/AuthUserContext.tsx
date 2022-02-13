import { FC } from "react";
import {
  createContext,
  useContext,
  useContextSelector,
} from "use-context-selector";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { AuthUser } from "../modals/AuthUser";

export interface AuthUserContextState {
  authUser: AuthUser;
  loading: boolean;
}

const AuthUserContext = createContext<AuthUserContextState>({
  authUser: null,
  loading: true,
});

export const AuthUserProvider: FC = ({ children }) => {
  const auth = useFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
};
// custom hook to use the authUserContext and access authUser and loading
export const useAuth = (): AuthUserContextState => {
  const context = useContext(AuthUserContext);

  if (context === undefined) {
    throw new Error("useAuth must be used withing a AuthUserProvider");
  }
  return context;
};

export function useAuthSelector<T>(
  selector: (value: AuthUserContextState) => T
): T {
  const selected = useContextSelector(AuthUserContext, (state) => {
    if (state === undefined) {
      throw new Error("useAuthSelector must be used withing a AuthUserProvider");
    }
    return selector(state);
  });
  return selected;
}
