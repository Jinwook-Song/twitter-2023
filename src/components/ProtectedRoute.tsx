import React from 'react';
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = auth.currentUser;
  if (!user) return <Navigate to={'/login'} />;
  return children;
}

export default ProtectedRoute;
