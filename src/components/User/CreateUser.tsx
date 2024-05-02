import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Common/Loader';
import './User.css';

const CreateUser: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [users, setUsers] = useState<Array<{ name: string; email: string; phone: string }>>([]);
    const [user, setUser] = useState<{ name: string; email: string; phone: string }>({
        name: '',
        email: '',
        phone: '',
    });

    const handelInput = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handelSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        // Update local state with the new user
        setUsers([...users, user]);
        // Clear the input fields
        setUser({ name: '', email: '', phone: '' });
        // Navigate to the show-user page
        navigate('/show-user');
    };

    return (
        <div className='user-form'>
            <div className='heading'>
                {isLoading && <Loader />}
                {error && <p>Error: {error}</p>}
                <p>User Form</p>
            </div>
            <form onSubmit={handelSubmit}>
                <div className='mb-3'>
                    <label htmlFor='name' className='form-label'>
                        Name
                    </label>
                    <input
                        type='text'
                        className='form-control'
                        id='name'
                        name='name'
                        value={user.name}
                        onChange={handelInput}
                    />
                </div>
                <div className='mb-3 mt-3'>
                    <label htmlFor='email' className='form-label'>
                        Email
                    </label>
                    <input
                        type='email'
                        className='form-control'
                        id='email'
                        name='email'
                        value={user.email}
                        onChange={handelInput}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='pwd' className='form-label'>
                        Phone
                    </label>
                    <input
                        type='text'
                        className='form-control'
                        id='phone'
                        name='phone'
                        value={user.phone}
                        onChange={handelInput}
                    />
                </div>
                <button type='submit' className='btn btn-primary submit-btn'>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateUser;
