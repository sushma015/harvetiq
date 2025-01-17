import { useState } from "react";

function Login() {
    const [log, setLog] = useState("log");

    function changeSlide() {
        let login = document.getElementById("login");
        let signup = document.getElementById("signup");
        if (log === "log") {
            login.style.animation = "login-flip 1s forwards ease-in-out";
            signup.style.animation = "rotate .7s forwards .2s";
        } else {
            signup.style.animation = "signup-flip 1.5s forwards ease-in-out";
            login.style.animation = "rotate .7s forwards";
        }
    }

    function goToHomeScreen() {
        window.location.href = "/home"; // Replace "/home" with the URL of your home screen
    }

    return (
        <div id="log">
            <div id="login">
                <center><h1 id="titlelog">HarvestIQ</h1></center>
                <input type="email" placeholder="Email" id="mail"></input><br></br>
                <input type="password" placeholder="Password" id="pwd"></input><br></br>
                <input type="submit" value="Login" id="log-btn" onClick={goToHomeScreen}></input><br></br>
                <span id="link-text">Don't have an account <button type="submit" id="link" onClick={() => {
                    setLog("log");
                    changeSlide(true);
                }}>SignUp</button></span>
            </div>
            <div id="signup">
                <center><h1 id="titlelog">HarvestIQ</h1></center>
                <input type="text" placeholder="Username" id="un" required></input><br></br>
                <input type="email" placeholder="Email" id="mail"></input><br></br>
                <input type="password" placeholder="Password" id="pwd"></input><br></br>
                <input type="password" placeholder="Confirm Password" id="cpwd"></input><br></br>
                <input type="submit" value="SignUp" id="log-btn" onClick={goToHomeScreen}></input><br></br>
                <span id="link-text">Already had an account <button id="link" onClick={() => {
                    setLog("sign");
                    changeSlide(false);
                }}>Login</button></span>
            </div>
        </div>
    );
}

export default Login;
