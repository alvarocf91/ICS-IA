import React from "react";

export default function TeamMemberList({ responsables = [] }) {
  return (
    <div className="d-flex flex-wrap gap-1">
      {responsables.map((r, i) => (
        <span key={i} className="badge rounded-pill badge-resp py-1 px-2">
          {r}
        </span>
      ))}
    </div>
  );
}
