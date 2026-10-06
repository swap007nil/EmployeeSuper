import { useState } from 'react';

const empty = {
  visitorName: '',
  mobile: '',
  email: '',
  organization: '',
  personToMeet: '',
  purpose: '',
};

function VisitorForm({ initialData, onSubmit, onCancel, error }) {
  const [form, setForm] = useState(initialData ? { ...empty, ...initialData } : empty);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleaned = Object.fromEntries(
      Object.entries(form).filter(([, v]) => v !== '')
    );
    onSubmit(cleaned);
  };

  const field = (label, name, required, type = 'text', extra = {}) => (
    <div className="mb-3">
      <label className="form-label">
        {label} {required && '*'}
      </label>
      <input
        className="form-control"
        type={type}
        name={name}
        value={form[name] || ''}
        onChange={handleChange}
        required={required}
        {...extra}
      />
    </div>
  );

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{initialData ? 'Edit Visitor' : 'Add Visitor'}</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          {field('Visitor Name', 'visitorName', true)}
          {field('Mobile Number', 'mobile', true, 'text', {
            pattern: '[0-9]{10}',
            title: 'Enter exactly 10 digits',
            maxLength: 10,
          })}
          {field('Email', 'email', false, 'email')}
          {field('Organization', 'organization', false)}
          {field('Person to Meet', 'personToMeet', true)}
          {field('Purpose of Visit', 'purpose', true)}
          <button type="submit" className="btn btn-success me-2">Submit</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default VisitorForm;