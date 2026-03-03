import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Spinner from "./Spinner";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        setAuthenticated(true);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return <Spinner />;

  if (!authenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default ProtectedRoute;