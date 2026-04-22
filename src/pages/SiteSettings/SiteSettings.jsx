import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getSiteSettings, updateSiteSettings } from "../../features/actions/siteSettings/siteSettings";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const SiteSettings = () => {
  const dispatch = useDispatch();
  const { siteSettingsData, isLoading, isSuccess, errorMessage } = useSelector(
    (state) => state.siteSettings
  );

  const [deliverySchedule, setDeliverySchedule] = useState({});
  const [selectedId, setSelectedId] = useState(null);

  // Fetch site settings on mount
  useEffect(() => {
    dispatch(getSiteSettings());
  }, [dispatch]);

  // Update local UI state when data comes
  useEffect(() => {
    if (siteSettingsData?.length > 0) {
      const settings = siteSettingsData[0];

      setDeliverySchedule(settings.deliverySchedule || {});
      setSelectedId(settings._id);
    }
  }, [siteSettingsData]);

  // Toasts
  useEffect(() => {
    if (isSuccess) toast.success("Site settings saved successfully!");
    if (errorMessage) toast.error(errorMessage);
  }, [isSuccess, errorMessage]);

  const handleChange = (day, value) => {
    setDeliverySchedule((prev) => ({
      ...prev,
      [day]: value,
    }));
  };

  const handleSave = () => {
    if (!selectedId) return toast.error("No site setting found to update!");

    dispatch(updateSiteSettings({ 
      id: selectedId, 
      payload: { deliverySchedule } 
    }));
  };



  return (
    <div className="p-10 max-w-md">
      <h1 className="text-2xl font-semibold mb-6">Site Settings</h1>

      {isLoading && <p>Loading...</p>}

      <div className="flex flex-col gap-6">
        {days.map((day) => (
          <div key={day} className="flex flex-col">
            <label className="font-medium capitalize">{day}</label>

            <select
              value={deliverySchedule?.[day] || "self"}
              onChange={(e) => handleChange(day, e.target.value)}
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="self">Self</option>
              <option value="deliveroo">Deliveroo</option>
            </select>
          </div>
        ))}

        <button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 mt-4 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default SiteSettings;
