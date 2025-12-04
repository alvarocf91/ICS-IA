import React, { memo } from "react";
import UserCard from "./UserCard.jsx";

const UserList = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default memo(UserList);
