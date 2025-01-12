import { KeenIcon } from '@/components';
import { useState } from 'react';

interface TimeSlot {
  id: number;
  days: string[];
  fromTime: string;
  toTime: string;
  leadTime: string;
}

interface Zone {
  id: number;
  name: string;
  capacity: number;
  chairNumber: number;
}

const AccountSettings = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: 1,
      days: [],
      fromTime: '',
      toTime: '',
      leadTime: ''
    }
  ]);

  const [zones, setZones] = useState<Zone[]>([
    {
      id: 1,
      name: '',
      capacity: 0,
      chairNumber: 0
    }
  ]);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const addTimeSlot = () => {
    setTimeSlots([
      ...timeSlots,
      {
        id: timeSlots.length + 1,
        days: [],
        fromTime: '',
        toTime: '',
        leadTime: ''
      }
    ]);
  };

  const addZone = () => {
    setZones([
      ...zones,
      {
        id: zones.length + 1,
        name: '',
        capacity: 0,
        chairNumber: 0
      }
    ]);
  };

  return (
    <div className="card min-w-full">
      <div className="card-header">
        <h3 className="card-title">Time Slots & Reservation Settings</h3>
      </div>
      
      <div className="card-body">
        {/* Time Slots Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-gray-900">Time Slots</h4>
            <button onClick={addTimeSlot} className="btn btn-sm btn-primary">
              <KeenIcon icon="plus" className="me-2" />
              Add Time Slot
            </button>
          </div>

          {timeSlots.map((slot, index) => (
            <div key={slot.id} className="mb-6 p-4 border border-gray-200 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-md font-medium text-gray-900">Time Slot {slot.id}</h5>
                {timeSlots.length > 1 && (
                  <button className="btn btn-icon btn-sm btn-light">
                    <KeenIcon icon="trash" />
                  </button>
                )}
              </div>

              <div className="grid gap-4">
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map((day) => (
                    <label key={day} className="checkbox-group">
                      <input type="checkbox" className="checkbox" />
                      <span className="checkbox-label">{day}</span>
                    </label>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="form-label">From</label>
                    <input type="time" className="input" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="form-label">To</label>
                    <input type="time" className="input" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="form-label">Lead Time (minutes)</label>
                    <input type="number" className="input" min="0" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 my-8"></div>

        {/* Pre-ordering Section */}
        <div className="mb-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Pre-ordering</h4>
          <label className="switch mb-4">
            <input type="checkbox" />
            <span className="switch-label">Enable pre-order</span>
          </label>
          <p className="text-gray-600 text-sm">When enabled, users can pre-order during reservation.</p>
        </div>

        <div className="border-t border-gray-200 my-8"></div>

        {/* Downpayment Section */}
        <div className="mb-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Downpayment</h4>
          <label className="switch mb-4">
            <input type="checkbox" />
            <span className="switch-label">Request downpayment</span>
          </label>
          <p className="text-gray-600 text-sm">When enabled, customer will have the option to provide a downpayment during checkout</p>
        </div>

        <div className="border-t border-gray-200 my-8"></div>

        {/* Capacity Section */}
        <div className="mb-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Capacity</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="form-label">Minimum</label>
              <input type="number" className="input" min="1" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="form-label">Maximum</label>
              <input type="number" className="input" min="1" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 my-8"></div>

        {/* Reservation Duration */}
        <div className="mb-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Reservation Duration</h4>
          <div className="flex flex-col gap-2">
            <label className="form-label">Duration (minutes)</label>
            <input type="number" className="input" min="15" step="15" />
          </div>
        </div>

        <div className="border-t border-gray-200 my-8"></div>

        {/* Accept Reservations Section */}
        <div className="mb-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4">I want to accept reservations up-to</h4>
          <div className="flex flex-col gap-2">
            <input type="number" className="input" min="1" placeholder="Number of days" />
            <p className="text-gray-600 text-sm">Days in advance</p>
          </div>
        </div>

        <div className="border-t border-gray-200 my-8"></div>

        {/* Reservation Confirmation */}
        <div className="mb-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Reservation Confirmation</h4>
          <label className="switch mb-4">
            <input type="checkbox" />
            <span className="switch-label">Accept reservations automatically</span>
          </label>
          <p className="text-gray-600 text-sm">When enabled, reservations will be automatically confirmed, and SMS will be sent</p>
        </div>

        <div className="border-t border-gray-200 my-8"></div>

        {/* Zone Based Reservations */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-gray-900">Zone Based Reservations</h4>
            <button onClick={addZone} className="btn btn-sm btn-primary">
              <KeenIcon icon="plus" className="me-2" />
              Add Zone
            </button>
          </div>

          {zones.map((zone, index) => (
            <div key={zone.id} className="mb-4 p-4 border border-gray-200 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="form-label">Zone Name</label>
                  <input type="text" className="input" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="form-label">Chair Capacity</label>
                  <input type="number" className="input" min="1" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="form-label">Chair Number</label>
                  <input type="number" className="input" min="1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 my-8"></div>

        {/* Blackout Days */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-gray-900">Blackout Days</h4>
            <button className="btn btn-sm btn-primary">
              <KeenIcon icon="plus" className="me-2" />
              Add Blackout Day
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <input type="date" className="input" />
          </div>
        </div>

        <div className="border-t border-gray-200 my-8"></div>

        {/* Smoking Section */}
        <div className="mb-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Allow Smoking</h4>
          <div className="flex gap-4">
            <label className="radio-group">
              <input type="radio" name="smoking" className="radio" />
              <span className="radio-label">Yes</span>
            </label>
            <label className="radio-group">
              <input type="radio" name="smoking" className="radio" />
              <span className="radio-label">No</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="btn btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export { AccountSettings };