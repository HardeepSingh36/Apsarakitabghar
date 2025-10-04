import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getCaptchaConfig } from '@/services/captchaService';
import type { CaptchaConfig } from '@/types/types';
import Captcha from '@/components/general/Captcha';
import {
  submitSupportTicket,
  getSupportTickets,
  type SupportTicket,
  type SubmitTicketRequest,
} from '@/services/supportQueriesService';

const ADMIN_NUMBER = '+91-9876543210';

const DashboardSupport: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [category, setCategory] = useState('general');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [error, setError] = useState('');
  const [captchaValid, setCaptchaValid] = useState(false);
  const [captchaConfig, setCaptchaConfig] = useState<CaptchaConfig | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch CAPTCHA configuration and queries on component mount
  useEffect(() => {
    const fetchCaptchaConfig = async () => {
      try {
        const config = await getCaptchaConfig();
        setCaptchaConfig(config);
      } catch (error) {
        console.error('Failed to fetch CAPTCHA configuration:', error);
      }
    };

    fetchCaptchaConfig();
    fetchTickets();
  }, []);

  // Refetch tickets when filters change
  useEffect(() => {
    fetchTickets();
  }, [statusFilter, categoryFilter, priorityFilter]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (statusFilter) params.status = statusFilter;
      if (categoryFilter) params.category = categoryFilter;
      if (priorityFilter) params.priority = priorityFilter;

      const response = await getSupportTickets(Object.keys(params).length > 0 ? params : undefined);

      if (response.status === 'success') {
        setTickets(response.data.tickets);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to load support tickets');
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate required fields
    if (!subject.trim()) {
      setError('Please enter a subject for your ticket.');
      toast.error('Please enter a subject for your ticket.');
      return;
    }

    if (subject.trim().length < 3) {
      setError('Subject must be at least 3 characters long.');
      toast.error('Subject must be at least 3 characters long.');
      return;
    }

    if (subject.trim().length > 200) {
      setError('Subject must not exceed 200 characters.');
      toast.error('Subject must not exceed 200 characters.');
      return;
    }

    if (!description.trim()) {
      setError('Please provide a description of your issue.');
      toast.error('Please provide a description of your issue.');
      return;
    }

    if (description.trim().length < 10) {
      setError('Description must be at least 10 characters long.');
      toast.error('Description must be at least 10 characters long.');
      return;
    }

    if (description.trim().length > 3000) {
      setError('Description must not exceed 3000 characters.');
      toast.error('Description must not exceed 3000 characters.');
      return;
    }

    // Validate captcha if config is available
    if (captchaConfig && !captchaValid) {
      setError('Please complete the captcha verification.');
      toast.error('Please complete the captcha verification.');
      return;
    }

    const captchaToken = localStorage.getItem('captcha_token');
    if (captchaConfig && !captchaToken) {
      setError('Captcha token missing. Please complete the captcha.');
      toast.error('Captcha token missing. Please complete the captcha.');
      return;
    }

    try {
      setSubmitting(true);

      const ticketData: SubmitTicketRequest = {
        category: category,
        subject: subject.trim(),
        description: description.trim(),
        priority: priority,
        captcha_token: captchaToken!,
      };

      const response = await submitSupportTicket(ticketData);
      if (response.status === 'success') {
        // Reset form
        setCategory('general');
        setSubject('');
        setDescription('');
        setPriority('medium');
        setError('');
        setCaptchaValid(false);
        localStorage.removeItem('captcha_token');

        toast.success(response.message || 'Support query submitted successfully!');

        // Refresh tickets list
        fetchTickets();
      }
    } catch (error: any) {
      console.error('Error submitting query:', error);

      // Handle rate limiting and other specific errors
      if (error.message?.includes('rate limit') || error.message?.includes('Rate limiting')) {
        setError('You have reached the daily limit of 10 tickets. Please try again tomorrow.');
        toast.error('Daily ticket limit reached. Please try again tomorrow.');
      } else if (error.message?.includes('captcha') || error.message?.includes('Captcha')) {
        setError('Invalid captcha. Please try again.');
        toast.error('Invalid captcha. Please try again.');
        setCaptchaValid(false);
        localStorage.removeItem('captcha_token');
      } else {
        setError(error.message || 'Failed to submit ticket. Please try again.');
        toast.error(error.message || 'Failed to submit ticket. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-primary text-white';
      case 'in_progress':
        return 'bg-warning text-dark';
      case 'resolved':
        return 'bg-success text-white';
      case 'closed':
        return 'bg-secondary text-white';
      default:
        return 'bg-light text-dark';
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'low':
        return 'bg-info text-white';
      case 'medium':
        return 'bg-primary text-white';
      case 'high':
        return 'bg-warning text-dark';
      case 'urgent':
        return 'bg-danger text-white';
      default:
        return 'bg-light text-dark';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
      <div className='row g-4'>
        <div className='col-lg-6'>
          <div className='support-form bg-white p-4 rounded shadow border'>
            <h4 className='mb-3'>
              <i className='fa-solid fa-ticket me-2 text-primary'></i>
              Submit Support Ticket
            </h4>
            <p className='text-muted mb-4'>
              Need help? Submit a support ticket and our team will respond based on your priority
              level. Each ticket gets a unique tracking number.
            </p>
            <form onSubmit={handleSubmit} className='space-y-3'>
              <div className='row'>
                <div className='col-md-6'>
                  <label className='block mb-1 font-medium'>
                    Category <span className='text-red-500'>*</span>
                  </label>
                  <select
                    className='form-control'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={submitting}
                  >
                    <option value='general'>General Inquiry</option>
                    <option value='order'>Order Issues</option>
                    <option value='payment'>Payment Problems</option>
                    <option value='shipping'>Shipping & Delivery</option>
                    <option value='return'>Returns & Refunds</option>
                    <option value='technical'>Technical Support</option>
                    <option value='feedback'>Feedback & Suggestions</option>
                  </select>
                </div>
                <div className='col-md-6'>
                  <label className='block mb-1 font-medium'>
                    Priority <span className='text-red-500'>*</span>
                  </label>
                  <select
                    className='form-control'
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    disabled={submitting}
                  >
                    <option value='low'>Low</option>
                    <option value='medium'>Medium</option>
                    <option value='high'>High</option>
                    <option value='urgent'>Urgent</option>
                  </select>
                </div>
              </div>
              <div>
                <label className='block mb-1 font-medium'>
                  Subject <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  className={`form-control ${error && !subject.trim() ? 'border-red-500' : ''}`}
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    if (error) setError(''); // Clear error on input
                  }}
                  placeholder='Enter ticket subject (3-200 characters)'
                  maxLength={200}
                  disabled={submitting}
                />
                <small
                  className={`text-muted ${
                    subject.length > 0 && subject.length < 3 ? 'text-warning' : ''
                  }`}
                >
                  {subject.length}/200 characters (minimum 3 required)
                </small>
              </div>
              <div>
                <label className='block mb-1 font-medium'>
                  Description <span className='text-red-500'>*</span>
                </label>
                <textarea
                  className={`form-control ${error && !description.trim() ? 'border-red-500' : ''}`}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (error) setError(''); // Clear error on input
                  }}
                  placeholder='Describe your issue in detail for faster resolution (minimum 10 characters)'
                  rows={5}
                  maxLength={3000}
                  disabled={submitting}
                />
                <small
                  className={`text-muted ${
                    description.length > 0 && description.length < 10
                      ? 'text-warning'
                      : description.length > 2900
                      ? 'text-danger'
                      : ''
                  }`}
                >
                  {description.length}/3000 characters (minimum 10 required)
                </small>
              </div>

              {/* Captcha Component */}
              {captchaConfig && (
                <div>
                  <label className='block mb-2 font-medium'>
                    Captcha <span className='text-red-500'>*</span>
                  </label>
                  <div className='captcha-container d-flex justify-content-center'>
                    <Captcha
                      config={captchaConfig}
                      onVerify={(token: string | null) => {
                        setCaptchaValid(!!token);
                        if (error && token) setError(''); // Clear error when captcha is completed
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className='alert alert-danger' role='alert'>
                  <i className='fa-solid fa-circle-exclamation me-2 !text-sm'></i>
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type='submit'
                className={`btn btn-animation btn-md fw-bold w-full d-flex align-items-center justify-content-center ${
                  submitting || (!!captchaConfig && !captchaValid) ? 'opacity-50' : ''
                }`}
                disabled={submitting || (!!captchaConfig && !captchaValid)}
              >
                {submitting && (
                  <div className='spinner-border spinner-border-sm me-2' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                  </div>
                )}
                {submitting ? 'Submitting...' : 'Submit Ticket'}
              </button>
            </form>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='bg-white p-4 rounded shadow border'>
            <div className='d-flex justify-content-between align-items-center mb-3'>
              <h4 className='mb-0'>
                <i className='fa-solid fa-ticket me-2 text-primary'></i>
                Support Tickets
              </h4>
            </div>

            {/* Filter Controls */}
            <div className='row g-2 mb-3'>
              <div className='col-md-4'>
                <select
                  className='form-select form-select-sm'
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value=''>All Status</option>
                  <option value='open'>Open</option>
                  <option value='in_progress'>In Progress</option>
                  <option value='resolved'>Resolved</option>
                  <option value='closed'>Closed</option>
                </select>
              </div>
              <div className='col-md-4'>
                <select
                  className='form-select form-select-sm'
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value=''>All Categories</option>
                  <option value='general'>General</option>
                  <option value='order'>Order</option>
                  <option value='payment'>Payment</option>
                  <option value='shipping'>Shipping</option>
                  <option value='return'>Return</option>
                  <option value='technical'>Technical</option>
                  <option value='feedback'>Feedback</option>
                </select>
              </div>
              <div className='col-md-4'>
                <select
                  className='form-select form-select-sm'
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value=''>All Priorities</option>
                  <option value='low'>Low</option>
                  <option value='medium'>Medium</option>
                  <option value='high'>High</option>
                  <option value='urgent'>Urgent</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className='text-center py-4'>
                <div className='spinner-border spinner-border-sm text-primary' role='status'>
                  <span className='visually-hidden'>Loading...</span>
                </div>
                <p className='mt-2 text-muted'>Loading your support tickets...</p>
              </div>
            ) : tickets.length === 0 ? (
              <div className='text-center py-4'>
                <i
                  className='fa-regular fa-comment-dots text-muted'
                  style={{ fontSize: '3rem' }}
                ></i>
                <p className='mt-2 text-muted'>No support tickets found.</p>
                <small className='text-muted'>
                  Submit your first ticket using the form on the left.
                </small>
              </div>
            ) : (
              <div className='tickets-list' style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {tickets.map((ticket) => (
                  <div key={ticket.id} className='border rounded p-3 mb-3 bg-light'>
                    <div className='d-flex justify-content-between align-items-start mb-2'>
                      <div>
                        <h6 className='mb-1 text-truncate' style={{ maxWidth: '200px' }}>
                          {ticket.subject}
                        </h6>
                        <small className='text-muted'>
                          <i className='fa-solid fa-hashtag me-1'></i>
                          {ticket.ticket_no}
                        </small>
                        <br />
                        <small className='text-muted'>
                          <i className='fa-regular fa-calendar me-1'></i>
                          {formatDate(ticket.created_at)}
                        </small>
                      </div>
                      <div className='d-flex flex-column align-items-end'>
                        <span className={`badge ${getStatusBadgeClass(ticket.status)} mb-1`}>
                          {ticket.status.replace('_', ' ').toUpperCase()}
                        </span>
                        <span
                          className={`badge ${getPriorityBadgeClass(ticket.priority)} badge-sm`}
                        >
                          {ticket.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className='mb-2'>
                      <span className='badge bg-info text-dark me-2'>
                        <i className='fa-solid fa-tag me-1'></i>
                        {ticket.category.charAt(0).toUpperCase() + ticket.category.slice(1)}
                      </span>
                      <small className='text-muted'>ID: #{ticket.id}</small>
                    </div>

                    <p
                      className='text-muted mb-2 small'
                      style={{
                        maxHeight: '60px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {ticket.description}
                    </p>

                    {ticket.admin_response && (
                      <div className='mt-2 p-2 bg-success bg-opacity-10 border-start border-success border-3'>
                        <small className='text-success fw-bold'>
                          <i className='fa-solid fa-reply me-1'></i>
                          Admin Response{ticket.admin_name ? ` (${ticket.admin_name})` : ''}:
                        </small>
                        <p className='small mb-0 mt-1'>{ticket.admin_response}</p>
                        {ticket.responded_at && (
                          <small className='text-muted'>
                            <i className='fa-regular fa-clock me-1'></i>
                            {formatDate(ticket.responded_at)}
                          </small>
                        )}
                      </div>
                    )}

                    {ticket.updated_at &&
                      ticket.updated_at !== ticket.created_at &&
                      !ticket.admin_response && (
                        <div className='mt-2 p-2 bg-info bg-opacity-10 border-start border-info border-3'>
                          <small className='text-info fw-bold'>
                            <i className='fa-solid fa-clock-rotate-left me-1'></i>
                            Last Updated:
                          </small>
                          <small className='text-muted d-block mt-1'>
                            <i className='fa-regular fa-clock me-1'></i>
                            {formatDate(ticket.updated_at)}
                          </small>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            )}

            {tickets.length > 0 && (
              <div className='mt-3 p-3 bg-warning bg-opacity-10 border-start border-warning border-3'>
                <small className='text-warning-emphasis'>
                  <i className='fa-solid fa-info-circle me-1'></i>
                  <strong>Need urgent help?</strong> Please contact admin at{' '}
                  <span className='fw-bold'>{ADMIN_NUMBER}</span>
                </small>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSupport;
