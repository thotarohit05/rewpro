import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { FaUsers, FaPowerOff } from "react-icons/fa";
import { TiExport } from "react-icons/ti";
import { CgTrash } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/admin.css";

const PAGE_SIZE = 5;
const HIDDEN_COLUMNS = ["id", "is_deleted", "created_at"];

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dealer");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [lastLogin, setLastLogin] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const getTableName = () =>
    activeTab === "dealer"
      ? "dealer_requests"
      : activeTab === "distributor"
      ? "distributor_requests"
      : "service_bookings";

  useEffect(() => {
    fetchData();
  }, [activeTab, page]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setLastLogin(data.user.last_sign_in_at);
    });
  }, []);

  const fetchData = async () => {
    setLoading(true);

    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, count, error } = await supabase
      .from(getTableName())
      .select("*", { count: "exact" })
      .eq("is_deleted", false)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      toast.error("Failed to fetch data ❌");
    } else {
      setData(data || []);
      setTotalCount(count || 0);
    }

    setLoading(false);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowPopup(true);
  };

  const softDelete = async () => {
    const { error } = await supabase
      .from(getTableName())
      .update({ is_deleted: true })
      .eq("id", deleteId);

    if (error) {
      toast.error("Delete failed ❌");
    } else {
      setData((prev) => prev.filter((item) => item.id !== deleteId));
      setTotalCount((prev) => prev - 1);
      toast.success("Successfully deleted ✅");
    }

    setShowPopup(false);
    setDeleteId(null);
  };

  const exportData = () => {
    if (!data.length) return toast.error("No data to export ❌");

    const headers = Object.keys(data[0]).filter(
      (key) => !HIDDEN_COLUMNS.includes(key)
    );

    const csv = [
      headers.join(","),
      ...data.map((row) =>
        headers.map((h) => `"${row[h] ?? ""}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${activeTab}-page-${page}.csv`;
    link.click();

    toast.success("Exported successfully ✅");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully 👋");
    navigate("/admin-login", { replace: true });
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="adminLayout">
      <div className="sidebar">
        <h3>REW</h3>

        {["dealer", "distributor", "service"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => {
              setActiveTab(tab);
              setPage(1);
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}

        <button className="logout" onClick={handleLogout}>
          <FaPowerOff className="logoutIcon" />
          Logout
        </button>
      </div>

      <div className="content">
        <div className="topBar">
          <p>
            Last Login:{" "}
            {lastLogin && new Date(lastLogin).toLocaleString()}
          </p>
        </div>

        <div className="countCard">
          <FaUsers size={22} />
          <div>
            <h3>Total Records</h3>
            <p>{totalCount}</p>
          </div>
        </div>

        <button className="exportBtn" onClick={exportData}>
          <TiExport /> Export
        </button>

        <div className="tableWrapper">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>SR. NO</th>
                  {data[0] &&
                    Object.keys(data[0])
                      .filter((key) => !HIDDEN_COLUMNS.includes(key))
                      .map((key) => (
                        <th key={key}>
                          {key.replace(/_/g, " ").toUpperCase()}
                        </th>
                      ))}
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {!data.length ? (
                  <tr>
                    <td colSpan="100%">No records found</td>
                  </tr>
                ) : (
                  data.map((row, index) => (
                    <tr key={row.id}>
                      <td>{(page - 1) * PAGE_SIZE + index + 1}</td>

                      {Object.keys(row)
                        .filter((key) => !HIDDEN_COLUMNS.includes(key))
                        .map((key) => (
                          <td key={key}>{row[key]?.toString()}</td>
                        ))}

                      <td>
                        <button onClick={() => confirmDelete(row.id)}>
                          <CgTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>

          <span>
            Page {page} of {totalPages || 1}
          </span>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="modalOverlay">
          <div className="modalBox">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this record?</p>

            <div className="modalActions">
              <button
                onClick={() => setShowPopup(false)}
                className="cancelBtn"
              >
                No
              </button>
              <button onClick={softDelete} className="deleteBtn">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
};

export default AdminDashboard;