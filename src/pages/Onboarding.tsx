import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { UserData, TierBenefits } from "../types/onboarding.types";

export default function Onboarding() {
  const navigate = useNavigate();
  const location = useLocation();

  const userData: UserData | undefined = location.state?.userData;

  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    if (!userData?.userId) {
      navigate("/register");
    }
  }, [userData, navigate]);

  const tierBenefits: Record<UserData["tier"], TierBenefits> = {
    bronze: {
      title: "Bronze - Basic Listing",
      features: [
        "Basic store listing",
        "Top 3 services shown",
        "No lead form",
        "Standard placement",
      ],
    },
    silver: {
      title: "Silver - Lead Form Enabled",
      features: [
        "Basic store listing",
        "All services listed",
        "Lead generation form",
        "Better placement",
      ],
    },
    gold: {
      title: "Gold - Gallery Rich Profile",
      features: [
        "Premium large listing",
        "Up to 5 project photos",
        "Social media links",
        "Rich HTML descriptions",
        "Lead generation form",
      ],
    },
    platinum: {
      title: "Platinum - Full Premium Listing",
      features: [
        "Top placement in region",
        "Unlimited photos",
        "Social media links",
        "Rich HTML descriptions",
        "Lead generation form",
        "Awards/affiliations section",
      ],
    },
  };

  const handleNext = () => {
    if (step === 3) {
      navigate("/", { state: { userId: userData?.userId } });
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleSkip = () => {
    navigate("/dashboard", { state: { userId: userData?.userId } });
  };

  return (
    <div className="min-h-screen bg-white w-full font-poppins">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Progress bar */}
        <div className="mb-12">
          <div className="flex gap-2 mb-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  i <= step ? "bg-dealer-button" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <p className="text-gray-600 text-sm">Step {step} of 3</p>
        </div>

        {/* Step 1 */}
        {step === 1 && userData && (
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold text-black mb-6">
              Welcome to theFMTV Dealer Network!
            </h1>

            <p className="text-lg text-gray-700 mb-8">
              Thank you for registering, {userData.firstName}{" "}
              {userData.lastName}. We're excited to have{" "}
              <strong>{userData.companyName}</strong> with us.
            </p>

            {/* User details box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Your Registration Details
              </h2>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Name</p>
                  <p className="font-medium">
                    {userData.firstName} {userData.lastName}
                  </p>
                </div>

                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-medium">{userData.businessEmail}</p>
                </div>

                <div>
                  <p className="text-gray-600">Company</p>
                  <p className="font-medium">{userData.companyName}</p>
                </div>

                <div>
                  <p className="text-gray-600">Tier</p>
                  <p className="font-medium capitalize">{userData.tier}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full text-white font-semibold py-3 rounded-full mb-4 transition-colors"
              style={{ backgroundColor: "#B9986D" }}
            >
              Continue to Dealer Benefits
            </button>

            <button
              onClick={handleSkip}
              className="w-full bg-gray-200 hover:bg-gray-300 text-black font-semibold py-3 rounded-full"
            >
              Skip to Dashboard
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && userData && (
          <div className="animate-fade-in">
            <h1 className="text-4xl font-semibold mb-6">
              Your Dealer Tier Benefits
            </h1>

            <p className="text-lg text-gray-700 mb-8">
              Your current tier:{" "}
              <span className="font-bold capitalize text-dealer-button">
                {userData.tier}
              </span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {Object.entries(tierBenefits).map(([key, tier]) => (
                <div
                  key={key}
                  className={`p-6 rounded-lg border-2 transition ${
                    key === userData.tier
                      ? "border-dealer-button bg-amber-50"
                      : "border-gray-200 bg-gray-50 opacity-50"
                  }`}
                >
                  <h3 className="text-lg font-bold">{tier.title}</h3>

                  <ul className="mt-4 space-y-2">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-dealer-button">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-full text-white font-semibold py-3 rounded-full mb-4"
              style={{ backgroundColor: "#B9986D" }}
            >
              Continue to Publishing Requirements
            </button>

            <button
              onClick={handleSkip}
              className="w-full bg-gray-200 hover:bg-gray-300 py-3 rounded-full"
            >
              Skip to Dashboard
            </button>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold mb-6">
              Get Listed in Our Store Locator
            </h1>

            <div className="space-y-6 mb-8">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex gap-4">
                  <div className="w-10 h-10 bg-dealer-button text-white rounded-full flex items-center justify-center font-bold">
                    {num}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">
                      {num === 1 && "Complete Your Listing"}
                      {num === 2 && "Place Our Badge on Your Website"}
                      {num === 3 && "Verify the Backlink"}
                    </h3>

                    <p className="text-gray-700">
                      {num === 1 &&
                        "Fill out your store information, services, hours, photos, and social media links."}
                      {num === 2 &&
                        "Download and place the Authorized Dealer badge on your website."}
                      {num === 3 &&
                        "Provide the page URL; once verified, your listing goes live."}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-full text-white font-semibold py-3 rounded-full"
              style={{ backgroundColor: "#B9986D" }}
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
