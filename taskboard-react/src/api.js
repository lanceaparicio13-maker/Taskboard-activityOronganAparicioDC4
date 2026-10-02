const API_URL = 'http://localhost:8000/api';

export async function api(path, options = {}) {
    const token = localStorage.getItem('token');

    const headers = {
        Accept: 'application/json',
        ...options.headers,
    };

    if (options.body) {
        headers['Content-Type'] = 'application/json';
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    });

    let data = null;

    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
        data = await response.json();
    }

    if (!response.ok) {
        const message =
            data?.message ||
            data?.errors?.email?.[0] ||
            data?.errors?.name?.[0] ||
            'Something went wrong.';

        throw new Error(message);
    }

    return data;
}