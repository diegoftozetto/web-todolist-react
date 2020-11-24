import { Link, NavLink } from "react-router-dom";
import "./Header.css"

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/home">To Do List</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-link" to="/home">Home</NavLink>
          <NavLink className="nav-link" to="/task">Nova Tarefa</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Header;
