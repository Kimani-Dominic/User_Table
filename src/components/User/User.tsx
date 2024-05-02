import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    // Fetch user data from local storage or some other client-side storage mechanism
    const userData = localStorage.getItem(`user_${id}`);
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [id]);

  return (
    <div className="user mt-5">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{user.phone}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EditUser;
