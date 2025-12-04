import PuntitoVerde from "./PuntitoVerde";

export default function IconoOnline({ isOnline }) {
  console.log("Render: IconoOnline");

  return <PuntitoVerde isOnline={isOnline} />;
}
