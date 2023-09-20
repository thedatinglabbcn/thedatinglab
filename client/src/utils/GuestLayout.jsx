import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AuthService } from '../service/AuthService';
export default function GuestLayout() {
	const { user } = useAuth();

	// if user is logged in, redirect to home page
	if (user) {
		return <Navigate to="/profile" />;
	}
	return (
		<>
			<AuthService />
			<Outlet />
		</>
	);
}