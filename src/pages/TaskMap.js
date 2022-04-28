import React, { useState, useEffect } from "react";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    DirectionsRenderer,
} from "@react-google-maps/api";

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import api from "../Helper/api";

function TaskMap({ userAccount, mappedTodos, startRoute, setStartRoute }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "",
        libraries: ["places"],
    });

    if (!isLoaded)
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );

    return (
        <Map
            userAccount={userAccount}
            mappedTodos={mappedTodos}
            startRoute={startRoute}
            setStartRoute={setStartRoute}
        />
    );
}

export default TaskMap;

const centerOfStillWater = { lat: 36.1226001, lng: -97.0699991 };

function Map({ userAccount, mappedTodos, startRoute, setStartRoute }) {
    const [selected, setSelected] = useState(null);
    const [displayTodos, setDisplayTodos] = useState([]);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [selectedOrigin, setSelectedOrigin] = useState(null);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [center, setCenter] = useState(null);

    useEffect(() => {
        setSelected(null);
        const newMappedTodos = mappedTodos.filter(
            (todo) => todo.checked === true
        );
        setDisplayTodos(newMappedTodos);
        console.log("displayed todos:", newMappedTodos);
        if (newMappedTodos.length === 0) {
            setStartRoute(false);

            setCenter(centerOfStillWater);
        } else {
            const geoInfo = newMappedTodos[0].addr.split("%", 2);
            const geo = {
                lat: parseFloat(geoInfo[0]),
                lng: parseFloat(geoInfo[1]),
            };
            setCenter(geo);
        }
    }, [mappedTodos, setStartRoute]);

    useEffect(() => {
        if (selected) {
            setCenter(selected);
        }
    }, [selected]);

    useEffect(() => {
        if (startRoute) {
            calculateRoute();
            console.log("generate route result");
        } else {
            setDirectionsResponse(null);
            console.log("clear route result");
        }
    }, [startRoute]);

    async function calculateRoute() {
        if (selectedOrigin === null || selectedDestination === null) {
            setStartRoute(false);
            return;
        }
        const waypts = [];

        for (let i = 0; i < displayTodos.length; i++) {
            const geoInfo = displayTodos[i].addr.split("%", 2);
            const geo = {
                lat: parseFloat(geoInfo[0]),
                lng: parseFloat(geoInfo[1]),
            };

            waypts.push({
                location: geo,
                stopover: true,
            });
        }

        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
            origin: selectedOrigin,
            destination: selectedDestination,
            waypoints: waypts,
            optimizeWaypoints: true,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
        });
        setDirectionsResponse(results);
        console.log("get direction response");
    }

    return (
        <>
            {displayTodos.length === 0 ? (
                <div className="places-container">
                    <PlacesAutocomplete
                        setSelected={setSelected}
                        selected={selected}
                        userAccount={userAccount}
                    />
                </div>
            ) : (
                <>
                    <div className="places-container3">
                        <PlacesAutocomplete2
                            setSelected={setSelectedOrigin}
                            selected={selectedOrigin}
                            userAccount={userAccount}
                            isOrigin={true}
                        />
                    </div>
                    <div className="places-container2">
                        <PlacesAutocomplete2
                            setSelected={setSelectedDestination}
                            selected={selectedDestination}
                            userAccount={userAccount}
                            isOrigin={false}
                        />
                    </div>
                </>
            )}

            {center && (
                <GoogleMap
                    zoom={16}
                    center={center}
                    mapContainerClassName="map-container"
                >
                    {directionsResponse ? (
                        <DirectionsRenderer directions={directionsResponse} />
                    ) : displayTodos.length !== 0 ? (
                        displayTodos.map((todo) => {
                            const geoInfo = todo.addr.split("%", 2);
                            const geo = {
                                lat: parseFloat(geoInfo[0]),
                                lng: parseFloat(geoInfo[1]),
                            };
                            console.log("selected", selected);
                            console.log("geo Object", geo);
                            return <Marker position={geo} />;
                        })
                    ) : (
                        selected && <Marker position={selected} />
                    )}
                </GoogleMap>
            )}
        </>
    );
}

const PlacesAutocomplete = ({ setSelected, selected, userAccount }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        setSelected({ lat, lng });
    };

    const saveHandler = () => {
        //save it to database
        api.post(`/locations/${userAccount.userName}`, {
            lat: selected.lat,
            lng: selected.lng,
            formattedAddr: value,
        }).then((res) => {
            setSelected(null);
            setValue("");
            //setRefresh(!toFresh);
        });
    };

    return (
        <div className="places-action-container">
            <Combobox onSelect={handleSelect} className="subContainer">
                <ComboboxInput
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    className="combobox-input"
                    placeholder="Search an address"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ place_id, description }) => (
                                <ComboboxOption
                                    key={place_id}
                                    value={description}
                                    style={{ color: "black" }}
                                />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
            {selected ? (
                <button className="mapbutton" onClick={saveHandler}>
                    Save this location
                </button>
            ) : (
                <div></div>
            )}
        </div>
    );
};

const PlacesAutocomplete2 = ({
    setSelected,
    selected,
    userAccount,
    isOrigin,
}) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        setSelected({ lat, lng });
    };
    return (
        <div className="places-action-container2">
            <Combobox onSelect={handleSelect} className="subContainer2">
                <ComboboxInput
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    className="combobox-input2"
                    placeholder={isOrigin ? "Origin" : "Destination"}
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ place_id, description }) => (
                                <ComboboxOption
                                    key={place_id}
                                    value={description}
                                    style={{ color: "black" }}
                                />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
};
