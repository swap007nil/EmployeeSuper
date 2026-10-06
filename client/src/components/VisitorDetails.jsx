function VisitorDetails({ visitor, onClose }) {
  const row = (label, value) => (
    <tr>
      <th style={{ width: 200 }}>{label}</th>
      <td>{value || '-'}</td>
    </tr>
  );

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Visitor Details</h5>
        <table className="table table-bordered">
          <tbody>
            {row('Name', visitor.visitorName)}
            {row('Mobile', visitor.mobile)}
            {row('Email', visitor.email)}
            {row('Organization', visitor.organization)}
            {row('Person to Meet', visitor.personToMeet)}
            {row('Purpose', visitor.purpose)}
            {row('Visit Date & Time', new Date(visitor.visitDateTime).toLocaleString('en-IN'))}
            {row('Status', visitor.status)}
          </tbody>
        </table>
        <button className="btn btn-secondary" onClick={onClose}>Back</button>
      </div>
    </div>
  );
}

export default VisitorDetails;