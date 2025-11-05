import React, { useState } from 'react';
import { Phone, Calendar, ShieldCheck } from 'lucide-react';

// Panel Component
const Panel = ({ title, icon: Icon, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-4">
        {Icon && <Icon className="w-6 h-6 text-blue-600" />}
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );
};

// Button Component
const Button = ({ children, onClick, primary = true, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
        primary
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default function TeleconsultationBooking() {
  const [specialty, setSpecialty] = useState('');
  const [clinician, setClinician] = useState('');
  const [consultType, setConsultType] = useState('Video Consultation');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [paymentType, setPaymentType] = useState('cashless');
  const [isBooked, setIsBooked] = useState(false);

  const specialties = [
    'Cardiology',
    'Dermatology',
    'Pediatrics',
    'Orthopedics',
    'Neurology',
    'General Medicine'
  ];

  const clinicians = {
    'Cardiology': ['Dr. Sarah Johnson', 'Dr. Michael Chen', 'Dr. Robert Williams', 'Dr. Emily Davis'],
    'Dermatology': ['Dr. Lisa Anderson', 'Dr. James Martinez', 'Dr. Patricia Taylor'],
    'Pediatrics': ['Dr. Jennifer Brown', 'Dr. David Wilson', 'Dr. Maria Garcia'],
    'Orthopedics': ['Dr. Christopher Lee', 'Dr. Amanda White', 'Dr. Kevin Thompson'],
    'Neurology': ['Dr. Rachel Moore', 'Dr. Thomas Jackson', 'Dr. Susan Harris'],
    'General Medicine': ['Dr. Daniel Martin', 'Dr. Laura Robinson', 'Dr. Mark Anderson']
  };

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '02:00 PM',
    '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
    '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM'
  ];

  const handleBooking = async () => {
    if (!specialty) {
      alert('Please select a specialty');
      return;
    }
    if (!clinician) {
      alert('Please select a clinician');
      return;
    }
    if (!date) {
      alert('Please select a date');
      return;
    }
    if (!timeSlot) {
      alert('Please select a time slot');
      return;
    }

    const booking = {
      id: Date.now().toString(),
      specialty,
      clinician,
      consultType,
      date,
      timeSlot,
      paymentType: paymentType === 'cashless' ? 'Cashless' : 'Non-Cashless',
      bookedAt: new Date().toISOString()
    };

    try {
      // Save to persistent storage
      await window.storage.set(`booking:${booking.id}`, JSON.stringify(booking));
      setIsBooked(true);
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('Failed to save booking. Please try again.');
    }
  };

  const resetForm = () => {
    setSpecialty('');
    setClinician('');
    setConsultType('Video Consultation');
    setDate('');
    setTimeSlot('');
    setPaymentType('cashless');
    setIsBooked(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <Panel title="Book a Teleconsultation" icon={Phone}>
          <p className="text-gray-600 mb-6">
            Connect with a healthcare professional instantly or schedule an appointment.
          </p>

          {isBooked ? (
            <div className="text-center p-8 bg-green-50 border border-green-300 rounded-lg">
              <ShieldCheck className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-green-700">Success!</h3>
              <p className="text-green-800 font-medium">
                Your appointment is confirmed and saved.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Booking details have been stored successfully.
              </p>
              <Button primary={false} onClick={resetForm} className="mt-4">
                Book Another
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700 font-medium">Specialty</span>
                <select
                  value={specialty}
                  onChange={(e) => {
                    setSpecialty(e.target.value);
                    setClinician('');
                  }}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 bg-gray-50 border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Specialty</option>
                  {specialties.map((sp, i) => (
                    <option key={i} value={sp}>
                      {sp}
                    </option>
                  ))}
                </select>
              </label>

              {specialty && (
                <label className="block">
                  <span className="text-gray-700 font-medium">Clinician</span>
                  <select
                    value={clinician}
                    onChange={(e) => setClinician(e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 bg-gray-50 border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Clinician</option>
                    {clinicians[specialty].map((doc, i) => (
                      <option key={i} value={doc}>
                        {doc}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              <label className="block">
                <span className="text-gray-700 font-medium">Consultation Type</span>
                <select
                  value={consultType}
                  onChange={(e) => setConsultType(e.target.value)}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 bg-gray-50 border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Teleconsultation">Teleconsultation</option>
                  <option value="Video Consultation">Video Consultation</option>
                  <option value="Audio Consultation">Audio Consultation</option>
                </select>
              </label>

              <label className="block">
                <span className="text-gray-700 font-medium">Preferred Date:</span>
                <div className="relative mt-1">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      setTimeSlot('');
                    }}
                    className="block w-full rounded-lg border-gray-300 shadow-sm p-2 bg-gray-50 border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </label>

              {date && (
                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    Available Time Slots:
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          timeSlot === slot
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  Payment Type
                </label>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="paymentType"
                      value="cashless"
                      checked={paymentType === 'cashless'}
                      onChange={(e) => setPaymentType(e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="ml-3 text-gray-700">Cashless</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="paymentType"
                      value="non-cashless"
                      checked={paymentType === 'non-cashless'}
                      onChange={(e) => setPaymentType(e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="ml-3 text-gray-700">Non-Cashless</span>
                  </label>
                </div>
              </div>

              <Button onClick={handleBooking}>Confirm Booking</Button>
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
}