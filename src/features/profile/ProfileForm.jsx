import { useEffect, useState } from "react";
import {
  useGetProfileQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
} from "./profileApi";
import "../../styles/variables.css";

const EMPTY_FORM = {
  userType: "",
  mobileNumber: "",
  whatsappNumber: "",
  country: "",
  highestDegree: "",
  institute: "",
  company: "",
  jobTitle: "",
};

export default function ProfileForm() {
  const {
    data: profileData,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetProfileQuery();

  // 404 → profile doesn't exist yet → create mode
  // 200 → profile found → update mode
  const isCreateMode = isError && error?.status === 404;
  const isUpdateMode = isSuccess && profileData != null;
  const isOtherError  = isError && error?.status !== 404;

  const [form, setForm] = useState(EMPTY_FORM);
  const [serverError, setServerError]     = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [createProfile, { isLoading: isCreating }] = useCreateProfileMutation();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const isSaving = isCreating || isUpdating;

  // Pre-populate form when profile loads
  useEffect(() => {
    if (isUpdateMode) {
      setForm({
        userType:       profileData.userType       || "",
        mobileNumber:   profileData.mobileNumber   || "",
        whatsappNumber: profileData.whatsappNumber || "",
        country:        profileData.country        || "",
        highestDegree:  profileData.highestDegree  || "",
        institute:      profileData.institute      || "",
        company:        profileData.company        || "",
        jobTitle:       profileData.jobTitle       || "",
      });
    }
  }, [isUpdateMode, profileData]);

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
    try {
      if (isCreateMode) {
        await createProfile(form).unwrap();
        setSuccessMessage("Profile created successfully.");
      } else {
        await updateProfile(form).unwrap();
        setSuccessMessage("Profile updated successfully.");
      }
    } catch (err) {
      setServerError(
        err?.data?.detail || err?.data?.message || err?.error ||
        (isCreateMode ? "Failed to create profile." : "Failed to update profile.")
      );
    }
  };

  // ── Loading state ─────────────────────────────────────────────
  if (isLoading || isFetching) {
    return (
      <div className="text-center py-4">
        <div className="spinner-royal mx-auto"></div>
        <p className="text-royal-muted mt-2">Loading profile…</p>
      </div>
    );
  }

  // ── Non-404 fetch error ───────────────────────────────────────
  if (isOtherError) {
    return (
      <div className="alert-royal-error">
        <i className="fa-solid fa-circle-exclamation me-2"></i>
        Could not load profile. {error?.data?.detail || "Please try again later."}
      </div>
    );
  }

  const inputClass = "form-control form-control-royal mb-0";

  // ── Form (create or update) ───────────────────────────────────
  return (
    <form onSubmit={handleSubmit}>
      {/* Mode indicator */}
      <div className="d-flex align-items-center gap-2 mb-4 pb-3" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: isCreateMode ? "rgba(192,57,43,0.1)" : "rgba(39,174,96,0.1)",
          border: `1px solid ${isCreateMode ? "rgba(192,57,43,0.3)" : "rgba(39,174,96,0.3)"}`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <i
            className={`fa-solid ${isCreateMode ? "fa-user-plus" : "fa-user-pen"}`}
            style={{ fontSize: "0.8rem", color: isCreateMode ? "var(--color-crimson)" : "#1E8449" }}
          ></i>
        </div>
        <div>
          <div style={{ color: "var(--color-text-primary)", fontWeight: 600, fontSize: "0.9rem" }}>
            {isCreateMode ? "Create Your Profile" : "Update Profile"}
          </div>
          <div style={{ color: "var(--color-text-muted)", fontSize: "0.78rem" }}>
            {isCreateMode
              ? "No profile found — fill in your details below."
              : "Your profile is set up. Edit any field and save."}
          </div>
        </div>
      </div>

      {/* User Type */}
      <div className="mb-3">
        <label className="form-label-royal">User Type</label>
        <select
          name="userType"
          className="form-select form-select-royal"
          value={form.userType}
          onChange={handleChange}
        >
          <option value="">Select user type</option>
          <option value="research">Research Scholar</option>
          <option value="corporate">Corporate Professional</option>
        </select>
      </div>

      {/* Contact */}
      <div className="row g-3 mb-3">
        <div className="col-sm-12 col-md-6">
          <label className="form-label-royal">Mobile Number</label>
          <input name="mobileNumber" type="text" className={inputClass}
            value={form.mobileNumber} onChange={handleChange} placeholder="+91 98765 43210" />
        </div>
        <div className="col-sm-12 col-md-6">
          <label className="form-label-royal">WhatsApp Number</label>
          <input name="whatsappNumber" type="text" className={inputClass}
            value={form.whatsappNumber} onChange={handleChange} placeholder="+91 98765 43210" />
        </div>
      </div>

      {/* Country */}
      <div className="mb-3">
        <label className="form-label-royal">Country</label>
        <input name="country" type="text" className={inputClass}
          value={form.country} onChange={handleChange} placeholder="e.g. India" />
      </div>

      {/* Academic */}
      <div className="row g-3 mb-3">
        <div className="col-sm-12 col-md-6">
          <label className="form-label-royal">Highest Degree</label>
          <input name="highestDegree" type="text" className={inputClass}
            value={form.highestDegree} onChange={handleChange} placeholder="e.g. PhD, MSc" />
        </div>
        <div className="col-sm-12 col-md-6">
          <label className="form-label-royal">Institute / University</label>
          <input name="institute" type="text" className={inputClass}
            value={form.institute} onChange={handleChange} placeholder="Institute name" />
        </div>
      </div>

      {/* Professional */}
      <div className="row g-3 mb-4">
        <div className="col-sm-12 col-md-6">
          <label className="form-label-royal">Company</label>
          <input name="company" type="text" className={inputClass}
            value={form.company} onChange={handleChange} placeholder="Company name" />
        </div>
        <div className="col-sm-12 col-md-6">
          <label className="form-label-royal">Job Title</label>
          <input name="jobTitle" type="text" className={inputClass}
            value={form.jobTitle} onChange={handleChange} placeholder="e.g. Data Scientist" />
        </div>
      </div>

      {serverError    && <div className="alert-royal-error mb-3">{serverError}</div>}
      {successMessage && <div className="alert-royal-success mb-3">{successMessage}</div>}

      <button type="submit" className="btn-gold w-100" disabled={isSaving}>
        {isSaving ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
            {isCreateMode ? "Creating…" : "Saving…"}
          </>
        ) : (
          <>
            <i className={`fa-solid ${isCreateMode ? "fa-user-plus" : "fa-floppy-disk"} me-2`}></i>
            {isCreateMode ? "Create Profile" : "Save Changes"}
          </>
        )}
      </button>
    </form>
  );
}
