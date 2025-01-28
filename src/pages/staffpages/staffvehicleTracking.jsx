import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import formbg from "../../assets/formsbg.png";
import Sidebar from "../../components/SidebarStaff";

// Fix for default Marker icon in Leaflet
import L from "leaflet";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";
import carIcon from "../../assets/car-icon.png";

const StaffTracking = () => {
  const carMarkerIcon = L.icon({
    iconUrl: carIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32], // popup position
  });

  const [time, setTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [date, setDate] = useState({ day: "1st", month: "Jan", year: 2023 });
  const [userLocation, setUserLocation] = useState(null);

  // const totalDrivers = 8;

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formatWithLeadingZero = (num) => (num < 10 ? `0${num}` : num);

      const ordinalSuffix = (day) => {
        if (day >= 11 && day <= 13) return `${day}th`;
        switch (day % 10) {
          case 1:
            return `${day}st`;
          case 2:
            return `${day}nd`;
          case 3:
            return `${day}rd`;
          default:
            return `${day}th`;
        }
      };

      setTime({
        hours: formatWithLeadingZero(now.getHours()),
        minutes: formatWithLeadingZero(now.getMinutes()),
        seconds: formatWithLeadingZero(now.getSeconds()),
      });

      setDate({
        day: ordinalSuffix(now.getDate()),
        month: now.toLocaleString("default", { month: "short" }),
        year: now.getFullYear(),
      });
    };

    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // @desc: getting user geolocation
  useEffect(() => {
    const getUserGeolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude: lat, longitude: lng } = position.coords;
          setUserLocation([lat, lng]);
        }, (error) => {
          alert('Cannot get location', error.message);
          console.log(error.message);
        });
      } else {
        alert("Geolocation not supported in this browser!");
        console.log("location is supported");
      }
    }
    
    getUserGeolocation();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar activePage="staffvehicleTracking" />
      <main className="flex-1 flex flex-col">
        <div className="flex justify-between items-center px-[32px] py-[12px] w-full bg-[#1E1E1E] h-20 relative">
          <h2 className="text-white font-Inter text-[20px] font-[600] tracking-[-0.4]">
            Staff Dashboard
          </h2>

          <div className="flex gap-4 items-center justify-center text-white font-Inter text-[16px] font-[500] p-2 border-gray-green/50 rounded-xl border-[1px]">
            <div>
              <span>{date.day}</span>-<span>{date.month}</span>-
              <span>{date.year}</span>
            </div>
            <div>
              <span>{time.hours}</span>:<span>{time.minutes}</span>:
              <span>{time.seconds}</span>
            </div>
          </div>

          {/* <img
            src={notificationdb}
            alt="Notifications"
            className="cursor-pointer"
            onClick={toggleNotification}
          /> */}

          {/* {showNotification && (
            <>
              <div
                className="fixed inset-0 bg-black opacity-50 z-10"
                onClick={toggleNotification}
              ></div>
              <div className="absolute right-[30px] mt-[23rem] w-[370px] bg-white p-6 rounded-lg shadow-sm z-10">
                <div className="flex justify-between items-center pb-[32px]">
                  <h3 className="text-[#1E1E1E] font-Inter text-[20px] font-semibold">
                    Notifications
                  </h3>
                  <img
                    src={cancelIcon}
                    alt="Close"
                    className="cursor-pointer right-[10px] top-[10px] h-4 w-4"
                    onClick={toggleNotification}
                  />
                </div>
                
              </div>
            </>
          )} */}
        </div>

        <div
          className="flex-1 bg-no-repeat bg-cover bg-center w-full h-full z-10"
          style={{ backgroundImage: `url(${formbg})` }}
        >
          <div className="w-full h-full relative z-20">
            {/* <div className="absolute top-[30rem] left-60 p-4 bg-white shadow-lg rounded-lg w-[450px] h-[200px]">
              <h4 className="text-black font-bold text-lg">
                Total Drivers on Route
              </h4>
              <p className="text-black text-2xl">{totalDrivers}</p>
            </div> */}

            {userLocation && <MapContainer
              center={userLocation} // (Kano, Nigeria)
              zoom={13}
              className="h-full w-full rounded-lg relative"
            >
              <div
                style={{
                  position: "absolute",
                  bottom: "40px",
                  left: "10px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  padding: "12px 19px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  zIndex: 1000,
                }}
              >
                {/* <p style={{ margin: 0, fontWeight: "bold", color: "#1E1E1E" }}>
                  Drivers on Route: 8
                </p> */}
              </div>

              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="TRASH AWAY"
              />
              <Marker position={userLocation} icon={carMarkerIcon}>
                <Popup>TrashAway Vehicle D1</Popup>
              </Marker>

              {/* <Marker position={[11.9944, 8.5323]} icon={carMarkerIcon}>
                <Popup>TrashAway Vehicle D3</Popup>
              </Marker>

              <Marker position={[11.9847, 8.5254]} icon={carMarkerIcon}>
                <Popup>TrashAway Vehicle D1</Popup>
              </Marker>

              <Marker position={[12.0043, 8.4833]} icon={carMarkerIcon}>
                <Popup>TrashAway Vehicle D5</Popup>
              </Marker>

              <Marker position={[11.9802, 8.4958]} icon={carMarkerIcon}>
                <Popup>TrashAway Vehicle D6</Popup>
              </Marker>

              <Marker position={[11.9809, 8.4826]} icon={carMarkerIcon}>
                <Popup>TrashAway Vehicle D7</Popup>
              </Marker>

              <Marker position={[12.1806, 8.9121]} icon={carMarkerIcon}>
                <Popup>TrashAway Vehicle D7</Popup>
              </Marker>

              <Marker position={[12.0192, 8.5089]} icon={carMarkerIcon}>
                <Popup>TrashAway Vehicle D8</Popup>
              </Marker> */}
            </MapContainer>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffTracking;
