import BundangguMap from "./BundangguMap.js";
import PharmacyList from "./PharmacyList.js";
import mapData from "../data/sampleMapData.js";
import PharmacyInfo from "./PharmacyInfo.js";

export default function App() {
  const bundangguMap = new BundangguMap({
    $target: document.querySelector(".map"),
    center: {
      lat: 37.4020288, 
      lng: 127.1066516
    },
    markers: mapData.stores,
    onClick: (pharmacy) => {
      pharmacyInfo.setState({
        visible: true,
        pharmacy,
      });
    },
  });

  const pharmacyList = new PharmacyList({
    $target: document.querySelector(".pharmacy-list"),
    data: mapData,
    onClick: ({ lat, lng }) => {
      BundangguMap.setState({ center: { lat, lng } });
    },
  });

  const pharmacyInfo = new PharmacyInfo({
    $target: document.querySelector(".pharmacy-info"),
  });
}
