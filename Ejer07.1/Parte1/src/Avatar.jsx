import IconoOnline from "./IconoOnline";

export default function Avatar({ avatar, isOnline }) {
  console.log("Render: Avatar");

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <img
        src={avatar}
        style={{ width: 60, height: 60, borderRadius: "50%" }}
        alt="avatar"
      />
      <IconoOnline isOnline={isOnline} />
    </div>
  );
}
