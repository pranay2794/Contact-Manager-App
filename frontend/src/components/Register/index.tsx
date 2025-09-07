import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/actions/userActions';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRegister = useSelector((state: RootState) => state.userRegister);
  const { loading, error } = userRegister;

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch<any>(register(username, email, password));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Register</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <div className="alert alert-info">Loading...</div>}
            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" name="username" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <button type="submit" className="btn btn-success w-50 me-2" onClick={() => navigate('/login')}>Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
