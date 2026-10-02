import { useState } from 'react';
import LoginForm from './LoginForm';
import ProjectList from './ProjectList';
import AddProjectForm from './AddProjectForm';
import LogoutButton from './LogoutButton';

function App() {
    const [token, setToken] = useState(
        localStorage.getItem('token')
    );

    const [refreshKey, setRefreshKey] = useState(0);

    function handleLogin(newToken) {
        setToken(newToken);
    }

    function handleLogout() {
        setToken(null);
    }

    function handleProjectAdded() {
        setRefreshKey((current) => current + 1);
    }

    if (!token) {
        return (
            <main className="container">
                <LoginForm onLogin={handleLogin} />
            </main>
        );
    }

    return (
        <main className="container">
            <header className="header">
                <div>
                    <h1>TaskBoard</h1>
                    <p>Manage your projects and tasks.</p>
                </div>

                <LogoutButton onLogout={handleLogout} />
            </header>

            <AddProjectForm
                onProjectAdded={handleProjectAdded}
            />

            <ProjectList refreshKey={refreshKey} />
        </main>
    );
}

export default App;