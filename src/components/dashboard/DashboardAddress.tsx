import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Loader } from 'react-feather';
import toast from 'react-hot-toast';
import type { RootState } from '../../app/store';
import type { Address } from '../../features/user/userSlice';
import AddAddressModal from './AddAddressModal';
import RemoveConfirmationModal from './RemoveConfirmationModal';
import RemoveDoneModal from './RemoveDoneModal';
import {
  fetchAddresses,
  createAddress,
  updateAddressAsync,
  deleteAddressAsync,
  setSelectedAddress,
  setDefaultAddressAsync,
  clearError,
} from '../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

const DashboardAddress: React.FC = () => {
  const [isAddAddressModalOpen, setAddAddressModalOpen] = useState(false);
  const [isRemoveConfirmationOpen, setRemoveConfirmationOpen] = useState(false);
  const [isRemoveDoneOpen, setRemoveDoneOpen] = useState(false);
  const [editAddress, setEditAddress] = useState<Address | null>(null);
  const [addressToRemove, setAddressToRemove] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { addresses, selectedAddressId, loading, error } = useAppSelector(
    (state: RootState) => state.user
  );
  const operationLoading = useAppSelector((state: RootState) => state.user.operationLoading || {});

  // Set default selected address when addresses load
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddress = addresses.find((addr) => addr.isDefault);
      if (defaultAddress) {
        dispatch(setSelectedAddress(defaultAddress.id));
      }
    }
  }, [addresses, selectedAddressId, dispatch]);

  const openEditModal = (address: Address) => {
    setEditAddress(address);
    setAddAddressModalOpen(true);
  };

  const openAddAddressModal = () => {
    setEditAddress(null); // Clear the editAddress state to reset the form
    setAddAddressModalOpen(true);
  };
  const closeAddAddressModal = () => setAddAddressModalOpen(false);

  const openRemoveConfirmation = (id: string) => {
    setAddressToRemove(id);
    setRemoveConfirmationOpen(true);
  };
  const closeRemoveConfirmation = () => setRemoveConfirmationOpen(false);

  const closeRemoveDone = () => setRemoveDoneOpen(false);

  const handleSaveAddress = async (updatedAddress: Address) => {
    try {
      if (editAddress) {
        await dispatch(
          updateAddressAsync({
            id: editAddress.id,
            addressData: { ...editAddress, ...updatedAddress },
          })
        ).unwrap();
        toast.success('Address updated successfully!');
      } else {
        await dispatch(createAddress(updatedAddress)).unwrap();
        toast.success('Address added successfully!');
      }
      setAddAddressModalOpen(false);
      setEditAddress(null);
    } catch (error: any) {
      toast.error(error || 'Failed to save address');
    }
  };

  const handleRemoveAddress = async (id: string) => {
    try {
      await dispatch(deleteAddressAsync(id)).unwrap();
      toast.success('Address removed successfully!');
      setRemoveConfirmationOpen(false);
    } catch (error: any) {
      toast.error(error || 'Failed to remove address');
    }
  };

  const handleAddressSelect = (id: string) => {
    // Optimistically set selected address locally for immediate UI feedback
    dispatch(setSelectedAddress(id));
    // Update backend to mark this address as default
    dispatch(setDefaultAddressAsync(id))
      .unwrap()
      .catch((err: any) => {
        toast.error(err || 'Failed to set default address');
      });
  };

  // Fetch addresses on component mount
  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  // Handle API errors
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Toggle body scroll based on modal states
  useEffect(() => {
    const anyModalOpen = isAddAddressModalOpen || isRemoveConfirmationOpen || isRemoveDoneOpen;

    document.body.style.overflow = anyModalOpen ? 'hidden' : '';
  }, [isAddAddressModalOpen, isRemoveConfirmationOpen, isRemoveDoneOpen]);

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
        {loading ? (
          <div className='text-center'>
            <div className='spinner-border !text-[#e42f22]' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
            <p className='mt-2'>Loading addresses...</p>
          </div>
        ) : addresses.length === 0 ? (
          <p className='text-center'>No addresses found. Please add a new address.</p>
        ) : (
          addresses.map((address: Address) => (
            <div className='col-xxl-4 col-xl-6 col-lg-12 col-md-6' key={address.id}>
              <div
                className={`address-box ${selectedAddressId === address.id ? 'selected' : ''}`}
                onClick={() => handleAddressSelect(address.id)}
              >
                <div>
                  {operationLoading[`set-default-${address.id}`] ? (
                    <div className='inline-flex mt-1.5'>
                      <Loader className='w-4 h-4 animate-spin !text-[#e42f22]' />
                    </div>
                  ) : (
                    <div className='form-check'>
                      <div className='flex items-center gap-2'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='address'
                          id={`address-${address.id}`}
                          checked={selectedAddressId === address.id}
                          onChange={() => handleAddressSelect(address.id)}
                          disabled={operationLoading[`set-default-${address.id}`]}
                        />
                      </div>
                    </div>
                  )}

                  <div className='table-responsive address-table'>
                    <table className='table'>
                      <tbody>
                        <tr>
                          <td colSpan={2}>{`${address.firstName} ${address.lastName}`}</td>
                        </tr>
                        <tr>
                          <td>Address :</td>
                          <td>
                            <p>{`${address.addressLine1}, ${address.addressLine2 || ''}, ${
                              address.city
                            }, ${address.state}, ${address.country}`}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>Pin Code :</td>
                          <td>{address.postalCode}</td>
                        </tr>
                        <tr>
                          <td>Phone :</td>
                          <td>{address.phone}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className='button-group'>
                  <button
                    className='btn btn-sm add-button w-100'
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(address);
                    }}
                  >
                    <Edit size={16} className='me-1' /> Edit
                  </button>
                  <button
                    className='btn btn-sm add-button w-100'
                    onClick={(e) => {
                      e.stopPropagation();
                      openRemoveConfirmation(address.id);
                    }}
                  >
                    <Trash2 size={16} className='me-1' /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modals */}
      <AddAddressModal
        isOpen={isAddAddressModalOpen}
        onClose={closeAddAddressModal}
        address={editAddress}
        onSave={handleSaveAddress}
      />
      <RemoveConfirmationModal
        isOpen={isRemoveConfirmationOpen}
        onClose={closeRemoveConfirmation}
        onConfirm={() =>
          addressToRemove ? handleRemoveAddress(addressToRemove) : Promise.resolve()
        }
      />
      <RemoveDoneModal isOpen={isRemoveDoneOpen} onClose={closeRemoveDone} />
    </div>
  );
};

export default DashboardAddress;
