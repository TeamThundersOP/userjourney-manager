import React from 'react';

interface UserHeaderProps {
  userId: string;
}

const UserHeader = ({ userId }: UserHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">User Details</h1>
      <div className="text-sm text-gray-500">ID: #{userId}</div>
    </div>
  );
};

export default UserHeader;