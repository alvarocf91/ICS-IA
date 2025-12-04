import React, { memo } from "react";

const UserCard = ({ user }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        margin: "4px",
        padding: "8px",
        borderRadius: "4px",
      }}
    >
      <strong>{user.name}</strong> - ${user.price}
    </div>
  );
};

export default memo(UserCard);
