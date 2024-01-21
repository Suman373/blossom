import React, { useState } from 'react';
import './Signup.scss';
import logo from '../../../assets/blossomLogo.png';
import google from '../../../assets/google.png';
import { TextField } from '@mui/material';
import Warning from '../../../components/Warning/Warning';
import BlueButton from '../../../components/BlueButton/BlueButton';

const Signup = () => {

    // control signup or login button
    const [isSignup, setIsSignup] = useState(true);
    // state of loader
    const [loading, setLoading] = useState(true);

    // states for form
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // registration and login with credentials
    const handleCredsRegister = async () => {
        try {
            // registration

        } catch (error) {
            if (error.response) {
                console.log(error.response);
            } else {
                console(error);
            }
        }
    }


    const handleCredsLogin = async () => {
        try {
            // login
        } catch (error) {
            if (error.response) {
                console.log(error.response);
            } else {
                console(error);
            }
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
            <h1>Create your account</h1>
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
                <div style={{textAlign:'center'}}> 
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