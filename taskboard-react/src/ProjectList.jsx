import { useEffect, useState } from 'react';
import { api } from './api';

function ProjectList({ refreshKey }) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadProjects() {
            setLoading(true);
            setError('');

            try {
                const data = await api('/projects');

                setProjects(data.data || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadProjects();
    }, [refreshKey]);

    if (loading) {
        return <p>Loading projects...</p>;
    }

    if (error) {
        return (
            <div className="error">
                {error}
            </div>
        );
    }

    return (
        <section>
            <h2>Your Projects</h2>

            {projects.length === 0 ? (
                <p>No projects yet.</p>
            ) : (
                <div className="project-list">
                    {projects.map((project) => (
                        <div className="project-card" key={project.id}>
                            <h3>{project.name}</h3>

                            {project.description && (
                                <p>{project.description}</p>
                            )}

                            <p>
                                Tasks: {project.tasks_count ?? 0}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default ProjectList;