import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./User.css";

interface User {
  name: string;
  email: string;
  phone: string;
}

const EditUser: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from local storage or any other client-side storage
    const userDataFromLocalStorage = localStorage.getItem(`user_${id}`);
    if (userDataFromLocalStorage) {
      setUser(JSON.parse(userDataFromLocalStorage));
    }
  }, [id]);

  const handelInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handelSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Update user data in local storage
    localStorage.setItem(`user_${id}`, JSON.stringify(user));

    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
      navigate("/show-user");
    }, 1000);
  };

  return (
    <div className="user-form">
      <div className="heading">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <p>Edit Form</p>
      </div>
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={user.name}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handelInput}
          />
        </div>
        <button type="submit" className="btn btn-primary submit-btn">
          EDIT
        </button>
      </form>
    </div>
  );
};

export default EditUser;
