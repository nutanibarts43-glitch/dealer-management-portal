import { useEffect } from "react";
import { FiUsers, FiImage, FiStar, FiMail } from "react-icons/fi";

const THEME = "#B9986D";

const stats = [
  {
    title: "Total Leads",
    value: "38",
    icon: <FiMail size={28} />,
  },
  {
    title: "Project Images",
    value: "124",
    icon: <FiImage size={28} />,
  },
  {
    title: "Google Reviews",
    value: "57",
    icon: <FiStar size={28} />,
  },
  {
    title: "Profile Views",
    value: "980",
    icon: <FiUsers size={28} />,
  },
];

const recentLeads = [
  { name: "Amit Sharma", project: "Home Theater Setup", date: "2 hrs ago" },
  { name: "Riya Patel", project: "Audio Room Install", date: "5 hrs ago" },
  { name: "John Doe", project: "Automation System", date: "Yesterday" },
];

const recentReviews = [
  { user: "Karan", rating: 5, message: "Amazing work, highly recommended!" },
  { user: "Alex", rating: 4, message: "Very professional and helpful." },
];

export default function Dashboard() {
  useEffect(() => {
    // Fetch dealer stats, reviews, leads (future API integration)
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6" style={{ color: THEME }}>
        Dealer Dashboard
      </h1>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className="p-5 bg-white shadow-md rounded-xl border"
            style={{ borderColor: `${THEME}40` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>
                <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
              </div>

              <div
                className="p-3 rounded-full"
                style={{
                  backgroundColor: `${THEME}20`,
                  color: THEME,
                }}
              >
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TWO COLUMN SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* RECENT LEADS */}
        <div
          className="bg-white shadow-md rounded-xl p-6 border"
          style={{ borderColor: `${THEME}40` }}
        >
          <h2 className="text-xl font-semibold mb-4" style={{ color: THEME }}>
            Recent Leads
          </h2>

          <div className="space-y-4">
            {recentLeads.map((lead, i) => (
              <div
                key={i}
                className="p-4 border rounded-lg flex justify-between items-center"
                style={{ borderColor: `${THEME}30` }}
              >
                <div>
                  <p className="font-semibold text-gray-800">{lead.name}</p>
                  <p className="text-sm text-gray-500">{lead.project}</p>
                </div>
                <span className="text-xs text-gray-500">{lead.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT REVIEWS */}
        <div
          className="bg-white shadow-md rounded-xl p-6 border"
          style={{ borderColor: `${THEME}40` }}
        >
          <h2 className="text-xl font-semibold mb-4" style={{ color: THEME }}>
            Recent Reviews
          </h2>

          <div className="space-y-4">
            {recentReviews.map((review, i) => (
              <div
                key={i}
                className="p-4 border rounded-lg"
                style={{ borderColor: `${THEME}30` }}
              >
                <div className="flex justify-between">
                  <p className="font-semibold text-gray-800">{review.user}</p>
                  <p style={{ color: THEME }}>⭐ {review.rating}</p>
                </div>
                <p className="text-sm text-gray-600 mt-2">{review.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
