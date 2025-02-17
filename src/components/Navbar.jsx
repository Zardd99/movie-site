import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <nav className="navbar bg-dark p-4 md:px-8 md:py-4 flex justify-between items-center">
        <div className="navbar-brand text-xl md:text-2xl font-bold">
          <Link to="/">Movie App</Link>
        </div>
        <div className="navbar-links flex gap-4 md:gap-8">
          <Link
            to="/"
            className="nav-link text-base p-2 md:py-2 md:px-4 hover:bg-slate-500"
          >
            Home
          </Link>
          <Link
            to="/Favorites"
            className="nav-link text-base p-2 md:py-2 md:px-4 hover:bg-slate-500"
          >
            Favorites
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
