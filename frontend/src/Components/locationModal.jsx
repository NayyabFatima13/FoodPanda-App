import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";

import {
  Search,
  X,
  MapPin,
  Navigation,
} from "lucide-react";

import "leaflet/dist/leaflet.css";

// ==========================================
// FIX LEAFLET MARKER ICON
// ==========================================

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


// ==========================================
// MAP CLICK HANDLER
// ==========================================

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(event) {
      onMapClick(
        event.latlng.lat,
        event.latlng.lng
      );
    },
  });

  return null;
}


// ==========================================
// LOCATION MODAL
// ==========================================

function LocationModal({
  onClose,
  onLocationSelect,
}) {

  // ==========================================
  // STATE
  // ==========================================

  const [searchText, setSearchText] =
    useState("");

  const [searchResults, setSearchResults] =
    useState([]);

  const [selectedLocation, setSelectedLocation] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [currentLocationLoading, setCurrentLocationLoading] =
    useState(false);

  // Default location: Faisalabad
  const [mapPosition, setMapPosition] =
    useState([31.4504, 73.1350]);


  // ==========================================
  // SEARCH LOCATION
  // ==========================================

  const searchLocation = async () => {

    if (!searchText.trim()) {
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchText
        )}&limit=5&addressdetails=1`
      );

      const data = await response.json();

      setSearchResults(data);

    } catch (error) {

      console.error(
        "Location search failed:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // SELECT SEARCH RESULT
  // ==========================================

  const selectSearchResult = (result) => {

    const latitude =
      parseFloat(result.lat);

    const longitude =
      parseFloat(result.lon);

    const location = {

      address: result.display_name,

      latitude,

      longitude,

    };

    setSelectedLocation(location);

    setMapPosition([
      latitude,
      longitude,
    ]);

    setSearchResults([]);

  };


  // ==========================================
  // REVERSE GEOCODING
  // ==========================================

  const getAddressFromCoordinates =
    async (
      latitude,
      longitude
    ) => {

      try {

        setLoading(true);

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
        );

        const data =
          await response.json();

        const location = {

          address:
            data.display_name ||
            "Selected location",

          latitude,

          longitude,

        };

        setSelectedLocation(
          location
        );

        setMapPosition([
          latitude,
          longitude,
        ]);

      } catch (error) {

        console.error(
          "Reverse geocoding failed:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


  // ==========================================
  // MAP CLICK
  // ==========================================

  const handleMapClick = (
    latitude,
    longitude
  ) => {

    getAddressFromCoordinates(
      latitude,
      longitude
    );

  };


  // ==========================================
  // CURRENT LOCATION
  // ==========================================

  const handleCurrentLocation =
    () => {

      if (!navigator.geolocation) {

        alert(
          "Geolocation is not supported by your browser."
        );

        return;

      }

      setCurrentLocationLoading(
        true
      );

      navigator.geolocation.getCurrentPosition(

        (position) => {

          const latitude =
            position.coords.latitude;

          const longitude =
            position.coords.longitude;

          getAddressFromCoordinates(
            latitude,
            longitude
          );

          setCurrentLocationLoading(
            false
          );

        },

        (error) => {

          console.error(
            "Geolocation error:",
            error
          );

          alert(
            "Unable to get your current location."
          );

          setCurrentLocationLoading(
            false
          );

        }

      );

    };


  // ==========================================
  // CONFIRM LOCATION
  // ==========================================

  const handleConfirm = () => {

    if (!selectedLocation) {

      alert(
        "Please select a location first."
      );

      return;

    }

    localStorage.setItem(
      "selectedLocation",
      JSON.stringify(
        selectedLocation
      )
    );

    onLocationSelect(
      selectedLocation
    );

  };


  // ==========================================
  // LOAD SAVED LOCATION
  // ==========================================

  useEffect(() => {

    const savedLocation =
      localStorage.getItem(
        "selectedLocation"
      );

    if (!savedLocation) {
      return;
    }

    try {

      const location =
        JSON.parse(savedLocation);

      setSelectedLocation(
        location
      );

      setMapPosition([
        location.latitude,
        location.longitude,
      ]);

    } catch (error) {

      console.error(
        "Failed to load saved location:",
        error
      );

    }

  }, []);


  // ==========================================
  // RENDER
  // ==========================================

  return (

    <div className="location-modal-overlay">

      <div className="location-modal">

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="location-modal-header">

          <h2>
            Select your location
          </h2>

          <button
            className="location-close-btn"
            onClick={onClose}
          >
            <X size={22} />
          </button>

        </div>


        {/* ======================================
            SEARCH
        ====================================== */}

        <div className="location-search">

          <Search size={20} />

          <input
            type="text"
            placeholder="Search for your address"
            value={searchText}
            onChange={(e) =>
              setSearchText(
                e.target.value
              )
            }
            onKeyDown={(e) => {

              if (
                e.key === "Enter"
              ) {

                searchLocation();

              }

            }}
          />

          <button
            onClick={
              searchLocation
            }
          >
            Search
          </button>

        </div>


        {/* ======================================
            SEARCH RESULTS
        ====================================== */}

        {searchResults.length >
          0 && (

          <div className="location-results">

            {searchResults.map(
              (result) => (

                <button
                  key={result.place_id}
                  className="location-result"
                  onClick={() =>
                    selectSearchResult(
                      result
                    )
                  }
                >

                  <MapPin
                    size={18}
                  />

                  <span>
                    {
                      result.display_name
                    }
                  </span>

                </button>

              )
            )}

          </div>

        )}


        {/* ======================================
            CURRENT LOCATION
        ====================================== */}

        <button
          className="current-location-btn"
          onClick={
            handleCurrentLocation
          }
          disabled={
            currentLocationLoading
          }
        >

          <Navigation
            size={18}
          />

          {currentLocationLoading
            ? "Getting your location..."
            : "Use my current location"}

        </button>


        {/* ======================================
            MAP
        ====================================== */}

        <div className="location-map">

          <MapContainer
            center={mapPosition}
            zoom={13}
            scrollWheelZoom={true}
            style={{
              height: "100%",
              width: "100%",
            }}
          >

            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapClickHandler
              onMapClick={
                handleMapClick
              }
            />

            {selectedLocation && (

              <Marker
                position={[
                  selectedLocation.latitude,
                  selectedLocation.longitude,
                ]}
              />

            )}

          </MapContainer>

        </div>


        {/* ======================================
            SELECTED LOCATION
        ====================================== */}

        {selectedLocation && (

          <div className="selected-location">

            <MapPin
              size={20}
            />

            <div>

              <strong>
                Selected location
              </strong>

              <p>
                {
                  selectedLocation.address
                }
              </p>

            </div>

          </div>

        )}


        {/* ======================================
            CONFIRM
        ====================================== */}

        <button
          className="confirm-location-btn"
          onClick={
            handleConfirm
          }
          disabled={
            !selectedLocation ||
            loading
          }
        >
          Confirm location
        </button>

      </div>

    </div>

  );

}

export default LocationModal;