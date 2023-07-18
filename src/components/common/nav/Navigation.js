import { Link } from "react-router-dom";
import { HOME } from "../../../config/routes/path";

export const Navigation = () => {
  return (
    <>
      <nav
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Link to={HOME}>Home</Link>
      </nav>
    </>
  );
};
