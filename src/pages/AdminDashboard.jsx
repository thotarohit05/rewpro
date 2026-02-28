// import { useEffect, useState } from "react";
// import { supabase } from "../supabaseClient";
// import { FaUsers, FaPowerOff  } from "react-icons/fa";
// import { TiExport } from "react-icons/ti";
// import { CgTrash } from "react-icons/cg";
// import "../styles/admin.css";

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState("dealer");
//   const [data, setData] = useState([]);
//   const [lastLogin, setLastLogin] = useState("");

//   const getTableName = () => {
//     if (activeTab === "dealer") return "dealer_requests";
//     if (activeTab === "distributor") return "distributor_requests";
//     return "service_bookings";
//   };

//   /* ================= AUTH + LAST LOGIN ================= */
//   useEffect(() => {
//     const checkUser = async () => {
//       const { data: userData } = await supabase.auth.getUser();

//       if (!userData.user) {
//         window.location.href = "/admin-login";
//         return;
//       }

//       setLastLogin(userData.user.last_sign_in_at);
//     };

//     checkUser();
//   }, []);

//   /* ================= FETCH DATA ================= */
//   useEffect(() => {
//     fetchData();
//   }, [activeTab]);

//   const fetchData = async () => {
//     const { data } = await supabase
//       .from(getTableName())
//       .select("*")
//       .eq("is_deleted", false)
//       .order("created_at", { ascending: false });

//     setData(data || []);
//   };

//   /* ================= SOFT DELETE ================= */
//   const softDelete = async (id) => {
//     await supabase
//       .from(getTableName())
//       .update({ is_deleted: true })
//       .eq("id", id);

//     fetchData();
//   };

//   /* ================= EXPORT ================= */
//   const exportData = () => {
//     if (data.length === 0) return;

//     const headers = Object.keys(data[0]);
//     const rows = data.map((row) =>
//       headers.map((header) => `"${row[header] ?? ""}"`).join(",")
//     );

//     const csv = [headers.join(","), ...rows].join("\n");

//     const blob = new Blob([csv], { type: "text/csv" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = `${activeTab}.csv`;
//     link.click();
//   };

//   return (
//     <div className="adminLayout">

//       {/* ===== Sidebar ===== */}
//       <div className="sidebar">
//         <h3>Admin Panel</h3>

//         <button
//           className={activeTab === "dealer" ? "active" : ""}
//           onClick={() => setActiveTab("dealer")}
//         >
//           Dealer
//         </button>

//         <button
//           className={activeTab === "distributor" ? "active" : ""}
//           onClick={() => setActiveTab("distributor")}
//         >
//           Distributor
//         </button>

//         <button
//           className={activeTab === "service" ? "active" : ""}
//           onClick={() => setActiveTab("service")}
//         >
//           Service
//         </button>

//         <button
//           className="logout"
//           onClick={async () => {
//             await supabase.auth.signOut();
//             window.location.href = "/admin-login";
//           }}
//         >
//           <FaPowerOff  /> Logout
//         </button>
//       </div>

//       {/* ===== Main Content ===== */}
//       <div className="content">

//         <div className="topBar">
//           {/* <h2>{activeTab.toUpperCase()} RECORDS</h2> */}
//           <p>Last Login: {new Date(lastLogin).toLocaleString()}</p>
//         </div>

//         {/* Count Card */}
//         <div className="countCard">
//           <FaUsers size={25} />
//           <div>
//             <h3>Total Records</h3>
//             <p>{data.length}</p>
//           </div>
//         </div>

//         <button className="exportBtn" onClick={exportData}>
//           <TiExport /> Export
//         </button>

//         {/* Table */}
//         <div className="tableWrapper">
//           <table>
//             <thead>
//               <tr>
//                 {data[0] &&
//                   Object.keys(data[0]).map((key) => (
//                     <th key={key}>{key}</th>
//                   ))}
//                 <th>Delete</th>
//               </tr>
//             </thead>

//             <tbody>
//               {data.map((row) => (
//                 <tr key={row.id}>
//                   {Object.values(row).map((val, i) => (
//                     <td key={i}>{val?.toString()}</td>
//                   ))}
//                   <td>
//                     <button onClick={() => softDelete(row.id)}>
//                       <CgTrash  />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;