import React, { useState } from 'react';

const ADMIN_NUMBER = '+91-9876543210';

type Ticket = {
  id: number;
  subject: string;
  description: string;
  status: string;
  date: string;
};

const initialTickets: Ticket[] = [
  // Example ticket history
  {
    id: 1,
    subject: 'Order not received',
    description: 'Details...',
    status: 'Open',
    date: '2025-09-10',
  },
  {
    id: 2,
    subject: 'Order not received',
    description: 'Details...',
    status: 'Open',
    date: '2025-09-10',
  },
  {
    id: 3,
    subject: 'Order not received',
    description: 'Details...',
    status: 'Open',
    date: '2025-09-10',
  },
  {
    id: 4,
    subject: 'Order not received',
    description: 'Details...',
    status: 'Open',
    date: '2025-09-10',
  },
];

const DashboardSupport: React.FC = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setTickets([
      ...tickets,
      {
        id: tickets.length + 1,
        subject,
        description,
        status: 'Open',
        date: new Date().toISOString().slice(0, 10),
      },
    ]);
    setSubject('');
    setDescription('');
    setError('');
  };

  return (
    <div className='dashboard-support'>
      <div className='title'>
        <h2>Apsra Support</h2>
        <span className='title-leaf'>
          <svg className='icon-width bg-gray'>
            <use xlinkHref='assets/svg/leaf.svg#leaf'></use>
          </svg>
        </span>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='support-form bg-white p-4 rounded shadow'>
          <h4 className='mb-3'>Create a Support Ticket</h4>
          <form onSubmit={handleSubmit} className='space-y-3'>
            <div>
              <label className='block mb-1 font-medium'>Subject</label>
              <input
                type='text'
                className='form-control'
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder='Enter ticket subject'
              />
            </div>
            <div>
              <label className='block mb-1 font-medium'>Description</label>
              <textarea
                className='form-control'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Describe your issue'
                rows={3}
              />
            </div>
            {error && <div className='text-red-500 text-sm'>{error}</div>}
            <button type='submit' className='btn btn-animation btn-md fw-bold w-full'>
              Submit Ticket
            </button>
          </form>
        </div>
        <div className=' bg-white p-4 rounded shadow'>
          <h4 className='mb-3'>Ticket History</h4>
          {tickets.length === 0 ? (
            <div className='text-gray-500'>No tickets yet.</div>
          ) : (
            <ul className='space-y-2'>
              {tickets.map((ticket) => (
                <li key={ticket.id} className='border p-2 rounded w-full'>
                  <div className='flex justify-between items-center'>
                    <span className='font-semibold'>{ticket.subject}</span>
                    <span
                      className={`badge ${
                        ticket.status === 'Open'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                  <div className='text-sm text-gray-600'>{ticket.date}</div>
                  <div className='mt-1 text-gray-700'>{ticket.description}</div>
                </li>
              ))}
            </ul>
          )}
          {tickets.length > 3 && (
            <div className='mt-4 p-2 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded'>
              <strong>Need urgent help?</strong> Please contact admin at{' '}
              <span className='font-bold'>{ADMIN_NUMBER}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardSupport;
