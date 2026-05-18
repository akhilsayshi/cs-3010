import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api';

function Registration({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (password !== repeatPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
    try {
      const data = await registerUser(username, password);
      onRegister(username, data.userId);
      navigate('/');
    } catch (err) {
      if (err.message === 'Username already exists.') {
        setError(<><span>{err.message} </span><Link to="/login">Click here to log in.</Link></>);
      } else {
        setError('Could not connect to server. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUsername('');
    setPassword('');
    setRepeatPassword('');
    setError('');
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Registration</h2>

              {error && (
                <div className="alert alert-danger" role="alert">{error}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">User Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="repeatPassword" className="form-label">Repeat Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="repeatPassword"
                    name="repeatPassword"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Registering...' : 'Submit'}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={handleReset} disabled={loading}>
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
