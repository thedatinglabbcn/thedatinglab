import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthService } from '../service/AuthService';
import { useAuth } from '../contexts/AuthContext';
// import axios from '../service/axios';

export default function DefaultLayout() {
	const { user, setUser } = useAuth();
    const auth = AuthService();

	// check if user is logged in or not from server
	useEffect(() => {
		(async () => {
			try {
				const resp = await auth.get('/user');
				if (resp.status === 200) {
					setUser(resp.data.data);
				}
			} catch (error) {
				if (error.response.status === 401) {
					localStorage.removeItem('user');
					window.location.href = '/';
				}
			}
		})();
	}, []);

	// if user is not logged in, redirect to login page
	if (!user) {
		return <Navigate to="/" />;
	}
}

