import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from '../../router';

import { getUserInfo } from '../../redux/auth/firebaseActions';

const Main = () => {
   const { isAuth } = useSelector(state => state.auth);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getUserInfo());
   }, []);

   const routing = useRoute(isAuth);

   return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
