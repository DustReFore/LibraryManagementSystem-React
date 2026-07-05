import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="collapse navbar-collapse">
                    <Link className="navbar-brand" to="/">Home</Link>
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item"><Link className="nav-link" to="/books">Books</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/authors">Authors</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/readers">Readers</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/orders">Orders</Link></li>
                    </ul>
                    <Link className="btn btn-outline-dark" to="#">Login</Link>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;