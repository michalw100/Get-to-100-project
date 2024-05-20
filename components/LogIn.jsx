import React, { useState } from 'react';
 const logIn=({ setPlayersArray, playersArray })=> {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    function handleLogin() {
        if (!email || !password) {
            setLoginError('Please fill in all fields.');
            return;
        }
        let foundUser = JSON.parse(localStorage.getItem(email));
        if (!foundUser) {
            setLoginError("You are not exist in the system, please sign up");
        }
        else {
            if(foundUser.password === password ){
                let updatedPlayers = [...playersArray];
                updatedPlayers.push(foundUser);//תכניס את האובייקט החדש
                setPlayersArray(updatedPlayers);
                setEmail("");
                setPassword("");
                setLoginError('Registration successful');
            }
            else{
                setLoginError("no currect password")
            }
        }
    };
    return (
        <div >
            <h2 className="title">Log in</h2><br />
            <input type="email" className='input' value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} /><br />
            <input type="password" className='input' value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} /><br />
            <button className="btnOkLogIn" onClick={handleLogin}>Connect</button><br />
            {loginError && <p className='error' style={{ color: loginError=="Registration successful" ? 'green' : "red"}}>{loginError}</p>}
        </div>
    );
}
export default logIn