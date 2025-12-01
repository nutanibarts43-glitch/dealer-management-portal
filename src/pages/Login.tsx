// src/pages/Login.tsx
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import InputField from "../components/InputField";
import { mockApiService } from "../services/mockApi";
import { loginSuccess } from "../redux/authSlice";
import type { LoginFormData } from "../types/login.types";
import { useState, type ChangeEvent, type FormEvent } from "react";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const [formData, setFormData] = useState<LoginFormData>({
    email: (location.state as { email?: string })?.email || "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    if (!formData.password) {
      setError("Password is required");
      return;
    }

    setLoading(true);
    try {
      const result = await mockApiService.login(formData);

      // dispatch to redux
      dispatch(
        loginSuccess({
          token: result.token,
          role: result.role ?? ("dealer" as any),
          user: result.user,
        })
      );

      setSuccess(result.message);

      // optionally remember token in localStorage is handled by authSlice already
      setTimeout(() => {
        navigate("/");
      }, 700);
    } catch (err: any) {
      setError(err?.message ?? "Login failed");
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
              alt="Dealer hanging pictures"
              className="w-full max-w-[675px] h-auto rounded-[20px] object-cover"
            />
          </div>

          <div className="w-full lg:w-auto min-w-0">
            <div className="flex flex-col items-start gap-6 w-full">
              <div className="flex flex-col items-start gap-4 w-full">
                <h1 className="text-black text-center w-full font-poppins text-[40px] max-md:text-2xl max-sm:text-xl font-semibold">
                  log in to your dealer account
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

                  <InputField
                    label="business email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <InputField
                    label="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <div className="flex items-center gap-2 w-full">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-dealer-border cursor-pointer accent-dealer-button"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="text-dealer-text text-sm cursor-pointer"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="w-full text-right">
                    <a
                      href="/forgot-password"
                      className="text-dealer-button text-sm hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full text-white text-xl font-medium py-[17px] rounded-full transition-colors"
                    style={{
                      backgroundColor: loading ? "#d4a373" : "#B9986D",
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </button>

                  <p className="text-black text-center font-poppins text-base font-semibold">
                    <span className="font-normal">Don't have an account? </span>
                    <a href="/register" className="underline">
                      Register here
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
