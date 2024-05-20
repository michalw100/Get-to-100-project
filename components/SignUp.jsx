import React, { useState } from 'react';

const SignUp = ({ setPlayersArray}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUpError, setSignUpError] = useState('');
    function handleRegistration() {
        if (!name || !email || !password) {
            setSignUpError('Please fill in all fields.');
            return;
        }
        if (!ValidateEmail(email)) {
            return;
        }
        if (!CheckPassword(password)) {
            return;
        }
        let user = {
            name: name,
            email: email,
            password: password,
            scores: [],
            enable: false
        }
        let foundUser = JSON.parse(localStorage.getItem(email));
        if (foundUser) {
            setSignUpError('User exists, please logIn');
        }
        else {
            localStorage.setItem(email, JSON.stringify(user));
            setPlayersArray(prevPlayersArr => [...prevPlayersArr, user]);
            setEmail("");
            setName("");
            setPassword("");
            setSignUpError('Registration successful');
        }
    }
    function ValidateEmail(mailAdress) {
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (mailAdress.match(mailformat)) {
            return true;
        } else {
            setSignUpError("You have entered an invalid email address!");
            return false;
        }
    }
    function CheckPassword(password) {
        let psw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;
        if (password.match(psw)) {
            return true;
        } else {
            setSignUpError('Wrong password...! The password must contain letters and numbers');
            return false;
        }
    }
    return (
        <div >
            <h2 className="title">Create Account</h2><br/>
            <input type="text" className='input' value={name} placeholder="name" onChange={(e) => setName(e.target.value)} /><br />
            <input type="email" className='input' value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} /><br />
            <input type="password" className='input' value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} /><br />
            <button className="btnOkSignUp" onClick={handleRegistration}>Connect</button><br />
            {signUpError && <p className='error' style={{ color: signUpError == "Registration successful" ? 'green' : "red" }}>{signUpError}</p>}
        </div>
    )
};

export default SignUp;