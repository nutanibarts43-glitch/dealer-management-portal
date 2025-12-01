// src/pages/Register.tsx
import { useNavigate } from "react-router-dom";
import { mockApiService } from "../services/mockApi";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import RadioGroup from "../components/RadioGroup";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import type {
  RegistrationFormData,
  PasswordErrors,
} from "../types/registration.types";
import { useState, type ChangeEvent, type FormEvent } from "react";

export default function Registration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: "",
    lastName: "",
    businessEmail: "",
    phoneNumber: "",
    companyName: "",
    businessWebsiteUrl: "",
    address: "",
    city: "",
    state: "",
    tier: "bronze",
    password: "",
    confirmPassword: "",
  });

  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });

  const tiers = [
    { value: "bronze", label: "bronze - basic listing" },
    { value: "silver", label: "silver - lead form enabled" },
    { value: "gold", label: "gold - gallery rich profile" },
    { value: "platinum", label: "platinum - full premium listing" },
  ];

  const states = [
    /* same states list as before */ "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  const validatePassword = (pwd: string): boolean => {
    const errors: PasswordErrors = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd),
    };
    setPasswordErrors(errors);
    return Object.values(errors).every(Boolean);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "password") validatePassword(value);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.firstName.trim()) return setError("First name is required");
    if (!formData.lastName.trim()) return setError("Last name is required");
    if (!formData.businessEmail.trim())
      return setError("Business email is required");
    if (!formData.businessEmail.includes("@"))
      return setError("Please enter a valid email address");
    if (!formData.phoneNumber.trim())
      return setError("Phone number is required");
    if (!formData.companyName.trim())
      return setError("Company name is required");
    if (!formData.businessWebsiteUrl.trim())
      return setError("Business website URL is required");
    if (!formData.address.trim()) return setError("Address is required");
    if (!formData.city.trim()) return setError("City is required");
    if (!formData.state) return setError("State is required");
    if (!formData.password) return setError("Password is required");
    if (formData.password !== formData.confirmPassword)
      return setError("Passwords do not match");
    if (!Object.values(passwordErrors).every(Boolean))
      return setError("Password does not meet all requirements");

    setLoading(true);
    try {
      const result = await mockApiService.register(formData);
      setSuccess(result.message);

      // login the user into redux immediately
      dispatch(
        loginSuccess({
          token: result.token,
          role: "dealer",
          user: result.user,
        })
      );

      setTimeout(() => {
        // send to onboarding with userData
        navigate("/onboarding", { state: { userData: result.user } });
      }, 700);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white w-full font-poppins">
      <div className="w-full">
        <div className="flex items-center gap-[52px] min-h-screen py-[30px] pl-[30px] pr-[78px] max-lg:py-3 max-lg:px-5 max-lg:gap-5">
          <div className="hidden lg:block shrink-0 w-[675px]">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/957753ba254e9944666a464ce6fa2be549cb904d?width=1350"
              alt="Dealer"
              className="w-full max-w-[675px] rounded-[20px] object-cover"
            />
          </div>

          <div className="w-full lg:w-auto min-w-0">
            <div className="flex flex-col items-start gap-6 w-full">
              <h1 className="text-black w-full text-center font-poppins text-[40px] max-md:text-2xl font-semibold">
                apply to join the FMTV dealer network
              </h1>

              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-[19px] max-sm:gap-3"
              >
                {error && (
                  <div className="p-3 bg-red-50 rounded-lg text-red-600 text-sm border border-red-200">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="p-3 bg-green-50 rounded-lg text-green-600 text-sm border border-green-200">
                    {success}
                  </div>
                )}

                <div className="flex gap-[25px] max-sm:flex-col">
                  <InputField
                    label="first name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <InputField
                    label="last name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex gap-[25px] max-sm:flex-col">
                  <InputField
                    label="business email"
                    name="businessEmail"
                    type="email"
                    value={formData.businessEmail}
                    onChange={handleChange}
                    required
                  />
                  <InputField
                    label="phone number"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <InputField
                  label="company name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="business website url"
                  name="businessWebsiteUrl"
                  type="url"
                  value={formData.businessWebsiteUrl}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />

                <div className="flex gap-[25px] max-sm:flex-col">
                  <InputField
                    label="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                  <SelectField
                    label="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    options={states.map((s) => ({ value: s, label: s }))}
                    required
                  />
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <InputField
                    label="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {formData.password && (
                    <div className="bg-gray-50 p-3 rounded-lg mt-2">
                      <p className="text-xs font-semibold text-gray-700">
                        Password must contain:
                      </p>
                      <div className="space-y-1 mt-1">
                        <p
                          className={`text-xs flex gap-1 ${
                            passwordErrors.length
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          ✓ At least 8 characters
                        </p>
                        <p
                          className={`text-xs flex gap-1 ${
                            passwordErrors.uppercase
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          ✓ One uppercase letter
                        </p>
                        <p
                          className={`text-xs flex gap-1 ${
                            passwordErrors.number
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          ✓ One number
                        </p>
                        <p
                          className={`text-xs flex gap-1 ${
                            passwordErrors.special
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          ✓ One special character
                        </p>
                      </div>
                    </div>
                  )}
                  <InputField
                    label="confirm password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col gap-[18px] pt-3 border-t border-gray-200">
                  <label className="text-dealer-text font-poppins text-[17px] font-medium capitalize">
                    Optional
                  </label>
                  <RadioGroup
                    name="tier"
                    value={formData.tier}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, tier: value }))
                    }
                    options={tiers}
                  />
                </div>

                <div className="flex flex-col gap-[25px] max-w-[538px]">
                  <p className="text-dealer-text text-base capitalize">
                    To activate your listing, you must place our official
                    "authorized FMTV dealer" badge on your website.
                  </p>
                  <button
                    type="button"
                    className="px-4 py-2 text-white text-[17px] font-medium rounded-lg"
                    style={{ backgroundColor: "#B9986D" }}
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = "#";
                      link.download = "fmtv-dealer-badge.png";
                      link.click();
                    }}
                  >
                    Download Dealer Badge
                  </button>
                </div>

                <div className="flex flex-col items-center gap-3 mt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full text-white text-xl font-medium py-[17px] rounded-full"
                    style={{
                      backgroundColor: loading ? "#d4a373" : "#B9986D",
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? "Creating account..." : "Create dealer account"}
                  </button>
                  <p className="text-black text-base font-semibold">
                    <span className="font-normal text-dealer-text">
                      Already have an account?
                    </span>{" "}
                    <a href="/login" className="underline">
                      Log in
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
