function VisitorTable({ visitors, isAdmin, onView, onCheckOut, onEdit, onDelete }) {
  return (
    <table className="table table-striped table-bordered align-middle">
      <thead className="table-dark">
        <tr>
          <th>Name</th>
          <th>Mobile</th>
          <th>Organization</th>
          <th>Person To Meet</th>
          <th>Purpose</th>
          <th>Date &amp; Time</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {visitors.length === 0 ? (
          <tr>
            <td colSpan="8" className="text-center">No visitors found</td>
          </tr>
        ) : (
          visitors.map((v) => (
            <tr key={v._id}>
              <td>{v.visitorName}</td>
              <td>{v.mobile}</td>
              <td>{v.organization || '-'}</td>
              <td>{v.personToMeet}</td>
              <td>{v.purpose}</td>
              <td>{new Date(v.visitDateTime).toLocaleString('en-IN')}</td>
              <td>
                <span className={`badge ${v.status === 'Checked In' ? 'bg-success' : 'bg-secondary'}`}>
                  {v.status}
                </span>
              </td>
              <td>
                <button className="btn btn-sm btn-info me-1" onClick={() => onView(v._id)}>
                  View
                </button>
                {isAdmin && v.status === 'Checked In' && (
                  <button className="btn btn-sm btn-warning me-1" onClick={() => onCheckOut(v)}>
                    Check Out
                  </button>
                )}
                {isAdmin && (
                  <>
                    <button className="btn btn-sm btn-primary me-1" onClick={() => onEdit(v)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => onDelete(v._id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default VisitorTable;