import React, { useEffect } from 'react';
import { loginSuccess } from '../store/actions';
import { useParams, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
const LoginSuccess = () => {
  const dispath = useDispatch();

  const { userID } = useParams();
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    dispath(loginSuccess(userID));
  }, []);

  return <div>{isLoggedIn && <Navigate to={'/admin'} replace={true} />}</div>;
};

export default LoginSuccess;
