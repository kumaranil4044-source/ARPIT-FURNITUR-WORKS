import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container section center nf">
      <div className="nf-code">404</div>
      <h1>That page has been planed away</h1>
      <p className="muted">
        The link you followed does not exist. The good news: the furniture is
        still where you left it.
      </p>
      <div className="nf-actions">
        <Link to="/" className="btn btn-primary">Back to home</Link>
        <Link to="/shop" className="btn btn-ghost">Browse shop</Link>
      </div>
    </div>
  );
}
