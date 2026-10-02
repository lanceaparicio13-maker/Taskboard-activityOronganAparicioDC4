import { useState } from 'react';
import { api } from './api';

function LogoutButton({ onLogout }) {
    const [loading, setLoading] = useState(false);

    async function handleLogout() {
        setLoading(true);

        try {
            await api('/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('token');
            onLogout();
            setLoading(false);
        }
    }

    return (
        <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
        >
            {loading ? 'Logging out...' : 'Logout'}
        </button>
    );
}

export default LogoutButton;