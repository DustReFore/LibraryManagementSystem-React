import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <header className="text-center my-5">
                <h1 className="display-4">Library Management System</h1>
                <p className="lead">Manage books, authors, and readers in one place</p>
                <Link className="btn btn-primary btn-lg" to="/books">Go to Book Catalog</Link>
            </header>

            <div className="container my-5">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">Book Catalog</h5>
                                <p className="card-text">View, add, and edit books.</p>
                                <Link to="/books" className="btn btn-primary">Open</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">Authors</h5>
                                <p className="card-text">Manage registered authors.</p>
                                <Link to="/authors" className="btn btn-primary">Open</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">Readers</h5>
                                <p className="card-text">Manage registered readers.</p>
                                <Link to="/readers" className="btn btn-primary">Open</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" crossOrigin="anonymous"></script>
        </div>
    )
}

export default HomePage;