import axios from 'axios';
import firebase, { Unsubscribe, User } from 'firebase/app';
import React, {
  useEffect,
  useState,
  useRef,
  FunctionComponent,
  MutableRefObject,
} from 'react';
import { RouteComponentProps } from 'react-router';
import StyledFireBaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import app from '../firebase.setup';

const Login: FunctionComponent<RouteComponentProps> = (props) => {
  const [user, setUser] = useState<User | null>(null);
  // const justMounted = useRef(true);
  const observer: MutableRefObject<any> = useRef<Unsubscribe>(null);

  const uiConfig = {
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
    signInFlow: 'popup',
    // Render Buttons for following Providers:
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
  };

  useEffect(() => {
    observer.current = app
      .auth()
      .onAuthStateChanged((newUser) => setUser(newUser));
    return () => {
      if (observer.current !== null) {
        observer.current();
      }
    };
  }, []);

  useEffect(
    () => {
      submitUser();
    },
    [user],
  );

  async function submitUser() {
    if (user !== null) {
      const { email, uid, displayName, photoURL } = user;
      const nUser = {
        email,
        ext_it: uid,
        full_name: displayName,
        photoURL,
        role: 'manager',
      };
      const url =
        process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';
      try {
        const { data } = await axios.post(`${url}/users/`, nUser);
        localStorage.setItem('token', data.token);
        if (data.first) {
          props.history.push('/updateinfo');
        } else {
          props.history.push('/dashboard');
        }
      } catch (e) {
        throw e;
      }
    }
  }
  return (
    <div>
      <StyledFireBaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()} />
    </div>
  );
};

export default Login;
