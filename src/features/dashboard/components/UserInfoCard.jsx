// import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { useAuth } from "../../auth/useAuth.js";
// import { useDispatch } from "react-redux";
import { useEffect } from "react";
// import { useLazyGetProfileQuery } from "../../profile/profileApi";

// UserInfoCard Component
export default function UserInfoCard() {
  const authUser = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile.data);

  const fullName = `${authUser?.first_name || ""} ${
    authUser?.last_name || ""
  }`.trim();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-red-700 to-red-800 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div className="text-white">
            <h2 className="text-xl font-bold">{fullName || "User"}</h2>
            <p className="text-red-100 text-sm">@{authUser?.username}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-3">
          <InfoRow icon="📧" label="Email" value={authUser?.email} />
          <InfoRow icon="📱" label="Mobile" value={profile?.mobileNumber} />
          <InfoRow icon="🌍" label="Country" value={profile?.country} />
          <InfoRow icon="📱" label="Whatsapp" value={profile?.whatsappNumber} />
          <InfoRow
            icon="🎓"
            label="Highest Degree"
            value={profile?.highestDegree}
          />
          <InfoRow icon="🏫" label="Institute" value={profile?.institute} />
          <InfoRow icon="🏢" label="Company" value={profile?.company} />
          <InfoRow icon="💼" label="Job Title" value={profile?.jobTitle} />
          <InfoRow
            icon="👤"
            label="User Type"
            value={profile?.userType}
            badge
          />
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value, badge }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-2 text-gray-600">
        <span className="text-lg">{icon}</span>
        <span className="font-medium text-sm">{label}</span>
      </div>
      {badge ? (
        <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-full">
          {value || "N/A"}
        </span>
      ) : (
        <span className="text-gray-800 text-sm font-medium">
          {value || "N/A"}
        </span>
      )}
    </div>
  );
}
