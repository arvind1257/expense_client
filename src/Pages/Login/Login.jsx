import { Link, useNavigate } from "react-router-dom"

import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Login.css"
import { useDispatch } from "react-redux"
import { logIn } from "../../Action/User"

const Login = ({ loading, onLoading }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    var mess = {}
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            alert("Email and Password can't be Empty")
        }
        else {
            onLoading(true);
            dispatch(logIn({email,password},navigate,onLoading))
        };
    }


return (
    <div className="row loginform">
        <fieldset className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-9 fieldset center">
            <form onSubmit={handleSubmit}>
                <h3 className="text">LOGIN</h3>
                <br />
                <center>
                    <div className="login__field">
                        <i className="login__icon bx bx-user"></i>
                        <input className="effect-8 login__input" type="text" name="username" placeholder="Email ID" onChange={(e) => setEmail(e.target.value)} />
                        <span className="focus-border">
                            <i></i>
                        </span>
                    </div>
                    <br />
                    <div className="login__field">
                        <i className="login__icon bx bx-lock"></i>
                        <input className="effect-8 login__input" type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <span className="focus-border">
                            <i></i>
                        </span>
                    </div>
                    <br />
                    <div className="login__field">
                        <Link className="flink" href="forgotpassword.php">
                            forgot password?
                        </Link>
                    </div>
                    {
                        mess.data && mess.data.status === "Error" && <>
                            <br /><br />
                            <div className="login__field" style={{ color: "red" }}>
                                {mess.data.message}
                            </div>
                        </>
                    }
                    {
                        mess.data && mess.data.status === "Success" && <>
                            <br /><br />
                            <div className="login__field" style={{ color: "green" }}>
                                {mess.data.message}
                            </div>
                        </>
                    }
                    {
                        !mess.data && <>
                            <br />
                        </>
                    }
                    <br />
                    <button className="button">
                        Login
                    </button>
                    <br />
                    <br />
                    <h4 className="line">
                        <span>or</span>
                    </h4>
                    <br />
                    <div>
                        Create an Account?&ensp;
                        <Link to="/Signup"
                            style={
                                {
                                    color: "blue",
                                    textDecoration: "underline"
                                }
                            }>
                            Sign Up
                        </Link>
                    </div>
                    <br />
                </center>
            </form>
        </fieldset>
    </div>
)
}

export default Login;
