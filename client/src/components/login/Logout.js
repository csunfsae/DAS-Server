import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context'
import { GoogleLogout } from 'react-google-login';
import { useHistory } from 'react-router-dom'


const clientId = '345612164466-j2pnr9ubb95nhvgrjl5lutuoejmdi83n.apps.googleusercontent.com';

function Logout() {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const onSuccess = () => {
    authCtx.login(null);
    history.replace('/');
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
        isSignedIn={false}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;