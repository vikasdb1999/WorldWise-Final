import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";



export default function Login() {

  const [email, setEmail] = useState("vikas@example.com");
  const [password, setPassword] = useState("qwerty");
  const {login,isAuthenticated} = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
 
    if(isAuthenticated)
    {
       navigate("/app",{replace: true});
    }
},[isAuthenticated,navigate])


  function userLogin(e)
  {
     e.preventDefault();
     if(email && password)
     {
     login(email,password);
     <Navigate to={"/app"} />
     }
  }
  return (
     <main className={styles.login}>
        <PageNav />
      <form onSubmit={userLogin} className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div  >
          <button type="submit" className={styles.loginButton}>Login</button>
        </div>
      </form>
    </main>
  );
}
