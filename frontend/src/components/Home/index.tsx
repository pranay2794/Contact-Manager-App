import React from "react";
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-lg border-0">
                        <div className="card-body p-5 text-center bg-light">
                            <h1 className="display-4 mb-3 text-primary fw-bold">Contact Manager App</h1>
                            <p className="lead mb-4">Easily manage your personal and professional contacts in one secure place.</p>
                            <ul className="list-group list-group-flush mb-4">
                                <li className="list-group-item">✔️ Add, edit, and delete contacts</li>
                                <li className="list-group-item">✔️ Search and filter your contacts</li>
                                <li className="list-group-item">✔️ User authentication for privacy</li>
                                <li className="list-group-item">✔️ Responsive and modern UI</li>
                            </ul>
                            <div className="d-flex justify-content-center gap-3">
                                <button className="btn btn-primary btn-lg px-4" onClick={()=>navigate("/login")}>Login</button>
                                <button className="btn btn-success btn-lg px-4" onClick={()=>navigate("/register")}>Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;