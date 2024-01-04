import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="d-fles flex-column justify-content-center align-items-center mt-5">
      <FaExclamationTriangle className="text-danger" size="5em" />
      <h1 className="text-center">Page Not Found</h1>
      <p className="lead">
        Sorry, this page does not exist. Please go back to the
        <Link to="/">home page</Link>.
      </p>
    </div>
  );
}
