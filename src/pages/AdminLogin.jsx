import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import "../styles/adminLogin.css";
import logo from "../assets/logo.png";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg("Invalid email or password");
      return;
    }

    navigate("/admin", { replace: true });
  };
  return (
    <div className="adminWrapper">
      <div className="adminLeft">
        <img src={logo} alt="Company Logo" className="adminLogo" />
      </div>

      <div className="adminRight">
        <div className="adminLoginBox">
          <h2>Admin Login</h2>

          <form onSubmit={handleLogin}>
            <div className="inputGroup">
              <input
                type="email"
                placeholder="Enter Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="inputGroup">
              <input
                type="password"
                placeholder="Enter Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {errorMsg && <p className="errorText">{errorMsg}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;