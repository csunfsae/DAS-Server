import { useContext } from 'react';
import Login from '../../components/login/Login';
import Logout from '../../components/login/Logout';
import AuthContext from '../../store/auth-context';

function LoginPage() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <div>
      {!isLoggedIn && (
        <Login />
      )}
      {isLoggedIn && (
        <Logout />
      )}
      <br />
    </div>
  );
}

export default LoginPage;