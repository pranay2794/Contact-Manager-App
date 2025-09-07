import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  listContacts,
  createContact,
  updateContact,
  deleteContact,
  getContactDetails,
} from "../../redux/actions/contactActions";
import { logout } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [editId, setEditId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const contactList = useSelector((state: RootState) => state.contactList);
  const { contacts, loading, error } = contactList;

  const contactDetails = useSelector((state: RootState) => state.contactDetails);
  const contactCreate = useSelector((state: RootState) => state.contactCreate);
  const contactUpdate = useSelector((state: RootState) => state.contactUpdate);
  const contactDelete = useSelector((state: RootState) => state.contactDelete);
  const userLogin = useSelector((state: RootState) => state.userLogin);

  const username = userLogin.userInfo?.user.username;

  useEffect(() => {
    dispatch<any>(listContacts());
  }, [dispatch]);

  useEffect(() => {
    if (contactDetails.contact && editId) {
      setForm({
        name: contactDetails.contact.name,
        email: contactDetails.contact.email,
        phone: contactDetails.contact.phone,
      });
    }
  }, [contactDetails.contact, editId]);

  useEffect(() => {
    if (error) toast.error(error);
    if (contactCreate.error) toast.error(contactCreate.error);
    if (contactUpdate.error) toast.error(contactUpdate.error);
    if (contactDelete.error) toast.error(contactDelete.error);
  }, [error, contactCreate.error, contactUpdate.error, contactDelete.error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      dispatch<any>(updateContact(editId, form));
      setEditId(null);
    } else {
      dispatch<any>(createContact(form));
    }
    setForm({ name: "", email: "", phone: "" });
  };

  const handleSelect = (id: string) => {
    setEditId(id);
    dispatch<any>(getContactDetails(id));
  };

  const handleDelete = (id: string) => {
    dispatch<any>(deleteContact(id));
    if (editId === id) {
      setEditId(null);
      setForm({ name: "", email: "", phone: "" });
    }
  };

  const handleLogout = () => {
    dispatch<any>(logout());
    navigate("/");
  };

  // Filter contacts by name
  const filteredContacts = contacts && contacts.filter((contact: any) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col-12">
          <div className="p-4 rounded shadow bg-primary text-white text-center">
            <h2 className="mb-2">Welcome{username ? `, ${username}` : ''}!</h2>
            <p className="lead">Here are your contacts. Manage them easily!</p>
          </div>
        </div>
      </div>
      <h1 className="mb-4">Dashboard</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3 d-grid">
            <button type="submit" className="btn btn-primary">
              {editId ? "Update Contact" : "Add Contact"}
            </button>
          </div>
        </div>
      </form>
      <div className="row mb-3">
        <div className="col-md-6 mx-auto">
          <input
            type="text"
            className="form-control form-control-lg shadow-sm"
            placeholder="Search contacts by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts && filteredContacts.map((contact: any) => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleSelect(contact._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(contact._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
