import React, { useState, useEffect } from 'react';
import { getAccountDetails, upsertAccountDetails } from '../api';

const US_STATES = [
  { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' }, { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' }, { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' }, { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' }, { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' }, { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' }, { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' }, { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' }, { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' }, { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' }, { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' }
];

const EMPTY_FORM = {
  firstName: '', lastName: '', address1: '', address2: '',
  city: '', state: '', zipCode: '', phone: '', email: ''
};

function Account({ userId }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loadError, setLoadError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // GET current account data when the page loads
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const data = await getAccountDetails(userId);
        if (data) {
          setForm({
            firstName: data.first_name || '',
            lastName: data.last_name || '',
            address1: data.address1 || '',
            address2: data.address2 || '',
            city: data.city || '',
            state: data.state || '',
            zipCode: data.zip_code || '',
            phone: data.phone || '',
            email: data.email || ''
          });
        } else {
          setForm(EMPTY_FORM);
        }
      } catch (err) {
        setLoadError('Could not load account data.');
      } finally {
        setLoading(false);
      }
    };
    fetchAccount();
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // POST updated account data on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError('');
    setSaveSuccess('');
    try {
      const data = await upsertAccountDetails(userId, form);
      // If 201, new record; if 200, updated record
      setForm({
        firstName: data.first_name || '',
        lastName: data.last_name || '',
        address1: data.address1 || '',
        address2: data.address2 || '',
        city: data.city || '',
        state: data.state || '',
        zipCode: data.zip_code || '',
        phone: data.phone || '',
        email: data.email || ''
      });
      setSaveSuccess(data.created ? 'Account information saved successfully!' : 'Account information updated successfully!');
    } catch (err) {
      setSaveError('Could not save account data. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setForm(EMPTY_FORM);
    setSaveError('');
    setSaveSuccess('');
  };

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading account data...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Account Information</h2>

              {loadError && (
                <div className="alert alert-warning" role="alert">{loadError}</div>
              )}
              {saveError && (
                <div className="alert alert-danger" role="alert">{saveError}</div>
              )}
              {saveSuccess && (
                <div className="alert alert-success" role="alert">{saveSuccess}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="address1" className="form-label">Address Line 1</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address1"
                    name="address1"
                    value={form.address1}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="address2" className="form-label">Address Line 2</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    name="address2"
                    value={form.address2}
                    onChange={handleChange}
                  />
                </div>

                <div className="row">
                  <div className="col-md-5 mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="state" className="form-label">State</label>
                    <select
                      className="form-select"
                      id="state"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a state</option>
                      {US_STATES.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="zipCode" className="form-label">Zip Code</label>
                    <input
                      type="text"
                      className="form-control"
                      id="zipCode"
                      name="zipCode"
                      value={form.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? 'Saving...' : 'Submit'}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={handleReset} disabled={saving}>
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
