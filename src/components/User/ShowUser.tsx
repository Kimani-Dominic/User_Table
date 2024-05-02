import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Common/Loader';
import { useUserState, User } from '../context/usercontext'; // Assuming correct import path

const ShowUser: React.FC = () => {
  const { state: { users, isLoading, error }, dispatch } = useUserState();

  const handleDelete = (id: number): void => {
    //deleteUser(dispatch, id); // Dispatch action to delete user
  };

  return (
    <div className="mt-5 d-flex justify-content-center"> {/* Align the container at the center */}
      <div className="table-container"> {/* Apply styles to the table container */}
        {isLoading && <Loader />} {/* Show loader if data is loading */}
        {error && <p>Error: {error}</p>} {/* Show error message if there's an error */}
        {users.length === 0 ? (
          <h1>No users found</h1>
        ) : (
          <table className="table table-striped classic-table"> {/* Apply styles to the table */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Link to={`/edit-user/${user.id}`}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </Link>
                    <Link to={`/user/${user.id}`}>
                      <i className="fa fa-eye" aria-hidden="true"></i>
                    </Link>
                    <i className="fa fa-trash-o" aria-hidden="true" onClick={() => handleDelete(user.id)}></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ShowUser;
