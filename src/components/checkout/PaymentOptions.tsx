import { QR_CODE_BASE_URL } from '@/constants';
import { GET_QR } from '@/services/API';
import React, { useEffect, useState } from 'react';

interface QRCodeData {
  admin_name: string;
  qr_code_file: string;
  qr_code_url: string;
  available: boolean;
  upi_id: string;
}

interface UPIData {
  admin_name: string;
  upi_id: string;
  display_text: string;
}

interface PaymentInstructions {
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  note: string;
}

interface APIResponse {
  status: string;
  message: string;
  data: {
    qr_codes: QRCodeData[];
    upi_ids: UPIData[];
    count: number;
    payment_instructions?: PaymentInstructions;
  };
}

interface PaymentOptionsProps {
  onUpiIdChange?: (upiId: string) => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ onUpiIdChange }) => {
  const [paymentData, setPaymentData] = useState<APIResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(GET_QR)
      .then((res) => res.json())
      .then((data: APIResponse) => {
        setPaymentData(data);
        setLoading(false);

        // Set the first available UPI ID as default
        if (onUpiIdChange && data.data.upi_ids.length > 0) {
          onUpiIdChange(data.data.upi_ids[0].upi_id);
        }
      })
      .catch(() => setLoading(false));
  }, [onUpiIdChange]);

  if (loading) return <p>Loading payment options...</p>;

  if (!paymentData || paymentData.data.count === 0) {
    return <p>No payment options available right now.</p>;
  }

  return (
    <div className='space-y-6'>
      {/* Show QR Codes */}
      {paymentData.data.qr_codes.length > 0 && (
        <div>
          <h3 className='text-lg font-semibold mb-2 text-center'>Scan QR Code</h3>
          <div className='flex flex-wrap justify-center gap-6'>
            {paymentData.data.qr_codes.map((qr, idx) =>
              !qr.available ? (
                <div key={idx} className='border rounded-lg shadow-sm text-center'>
                  <img
                    src={`${QR_CODE_BASE_URL}${qr.qr_code_file}`}
                    alt={`QR for ${qr.admin_name}`}
                    className='h-80'
                  />
                  {/* <p className='mt-2 font-medium'>{qr.admin_name}</p>
                  <p className='text-sm text-gray-600'>{qr.upi_id}</p> */}
                </div>
              ) : null
            )}
          </div>
        </div>
      )}

      {/* Show UPI IDs */}
      {paymentData.data.upi_ids.length > 0 && (
        <div>
          <h3 className='text-lg font-semibold mb-2 text-center'>UPI ID</h3>
          <ul className='list-disc list-inside text-center'>
            {paymentData.data.upi_ids.map((upi, idx) => (
              <li key={idx}>
                <span className='font-bold'>{upi.display_text} </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Show Instructions */}
      {paymentData.data && paymentData.data.payment_instructions && (
        <div className='bg-gray-100 p-4 rounded-lg mt-4 '>
          <h3 className='text-lg font-semibold mb-2'>Payment Instructions</h3>
          <ul className='flex flex-col !list-disc list-inside'>
            {paymentData.data.payment_instructions ? (
              <>
                <li>{paymentData.data.payment_instructions.step1}</li>
                <li>{paymentData.data.payment_instructions.step2}</li>
                <li>{paymentData.data.payment_instructions.step3}</li>
                <li>{paymentData.data.payment_instructions.step4}</li>
              </>
            ) : null}
          </ul>
          <p className='mt-2 text-red-600 font-medium'>
            Note:All payments are verified manually by admin
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentOptions;
