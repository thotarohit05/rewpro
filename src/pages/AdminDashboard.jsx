import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { FaUsers, FaPowerOff } from "react-icons/fa";
import { TiExport } from "react-icons/ti";
import { CgTrash, CgArrowsExpandUpLeft, CgArrowsExpandDownRight } from "react-icons/cg";
import { MdRestore } from "react-icons/md";
import { IoIosArrowDropdown } from "react-icons/io";
import { TbLayoutSidebarLeftExpand, TbLayoutSidebarRightExpand } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/admin.css";

const PAGE_SIZE = 5;
const HIDDEN_COLUMNS = ["id", "is_deleted", "created_at"];

const tableMap = {
  dealer: "dealer_requests",
  distributor: "distributor_requests",
  service: "service_bookings",
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dealer");
  const [trashOpen, setTrashOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [lastLogin, setLastLogin] = useState("");
  const [loading, setLoading] = useState(false);

  const isTrash = activeTab.startsWith("trash-");
  const baseTab = activeTab.replace("trash-", "");
  const tableName = tableMap[baseTab];
  const [tableOnly, setTableOnly] = useState(false);

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
      .from(tableName)
      .select("*", { count: "exact" })
      .eq("is_deleted", isTrash)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) toast.error("Failed to fetch ❌");
    else {
      setData(data || []);
      setTotalCount(count || 0);
    }

    setLoading(false);
  };

  const softDelete = async (id) => {
    await supabase.from(tableName).update({ is_deleted: true }).eq("id", id);
    toast.success("Moved to Trash 🗑️");
    fetchData();
  };

  const restoreItem = async (id) => {
    await supabase.from(tableName).update({ is_deleted: false }).eq("id", id);
    toast.success("Restored ✅");
    fetchData();
  };

  const permanentDelete = async (id) => {
    await supabase.from(tableName).delete().eq("id", id);
    toast.success("Deleted permanently 🚀");
    fetchData();
  };

  const exportData = () => {
    if (!data.length) return toast.error("No data ❌");

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

    toast.success("Exported ✅");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login", { replace: true });
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className={`adminLayout ${tableOnly ? "tableOnlyMode" : ""}`}>
      {/* Mobile Open Button */}
      {!mobileOpen && (
        <button
          className="mobileOpenBtn"
          onClick={() => setMobileOpen(true)}
        >
          <TbLayoutSidebarLeftExpand size={22} />
        </button>
      )}
      {mobileOpen && (
        <div
          className="sidebarBackdrop"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${mobileOpen ? "show" : ""}`}>
        <div className="sidebarHeader">
          <h3 className="logoText">REW</h3>

          {mobileOpen && (
            <button
              className="insideToggleBtn"
              onClick={() => setMobileOpen(false)}
            >
              <TbLayoutSidebarRightExpand size={20} />
            </button>
          )}
        </div>

        {Object.keys(tableMap).map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => {
              setActiveTab(tab);
              setPage(1);
              setTrashOpen(false);
              setMobileOpen(false);
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}

        <div className="trashSection">
          <button
            className={`sidebarItem trashBtn ${trashOpen ? "open" : ""}`}
            onClick={() => setTrashOpen(!trashOpen)}
          >
            <span>Trash</span>
            <IoIosArrowDropdown className="arrowIcon" />
          </button>

          <div className={`trashDropdown ${trashOpen ? "show" : ""}`}>
            {Object.keys(tableMap).map((tab) => (
              <button
                key={tab}
                className={activeTab === `trash-${tab}` ? "activeSub" : ""}
                onClick={() => {
                  setActiveTab(`trash-${tab}`);
                  setPage(1);
                  setMobileOpen(false);
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <button className="logout" onClick={handleLogout}>
          <FaPowerOff /> Logout
        </button>
      </div>

      {/* CONTENT */}
      <div className="content">
        {!tableOnly && (
          <>
            <div className="topBar">
              {lastLogin && (
                <p>Last Login: {new Date(lastLogin).toLocaleString()}</p>
              )}
            </div>

            <div className="countCard">
              <FaUsers size={22} />
              <div>
                <h3>Total Records</h3>
                <p>{totalCount}</p>
              </div>
            </div>
            <div className="topActions">
              <div className="activeTabHeader">
                {isTrash ? "Trash - " : ""}
                {baseTab.charAt(0).toUpperCase() + baseTab.slice(1)}
              </div>

              <button className="exportBtn" onClick={exportData}>
                <TiExport /> Export
              </button>
            </div>

          </>
        )}

        {/* TABLE */}
        <div className="tableWrapper">
          {/* MOBILE EXPAND BUTTON - ATTACHED TO TABLE */}
          <div className="expandBoxWrapper">
            <button
              className="expandBoxBtn"
              onClick={() => setTableOnly(!tableOnly)}
            >
              {tableOnly ? (
                <>
                  <CgArrowsExpandDownRight size={18} />
                  <span>Collapse</span>
                </>
              ) : (
                <>
                  <CgArrowsExpandUpLeft size={18} />
                  <span>Expand</span>
                </>
              )}
            </button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>SR. NO</th>
                  {data[0] &&
                    Object.keys(data[0])
                      .filter((k) => !HIDDEN_COLUMNS.includes(k))
                      .map((k) => (
                        <th key={k}>
                          {k.replace(/_/g, " ").toUpperCase()}
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
                        .filter((k) => !HIDDEN_COLUMNS.includes(k))
                        .map((k) => (
                          <td key={k}>{row[k]?.toString()}</td>
                        ))}

                      <td>
                        <div className="actionButtons">
                          {isTrash ? (
                            <>
                              <button
                                className="iconBtn restoreBtnIcon"
                                onClick={() => restoreItem(row.id)}
                              >
                                <MdRestore size={18} />
                              </button>

                              <button
                                className="iconBtn deleteBtnIcon"
                                onClick={() => permanentDelete(row.id)}
                              >
                                <CgTrash size={18} />
                              </button>
                            </>
                          ) : (
                            <button
                              className="iconBtn deleteBtnIcon"
                              onClick={() => softDelete(row.id)}
                            >
                              <CgTrash size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {!tableOnly && (
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
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminDashboard;