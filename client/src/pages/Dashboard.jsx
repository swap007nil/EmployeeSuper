import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import VisitorTable from '../components/VisitorTable';
import VisitorForm from '../components/VisitorForm';
import SummaryCards from '../components/SummaryCards';
import VisitorDetails from '../components/VisitorDetails';
import {
  getVisitors,
  getVisitor,
  createVisitor,
  updateVisitor,
  deleteVisitor,
} from '../services/visitorAPI';

function Dashboard({ isAdmin }) {
  const [visitors, setVisitors] = useState([]);
  const [allVisitors, setAllVisitors] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [error, setError] = useState('');

  const loadVisitors = async () => {
    try {
      const [filtered, all] = await Promise.all([getVisitors(search), getVisitors('')]);
      setVisitors(filtered.data);
      setAllVisitors(all.data);
      setError('');
    } catch (err) {
      setError('Could not load visitors. Is the server running?');
    }
  };

  useEffect(() => {
    loadVisitors();
  }, [search]);

  const handleSubmit = async (data) => {
    try {
      if (editing) {
        await updateVisitor(editing._id, data);
      } else {
        await createVisitor(data);
      }
      setShowForm(false);
      setEditing(null);
      setError('');
      loadVisitors();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleView = async (id) => {
    try {
      const res = await getVisitor(id);
      setViewing(res.data);
    } catch (err) {
      setError('Could not load visitor details');
    }
  };

  const handleCheckOut = async (visitor) => {
    try {
      await updateVisitor(visitor._id, { status: 'Checked Out' });
      loadVisitors();
    } catch (err) {
      setError('Check out failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this visitor?')) {
      try {
        await deleteVisitor(id);
        loadVisitors();
      } catch (err) {
        setError('Delete failed');
      }
    }
  };

  const openAdd = () => {
    setEditing(null);
    setError('');
    setShowForm(true);
  };

  const openEdit = (visitor) => {
    setEditing(visitor);
    setError('');
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setError('');
  };

  const shown = statusFilter ? visitors.filter((v) => v.status === statusFilter) : visitors;

  if (viewing) {
    return (
      <div className="container">
        <VisitorDetails visitor={viewing} onClose={() => setViewing(null)} />
      </div>
    );
  }

  return (
    <div className="container">
      {showForm ? (
        <VisitorForm
          key={editing ? editing._id : 'new'}
          initialData={editing}
          onSubmit={handleSubmit}
          onCancel={closeForm}
          error={error}
        />
      ) : (
        <>
          {error && <div className="alert alert-danger">{error}</div>}
          <SummaryCards visitors={allVisitors} />
          <div className="d-flex justify-content-between align-items-center mb-3 gap-2">
            {isAdmin ? (
              <button className="btn btn-primary" onClick={openAdd}>+ Add Visitor</button>
            ) : (
              <span />
            )}
            <div className="d-flex gap-2">
              <select
                className="form-select"
                style={{ maxWidth: 160 }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All statuses</option>
                <option value="Checked In">Checked In</option>
                <option value="Checked Out">Checked Out</option>
              </select>
              <SearchBar value={search} onChange={setSearch} />
            </div>
          </div>
          <VisitorTable
            visitors={shown}
            isAdmin={isAdmin}
            onView={handleView}
            onCheckOut={handleCheckOut}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
}

export default Dashboard;