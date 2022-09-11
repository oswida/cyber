import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export const GRouter = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const id = searchParams.get("id");
    if (!id) navigate("/npc");
    switch (id) {
      case "npc":
        navigate("/npc", { replace: false });
        break;
      case "corpo":
        navigate("/corpo", { replace: false });
        break;
      default:
        navigate("/npc", { replace: false });
        break;
    }
  }, []);
  return <></>;
};
