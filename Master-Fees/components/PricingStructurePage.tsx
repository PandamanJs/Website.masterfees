import { useState } from 'react';

interface PricingStructurePageProps {
  onComplete: (data: any) => void;
  onBack: () => void;
  initialData?: any;
}

export default function PricingStructurePage({ onComplete, onBack, initialData }: PricingStructurePageProps) {
  const [pricingData, setPricingData] = useState(initialData || {});

  const handleSubmit = () => {
    onComplete(pricingData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Pricing Structure</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fee Structure
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Enter fee structure details..."
              value={pricingData.structure || ''}
              onChange={(e) => setPricingData({...pricingData, structure: e.target.value})}
            />
          </div>
        </div>

        <div className="flex space-x-4 mt-8">
          <button
            onClick={onBack}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Complete Setup
          </button>
        </div>
      </div>
    </div>
  );
}