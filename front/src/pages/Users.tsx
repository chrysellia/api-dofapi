import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import UserDetails from "../components/UserDetails";
import type { User } from "../types";

const USERS_PER_PAGE = 10;

const fetchUsers = async (page: number): Promise<User[]> => {
  const res = await axios.get(`https://randomuser.me/api/?results=${USERS_PER_PAGE}&page=${page}`);
  return res.data?.results;
};

const Users: React.FC = () => {
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data, isLoading, isError, refetch } = useQuery<User[], Error>({
    queryKey: ['users', page],
    queryFn: () => fetchUsers(page),
  });

  const users: User[] = React.useMemo(() => data ?? [], [data]);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseDetails = () => {
    setSelectedUser(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-blue-900">Users</h2>
      </div>

      <p className="text-gray-800">Browse and manage all weapons. You can search, filter, and view weapon details.</p>

      <div className="mt-6">
        {isLoading ? (
          <div className="text-gray-500 py-6">Loading users...</div>
        ) : isError ? (
          <div className="text-red-600 py-6">Failed to load users.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {users && users.map((user: User, idx: number) => (
                <button
                  key={user.login?.uuid || idx}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-shadow focus:outline-none"
                  onClick={() => handleUserClick(user)}
                  tabIndex={0}
                >
                  <img
                    src={user.picture?.large || user.picture?.medium || user.picture?.thumbnail}
                    alt={`${user.name.first} ${user.name.last}`}
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-200 mb-4"
                  />
                  <div className="text-lg font-semibold text-blue-900 mb-1">{user.name.title} {user.name.first} {user.name.last}</div>
                  <div className="text-gray-600 mb-2">{user.email}</div>
                  <div className="flex gap-2 text-sm text-gray-500">
                    <span>{user.gender}</span>
                    <span>·</span>
                    <span>{user.nat}</span>
                  </div>
                </button>
              ))}
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center mt-8 gap-4">
              <button
                className="px-4 py-2 rounded bg-blue-100 text-blue-700 font-semibold disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Précédent
              </button>
              <span className="px-4 py-2">Page {page}</span>
              <button
                className="px-4 py-2 rounded bg-blue-100 text-blue-700 font-semibold"
                onClick={() => setPage((p) => p + 1)}
              >
                Suivant
              </button>
            </div>
            {/* User Details Modal */}
            {selectedUser && (
              <UserDetails user={selectedUser} onClose={handleCloseDetails} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Users;
