import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../authUtil";

export function ProtectedRoute({ children }) {
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const user = await checkAuth();
      if (!user) {
        alert("Unauthorized access. Please log in.");
        navigate("/");
      } else {
        setAuthChecked(true);
      }
    })();
  }, []);

  // Return the protected component only after auth is verified
  return authChecked ? children : null;
}
