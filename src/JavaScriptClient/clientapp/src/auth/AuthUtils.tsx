import {createContext, PropsWithChildren, useContext, useEffect, useState} from 'react';
import axios from "axios";

export type UserStatus = 
  | {status: "unauthenticated"}
  | { status: "authenticated", PersonName: string, LogoutUrl: string };

export interface AuthContextType {
  userStatus: UserStatus;
  login: () => void;
  logout: () => void;
}

interface Claim{
  type: string;
  value: string;
}
const getData = async ():Promise<Array<Claim>> => {
  const response = await axios.get(
    `/bff/user`, {
      headers: {"X-CSRF": "1"},
    }
  );
  return response.data;
}

async function initAuth(): Promise<UserStatus> {

  try {
    const data = await getData();
    const logoutUrl = data.filter((claim) => claim.type === "bff:logout_url")[0].value;
    const name = data.filter((claim) => claim.type === "name")[0].value;
    return {status: "authenticated", PersonName: name, LogoutUrl: logoutUrl};
  } catch (e) {
    console.log("error checking user status");
  }
  return {status: "unauthenticated"};
}


function login() {
  window.location.href = "/bff/login";
}
function logout(logoutUrl:string) {
  window.location.href = logoutUrl;
}

const unauthenticated:AuthContextType = {
  userStatus: {status: "unauthenticated"},
  login: login,
  logout: () => {},
}
const AuthContext = createContext<AuthContextType>(unauthenticated);

function AuthProvider(props: PropsWithChildren) {
  const [user, setUser] = useState<AuthContextType>(unauthenticated);

  useEffect(() => {
    async function fetchAuth() {
      const a = await initAuth();
      const b:AuthContextType = a.status === "unauthenticated"
        ? unauthenticated
        : {userStatus: a, login: login, logout: () => logout(a.LogoutUrl)};
      setUser(b);
    }

    fetchAuth()
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {props.children}
    </AuthContext.Provider>
  )
}

function useAuthContext (){
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used inside the AuthProvider');
  }

  return context;
};


export { AuthProvider, useAuthContext };