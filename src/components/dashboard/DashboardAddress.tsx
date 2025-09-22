import React, { useEffect, useState } from 'react';
import { Edit, Trash2 } from 'react-feather';
import EditProfileModal from './EditProfileModal';
import AddAddressModal from './AddAddressModal';
import RemoveConfirmationModal from './RemoveConfirmationModal';
import RemoveDoneModal from './RemoveDoneModal';

const DashboardAddress: React.FC = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddAddressModalOpen, setAddAddressModalOpen] = useState(false);
  const [isRemoveConfirmationOpen, setRemoveConfirmationOpen] = useState(false);
  const [isRemoveDoneOpen, setRemoveDoneOpen] = useState(false);

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  const openAddAddressModal = () => setAddAddressModalOpen(true);
  const closeAddAddressModal = () => setAddAddressModalOpen(false);

  const openRemoveConfirmation = () => setRemoveConfirmationOpen(true);
  const closeRemoveConfirmation = () => setRemoveConfirmationOpen(false);

  const openRemoveDone = () => {
    setRemoveConfirmationOpen(false);
    setRemoveDoneOpen(true);
  };
  const closeRemoveDone = () => setRemoveDoneOpen(false);

  // Toggle body scroll based on modal states
  useEffect(() => {
    const anyModalOpen =
      isEditModalOpen || isAddAddressModalOpen || isRemoveConfirmationOpen || isRemoveDoneOpen;

    document.body.style.overflow = anyModalOpen ? 'hidden' : '';
  }, [isEditModalOpen, isAddAddressModalOpen, isRemoveConfirmationOpen, isRemoveDoneOpen]);

  return (
    <div className='dashboard-address'>
      <div className='title title-flex'>
        <div>
          <h2>My Address Book</h2>
          <span className='title-leaf'>
            <svg className='icon-width bg-gray'>
              <use xlinkHref='assets/svg/leaf.svg#leaf'></use>
            </svg>
          </span>
        </div>
        <button
          className='btn theme-bg-color text-white btn-sm fw-bold mt-lg-0 mt-3'
          onClick={openAddAddressModal}
        >
          <i data-feather='plus' className='me-2'></i> Add New Address
        </button>
      </div>
      <div className='row g-sm-4 g-3'>
        <div className='col-xxl-4 col-xl-6 col-lg-12 col-md-6'>
          <div className='address-box'>
            <div>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='jack'
                  id='flexRadioDefault2'
                  defaultChecked
                />
              </div>
              <div className='label'>
                <label>Home</label>
              </div>
              <div className='table-responsive address-table'>
                <table className='table'>
                  <tbody>
                    <tr>
                      <td colSpan={2}>Jack Jennas</td>
                    </tr>
                    <tr>
                      <td>Address :</td>
                      <td>
                        <p>8424 James Lane South San Francisco, CA 94080</p>
                      </td>
                    </tr>
                    <tr>
                      <td>Pin Code :</td>
                      <td>+380</td>
                    </tr>
                    <tr>
                      <td>Phone :</td>
                      <td>+ 812-710-3798</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className='button-group'>
              <button className='btn btn-sm add-button w-100' onClick={openEditModal}>
                <Edit size={16} className='me-1' /> Edit
              </button>
              <button className='btn btn-sm add-button w-100' onClick={openRemoveConfirmation}>
                <Trash2 size={16} className='me-1' /> Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal isOpen={isEditModalOpen} onClose={closeEditModal} />
      <AddAddressModal isOpen={isAddAddressModalOpen} onClose={closeAddAddressModal} />
      <RemoveConfirmationModal
        isOpen={isRemoveConfirmationOpen}
        onClose={closeRemoveConfirmation}
        onConfirm={openRemoveDone}
      />
      <RemoveDoneModal isOpen={isRemoveDoneOpen} onClose={closeRemoveDone} />
    </div>
  );
};

export default DashboardAddress;
