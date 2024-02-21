import React, { useState } from 'react';
import './Signup.scss';
import logo from '../../../assets/blossomLogo.png';
import google from '../../../assets/google.png';
import { TextField } from '@mui/material';
import Warning from '../../../components/Warning/Warning';
import BlueButton from '../../../components/BlueButton/BlueButton';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Signup = ({ setUser }) => {

    const navigate = useNavigate();

    // control signup or login button
    const [isSignup, setIsSignup] = useState(true);
    // state of loader
    const [loading, setLoading] = useState(false);

    // states for form
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // registration and login with credentials
    const handleCredsRegister = async () => {
        try {
            setLoading(true);
            // registration
            if (!name || !email || !password) {
                toast.error("Fill the details correctly");
                return;
            }
            const data = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/auth/registration`, {
                name, email, password
            });
            if (!data) {
                throw new Error("Registration failed");
            }
            toast.success("Registration success");
            setLoading(false);
            setName(""); setEmail(""); setPassword("");
            setIsSignup(false); // login with creds

        } catch (error) {
            if (error.response) {
                console.log(error.response);
                if (error.response.status == 400) {
                    toast.error(error.response?.data?.message); // email password validation message
                }
            } else {
                console.log(error);
            }
            setLoading(false);
        }
    }


    const handleCredsLogin = async () => {
        try {
            setLoading(true);
            // login
            if (!email || !password) {
                toast.error("Fill the details correctly");
                return;
            }
            const data = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/auth/login`, {
                email, password
            }, { withCredentials: true });

            // failed
            if (!data?.data?.user) {
                throw new Error();
            }
            // success
            setUser(data?.data?.user);
            setLoading(false);
            toast.success("Login success");
            localStorage.setItem('blossomUserObj', JSON.stringify(data?.data?.user));
            setEmail(""); setPassword("");
            if (!data?.data?.user?.completedDetails) {
                navigate('/user-details');
                return;
            }
            navigate('/');
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                if (error.response.status == 400) {
                    toast.error(error.response?.data?.message); // email password validation message
                }
            } else {
                console.log(error);
                toast.error('Login failed');
            }
            setLoading(false);
        }

    }

    // google authentication with Oauth2.0
    const handleOAuthRegister = () => {
        window.open(`${import.meta.env.VITE_API_ENDPOINT}/auth/google/callback`, "_self");
    }
    const handleOAuthLogin = () => {
        window.open(`${import.meta.env.VITE_API_ENDPOINT}/auth/google/callback`, "_self");

    }

    return (
        <div className='signup-wrapper'>
            <img src={logo} className='logo' alt="logo" />
            <h1>{isSignup ? "Create your account" : "Sign in"}</h1>
            <div className="creds-component">
                <form>
                    {
                        isSignup && (<TextField
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            label="Name" />)
                    }

                    <TextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        label="Email" />

                    <TextField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        label="Password" />
                </form>
                <div style={{ textAlign: 'center' }}>
                    {
                        isSignup ?
                            <BlueButton
                                loading={loading}
                                handleClick={handleCredsRegister}
                                text={"Register"}
                            />
                            :
                            <BlueButton
                                loading={loading}
                                handleClick={handleCredsLogin}
                                text={"Login"} />
                    }
                </div>

            </div>
            <div className="or">
                OR
            </div>
            <div className="oauth-component">
                {
                    isSignup ?
                        <>
                            <button disabled className="google-button"
                                onClick={handleOAuthRegister}
                            >
                                <img src={google} alt="google" />Sign up with Google
                            </button>
                            <p>Already have an account ?
                                <span
                                    className="auth-toggle"
                                    onClick={() => setIsSignup(!isSignup)}
                                > Login</span> </p>
                        </>
                        :
                        <>
                            <button disabled className='google-button'
                                onClick={handleOAuthLogin}
                            >
                                <img src={google} alt="google" />Log in with Google
                            </button>
                            <p>Don't have an account ?
                                <span
                                    className='auth-toggle'
                                    onClick={() => setIsSignup(!isSignup)}
                                > Sign up</span></p>
                        </>
                }

                <Warning text={"Google Authentication is disabled in production mode due to some problems"} />
            </div>
        </div>
    )
}

export default Signup;