import React from "react";
import type { User } from "../types";

interface UserDetailsProps {
  user: User;
  onClose: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          aria-label="Close"
        >
          ×
        </button>
        <div className="flex flex-col items-center">
          <img
            src={user.picture.large || user.picture.medium || user.picture.thumbnail}
            alt={`${user.name.first} ${user.name.last}`}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-300 mb-4"
          />
          <h3 className="text-2xl font-bold text-blue-900 mb-1">{user.name.title} {user.name.first} {user.name.last}</h3>
          <p className="text-gray-700 mb-2">{user.email}</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-600 text-sm w-full mt-4">
            <span className="font-semibold">Genre:</span>
            <span>{user.gender}</span>
            <span className="font-semibold">Nationalité:</span>
            <span>{user.nat}</span>
            <span className="font-semibold">Ville:</span>
            <span>{user.location.city}</span>
            <span className="font-semibold">Pays:</span>
            <span>{user.location.country}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
