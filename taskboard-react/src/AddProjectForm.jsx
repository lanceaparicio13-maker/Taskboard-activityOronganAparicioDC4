import { useState } from 'react';
import { api } from './api';

function AddProjectForm({ onProjectAdded }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        setError('');
        setLoading(true);

        try {
            const data = await api('/projects', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    description: description || null,
                }),
            });

            onProjectAdded(data.data);

            setName('');
            setDescription('');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="card">
            <h2>Add Project</h2>

            {error && (
                <div className="error">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <label>
                    Project Name
                </label>

                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Project name"
                    required
                />

                <label>
                    Description
                </label>

                <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Project description"
                    rows="3"
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Project'}
                </button>
            </form>
        </div>
    );
}

export default AddProjectForm;