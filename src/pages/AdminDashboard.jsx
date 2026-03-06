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
  const [searchTerm, setSearchTerm] = useState("");

  const isTrash = activeTab.startsWith("trash-");
  const baseTab = activeTab.replace("trash-", "");
  const tableName = tableMap[baseTab] || "dealer_requests";
  const [tableOnly, setTableOnly] = useState(false);
  const [confirmBox, setConfirmBox] = useState({
    show: false,
    action: null,
    id: null,
    message: ""
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [activeTab, page, tableName, searchTerm]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setLastLogin(data.user.last_sign_in_at);
    });
  }, []);

  const fetchData = async () => {
    setLoading(true);

    try {
      let query = supabase
        .from(tableName)
        .select("*", { count: "exact" })
        .eq("is_deleted", isTrash)
        .order("created_at", { ascending: false });

      if (searchTerm === "") {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;
        query = query.range(from, to);
      }

      const { data: result, count, error } = await query;

      if (error) throw error;

      setData(result || []);
      setTotalCount(count || 0);

    } catch {
      toast.error("Failed to fetch ❌");
    }

    finally {
      setLoading(false);
    }
  };
  const softDelete = (id) => {
    setConfirmBox({
      show: true,
      action: "softDelete",
      id,
      message: "Are you sure you want to move this record to Trash?"
    });
  };

  const restoreItem = (id) => {
    setConfirmBox({
      show: true,
      action: "restore",
      id,
      message: "Are you sure you want to restore this record?"
    });
  };

  const permanentDelete = (id) => {
    setConfirmBox({
      show: true,
      action: "delete",
      id,
      message: "Are you sure you want to permanently delete this record?"
    });
  };

  const handleConfirmAction = async () => {
    const { action, id } = confirmBox;

    try {
      if (action === "softDelete") {
        const { error } = await supabase
          .from(tableName)
          .update({ is_deleted: true })
          .eq("id", id);

        if (error) throw error;
        toast.success("Moved to Trash 🗑️");
      }

      if (action === "restore") {
        const { error } = await supabase
          .from(tableName)
          .update({ is_deleted: false })
          .eq("id", id);

        if (error) throw error;
        toast.success("Restored ✅");
      }

      if (action === "delete") {
        const { error } = await supabase
          .from(tableName)
          .delete()
          .eq("id", id);

        if (error) throw error;
        toast.success("Deleted permanently 🚀");
      }

      fetchData();
    } catch (err) {
      toast.error("Action failed ❌");
    }

    setConfirmBox({ show: false, action: null, id: null, message: "" });
  };

  const exportData = () => {
    if (!filteredData.length) return toast.error("No data ❌");

    const headers = Object.keys(filteredData[0]).filter(
      (key) => !HIDDEN_COLUMNS.includes(key)
    );

    const csv = [
      headers.join(","),
      ...filteredData.map((row) =>
        headers.map((h) => row[h] ?? "").join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");

    const url = URL.createObjectURL(blob);

    link.href = url;
    link.download = `${activeTab}-page-${page}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    toast.success("Exported ✅");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login", { replace: true });
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE) || 1;

  const filteredData = !searchTerm
    ? data
    : data.filter((row) =>
      Object.keys(row)
        .filter((key) => !HIDDEN_COLUMNS.includes(key))
        .some((key) =>
          String(row[key] ?? "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
    );

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
              setSearchTerm("");
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
                  setSearchTerm("");
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
              <input
                type="text"
                placeholder="Search..."
                className="searchInput"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
              />

              {searchTerm && (
                <button
                  className="clearSearchBtn"
                  onClick={() => setSearchTerm("")}
                >
                  Clear
                </button>
              )}
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
            <div className="noDataMessage">Loading...</div>
          ) : !filteredData.length ? (
            <div className="noDataMessage">
              {searchTerm ? "No matching records found 🔍" : "No records available"}
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>SR. NO</th>
                  {Object.keys(filteredData[0] || {})
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
                {filteredData.map((row, index) => (
                  <tr key={row.id}>
                    <td>{(page - 1) * PAGE_SIZE + index + 1}</td>

                    {Object.keys(row)
                      .filter((k) => !HIDDEN_COLUMNS.includes(k))
                      .map((k) => (
                        <td key={k}>{row[k] ?? "-"}</td>
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
                ))}
              </tbody>
            </table>
          )}

        </div>

        {!tableOnly && totalCount > 0 && searchTerm === "" && (
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
      {confirmBox.show && (
        <div
          className="confirmOverlay"
          onClick={() =>
            setConfirmBox({ show: false, action: null, id: null, message: "" })
          }
        >
          <div
            className="confirmBox"
            onClick={(e) => e.stopPropagation()}
          >
            <p>{confirmBox.message}</p>

            <div className="confirmActions">
              <button
                className="cancelBtn"
                onClick={() =>
                  setConfirmBox({ show: false, action: null, id: null, message: "" })
                }
              >
                Cancel
              </button>

              <button
                className="confirmBtn"
                onClick={handleConfirmAction}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default AdminDashboard;