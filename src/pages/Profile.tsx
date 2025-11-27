import { useState } from "react";

const THEME = "#B9986D";

export default function DealerProfile() {
  const [profile, setProfile] = useState({
    dealerName: "Demo Dealer Name",
    email: "dealer@example.com",
    phone: "+91 9876543210",
    address: "",
    hours: "",
    about: "",
    logo: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfile({ ...profile, logo: file });
  };

  const handleSave = () => {
    console.log("Submitting profile:", profile);
    // api.updateDealerProfile(profile)
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6" style={{ color: THEME }}>
        Dealer Profile
      </h1>

      <div
        className="bg-white shadow-md rounded-xl p-6 border mb-8"
        style={{ borderColor: `${THEME}40` }}
      >
        {/* TIER BADGE */}
        <div className="mb-6">
          <span
            className="px-4 py-2 rounded-full text-white text-sm font-medium"
            style={{ backgroundColor: THEME }}
          >
            Gold Dealer
          </span>
        </div>

        {/* Dealer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dealer Name */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Dealer Name
            </label>
            <input
              type="text"
              name="dealerName"
              value={profile.dealerName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-1"
              style={{ borderColor: `${THEME}40` }}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="text"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-1"
              style={{ borderColor: `${THEME}40` }}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-600">Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-1"
              style={{ borderColor: `${THEME}40` }}
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Upload Logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="w-full p-3 border rounded-lg mt-1 bg-white"
              style={{ borderColor: `${THEME}40` }}
            />
            {profile.logo && (
              <p className="text-xs text-gray-500 mt-1">{profile.logo.name}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-600">Address</label>
          <textarea
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mt-1"
            rows={3}
            style={{ borderColor: `${THEME}40` }}
          ></textarea>
        </div>

        {/* Store Hours */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-600">
            Store Hours
          </label>
          <textarea
            name="hours"
            value={profile.hours}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mt-1"
            rows={3}
            placeholder="Example: Mon–Fri: 10am – 7pm"
            style={{ borderColor: `${THEME}40` }}
          ></textarea>
        </div>

        {/* About */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-600">
            About Dealer
          </label>
          <textarea
            name="about"
            value={profile.about}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mt-1"
            rows={5}
            placeholder="Write about your dealership…"
            style={{ borderColor: `${THEME}40` }}
          ></textarea>
        </div>

        {/* Google Business Profile Section */}
        <div
          className="mt-8 p-5 rounded-xl border bg-[#fdfbf8]"
          style={{ borderColor: `${THEME}40` }}
        >
          <h3 className="text-lg font-semibold mb-3" style={{ color: THEME }}>
            Google Business Profile Connection
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Connecting your Google Business Profile allows automatic sync of:
            <br />– Reviews <br />– Store Hours <br />– Business Details
          </p>

          <button
            className="px-5 py-2 text-white rounded-md"
            style={{ backgroundColor: THEME }}
          >
            Connect Google Business
          </button>
        </div>

        {/* Save Button */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-3 text-white font-semibold rounded-lg"
            style={{ backgroundColor: THEME }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#a6855f")}
            onMouseLeave={(e) => (e.currentTarget.style.background = THEME)}
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}
