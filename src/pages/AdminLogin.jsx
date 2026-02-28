// import { useState } from "react";
// import { supabase } from "../supabaseClient";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       alert("Invalid credentials");
//       return;
//     }

//     navigate("/admin");
//   };

//   return (
//     <div style={{ padding: "140px" }}>
//       <h2>Admin Login</h2>

//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           required
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           required
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;