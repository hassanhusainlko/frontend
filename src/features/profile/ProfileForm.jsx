import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetProfileQuery, useUpdateProfileMutation } from "./profileApi";

export default function ProfileForm() {
  // Trigger profile fetch on mount
  const {
    isLoading: isProfileLoading,
    isError: isProfileError,
    error: profileError,
    isFetching,
  } = useGetProfileQuery();

  // Read normalized profile data from slice
  const profile = useSelector((state) => state.profile.data);
  const profileStatus = useSelector((state) => state.profile.status);
  const profileErrorText = useSelector((state) => state.profile.error);

  // Local form state
  const [form, setForm] = useState({
    userType: "",
    designation: "",
    mobileNumber: "",
    whatsappNumber: "",
    country: "",
    highestDegree: "",
    institute: "",
    company: "",
    jobTitle: "",
  });

  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // When profile in Redux changes, sync it into form state
  useEffect(() => {
    if (profile && profileStatus === "succeeded") {
      setForm((prev) => ({
        ...prev,
        userType: profile.userType || "",
        designation: profile.designation || "",
        mobileNumber: profile.mobileNumber || "",
        whatsappNumber: profile.whatsappNumber || "",
        country: profile.country || "",
        highestDegree: profile.highestDegree || "",
        institute: profile.institute || "",
        company: profile.company || "",
        jobTitle: profile.jobTitle || "",
      }));
    }
  }, [profile, profileStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setServerError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");

    // Build partial update; only send fields we care about
    const payload = {
      userType: form.userType,
      designation: form.designation,
      mobileNumber: form.mobileNumber,
      whatsappNumber: form.whatsappNumber,
      country: form.country,
      highestDegree: form.highestDegree,
      institute: form.institute,
      company: form.company,
      jobTitle: form.jobTitle,
    };

    try {
      await updateProfile(payload).unwrap(); // throws on error
      setSuccessMessage("Profile updated successfully.");
    } catch (err) {
      console.error("Failed to update profile", err);
      const msg =
        err?.data?.detail ||
        err?.data?.message ||
        err?.error ||
        "Failed to update profile.";
      setServerError(msg);
    }
  };

  const loading = isProfileLoading || isFetching;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-danger fw-bold">
        <i className="fa-regular fa-id-badge me-2" />
        My Profile
      </h2>

      {loading && <p>Loading profile...</p>}

      {(isProfileError || profileErrorText) && (
        <div className="alert alert-danger">
          {profileErrorText ||
            profileError?.data?.detail ||
            profileError?.data?.message ||
            "Failed to load profile."}
        </div>
      )}

      {!loading && !isProfileError && (
        <form onSubmit={handleSubmit}>
          {/* User Type */}
          <div className="mb-3">
            <label htmlFor="userType" className="form-label">
              User Type
            </label>
            <select
              id="userType"
              name="userType"
              className="form-select"
              value={form.userType}
              onChange={handleChange}
            >
              <option value="">Select user type</option>
              {/* NOTE: adjust values to match your backend choices exactly:
                 If backend uses "reaserch" (typo), you may need value="reaserch"
              */}
              <option value="reaserch">Research Scholar</option>
              <option value="corporate">Corporate Professional</option>
            </select>
          </div>

          {/* Contact info */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="mobileNumber" className="form-label">
                Mobile Number
              </label>
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="text"
                className="form-control"
                value={form.mobileNumber}
                onChange={handleChange}
                placeholder="Enter mobile number"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="whatsappNumber" className="form-label">
                WhatsApp Number
              </label>
              <input
                id="whatsappNumber"
                name="whatsappNumber"
                type="text"
                className="form-control"
                value={form.whatsappNumber}
                onChange={handleChange}
                placeholder="Enter WhatsApp number"
              />
            </div>
          </div>

          {/* Country & Designation */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <input
                id="country"
                name="country"
                type="text"
                className="form-control"
                value={form.country}
                onChange={handleChange}
                placeholder="Country"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="designation" className="form-label">
                Designation
              </label>
              <input
                id="designation"
                name="designation"
                type="text"
                className="form-control"
                value={form.designation}
                onChange={handleChange}
                placeholder="e.g. PhD Scholar, Manager"
              />
            </div>
          </div>

          {/* Student-oriented fields */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="highestDegree" className="form-label">
                Highest Degree
              </label>
              <input
                id="highestDegree"
                name="highestDegree"
                type="text"
                className="form-control"
                value={form.highestDegree}
                onChange={handleChange}
                placeholder="e.g. MSc, PhD"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="institute" className="form-label">
                Institute
              </label>
              <input
                id="institute"
                name="institute"
                type="text"
                className="form-control"
                value={form.institute}
                onChange={handleChange}
                placeholder="Institute / University"
              />
            </div>
          </div>

          {/* Professional fields */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="company" className="form-label">
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                className="form-control"
                value={form.company}
                onChange={handleChange}
                placeholder="Company name"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="jobTitle" className="form-label">
                Job Title
              </label>
              <input
                id="jobTitle"
                name="jobTitle"
                type="text"
                className="form-control"
                value={form.jobTitle}
                onChange={handleChange}
                placeholder="e.g. Data Scientist"
              />
            </div>
          </div>

          {/* Referral / Promo codes (read-only display for now) */}
          <div className="mb-3">
            <label className="form-label">Referral Codes</label>
            <div className="form-text">
              {/* Adjust depending on what backend returns (IDs or objects) */}
              {Array.isArray(profile.referralCodes) &&
              profile.referralCodes.length > 0 ? (
                <code>
                  {profile.referralCodes
                    .map((c) => (typeof c === "string" ? c : c.code || c.id))
                    .join(", ")}
                </code>
              ) : (
                <span>No referral codes.</span>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Promotional Codes</label>
            <div className="form-text">
              {Array.isArray(profile.promotionalCodes) &&
              profile.promotionalCodes.length > 0 ? (
                <code>
                  {profile.promotionalCodes
                    .map((c) => (typeof c === "string" ? c : c.code || c.id))
                    .join(", ")}
                </code>
              ) : (
                <span>No promotional codes.</span>
              )}
            </div>
          </div>

          {/* Result messages */}
          {serverError && (
            <div className="alert alert-danger">{serverError}</div>
          )}
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          {/* Submit */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-danger"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
