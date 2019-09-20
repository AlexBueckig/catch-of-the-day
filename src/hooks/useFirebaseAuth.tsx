import firebase from 'firebase/app';
import 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import base, { firebaseApp } from '../base';

interface IAuthData {
  uid: string | null;
  owner: string | null;
}

const useFirebaseAuth = (storeId: string) => {
  const [authData, setAuthData] = useState<IAuthData>({ uid: null, owner: '' });

  const authHandler = useCallback(
    async (authData: firebase.auth.UserCredential | { user: firebase.User }) => {
      console.log(authData);
      const store = await base.fetch(storeId, { context: {} });
      if (authData.user) {
        if (!store.owner) {
          await base.post(`${storeId}/owner`, { data: authData.user.uid });
        }
        setAuthData({ uid: authData.user.uid, owner: store.owner || authData.user.uid });
      }
    },
    [storeId]
  );

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        authHandler({ user });
      }
    });
  }, [authHandler]);

  const authenticate = (provider: string) => {
    let authProvider = null;
    switch (provider) {
      case 'Twitter':
        authProvider = new firebase.auth.TwitterAuthProvider();
        break;
      case 'Google':
        authProvider = new firebase.auth.GoogleAuthProvider();
        break;
      case 'Github':
        authProvider = new firebase.auth.GithubAuthProvider();
        break;
      default:
        break;
    }
    if (authProvider) {
      firebaseApp
        .auth()
        .signInWithPopup(authProvider)
        .then(authHandler);
    }
  };

  const logout = async () => {
    await firebase.auth().signOut();
    setAuthData({ ...authData, uid: null });
  };

  return { authenticate, logout, isOwner: authData.owner === authData.uid, isAuthenticated: authData.uid };
};

export default useFirebaseAuth;
