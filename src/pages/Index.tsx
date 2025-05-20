
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// This is a redirect page that will redirect to the home page
export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null;
}
