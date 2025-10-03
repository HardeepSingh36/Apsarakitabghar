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

const PaymentOptions: React.FC = () => {
  const [paymentData, setPaymentData] = useState<APIResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(GET_QR)
      .then((res) => res.json())
      .then((data: APIResponse) => {
        setPaymentData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading payment options...</p>;

  if (!paymentData || paymentData.data.count === 0) {
    return <p>No payment options available right now.</p>;
  }

  return (
    <div className='space-y-6'>
      <h2 className='text-xl font-bold'>Payment Options</h2>

      {/* Show QR Codes */}
      {paymentData.data.qr_codes.length > 0 && (
        <div>
          <h3 className='text-lg font-semibold mb-2'>Scan QR Code</h3>
          <div className='flex flex-wrap gap-6'>
            {paymentData.data.qr_codes.map((qr, idx) =>
              qr.available ? (
                <div key={idx} className='border p-4 rounded-lg shadow-sm text-center'>
                  <img
                    src={qr.qr_code_url.replace('../', '/')}
                    alt={`QR for ${qr.admin_name}`}
                    className='w-40 h-40 mx-auto'
                  />
                  <p className='mt-2 font-medium'>{qr.admin_name}</p>
                  <p className='text-sm text-gray-600'>{qr.upi_id}</p>
                </div>
              ) : null
            )}
          </div>
        </div>
      )}

      {/* Show UPI IDs */}
      {paymentData.data.upi_ids.length > 0 && (
        <div>
          <h3 className='text-lg font-semibold mb-2'>UPI IDs</h3>
          <ul className='list-disc list-inside'>
            {paymentData.data.upi_ids.map((upi, idx) => (
              <li key={idx}>
                {upi.display_text} <span className='font-bold'>{upi.upi_id}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Show Instructions */}
      {paymentData.data && (
        <div className='bg-gray-100 p-4 rounded-lg mt-4'>
          <h3 className='text-lg font-semibold mb-2'>Payment Instructions</h3>
          <ol className='list-decimal list-inside space-y-1'>
            <li>Scan QR code or use UPI ID below</li>
            <li>Make payment for your order amount</li>
            <li>Take screenshot of payment confirmation</li>
            <li>Upload receipt screenshot when placing order</li>
          </ol>
          <p className='mt-2 text-red-600 font-medium'>
            Note:All payments are verified manually by admin
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentOptions;
