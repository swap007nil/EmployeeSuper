function Navbar({ username, role, onLogout }) {
  return (
    <nav className="navbar navbar-dark bg-dark mb-4">
      <div className="container">
        <span className="navbar-brand mb-0 h1">EmployeeSuper</span>
        <div className="d-flex align-items-center gap-3">
          <span className="text-light">
            {username}{' '}
            <span className={`badge ${role === 'admin' ? 'bg-warning text-dark' : 'bg-info text-dark'}`}>
              {role}
            </span>
          </span>
          <button className="btn btn-sm btn-outline-light" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;