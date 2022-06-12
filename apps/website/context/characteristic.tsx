import {
  Climate,
  Edibility,
  Functionality,
  Layer,
  Soil,
  SunPreference,
  Zone
} from '@treelof/models';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

type CharacteristicContextType = {
  loading: boolean;
  edibilities?: Array<Edibility>;
  functionalities?: Array<Functionality>;
  layers?: Array<Layer>;
  sunPreferences?: Array<SunPreference>;
  soilPreferences?: Array<Soil>;
  climates?: Array<Climate>;
  zones?: Array<Zone>;
};
export const CharacteristicContext =
  React.createContext<CharacteristicContextType>({ loading: false });

interface Props {
  children?: React.ReactNode;
}
// provides all the values for categories
export const CharcteristicContextProvider: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(true); // indicates that the data is loading
  const [edibilities, setEdibilities] = useState();
  const [functionalities, setFunctionalities] = useState();
  const [layers, setLayers] = useState();
  const [sunPreferences, setSunPreferences] = useState();
  const [soilPreferences, setSoilPreferences] = useState();
  const [climates, setClimates] = useState();
  const [zones, setZones] = useState();

  // load the items
  useEffect(() => {
    (async () => {
      const promises: Array<Promise<unknown>> = [];
      // edibilities
      promises.push(
        axios.get(`/edibilities`).then(({ data }) => setEdibilities(data))
      );
      // functionalities
      promises.push(
        axios
          .get(`/functionalities`)
          .then(({ data }) => setFunctionalities(data))
      );
      // layers
      promises.push(axios.get(`/layers`).then(({ data }) => setLayers(data)));
      // sun preferences
      promises.push(
        axios
          .get(`/sun-preferences`)
          .then(({ data }) => setSunPreferences(data))
      );
      // soil preferences
      promises.push(
        axios.get(`/soils`).then(({ data }) => setSoilPreferences(data))
      );
      // climates
      promises.push(
        axios.get(`/climates`).then(({ data }) => setClimates(data))
      );
      // climates
      promises.push(axios.get(`/zones`).then(({ data }) => setZones(data)));
      await Promise.all(promises);
      setLoading(false);
    })();
  }, []);

  const value = {
    loading,
    edibilities,
    functionalities,
    layers,
    sunPreferences,
    soilPreferences,
    climates,
    zones
  };

  return (
    <CharacteristicContext.Provider value={value} {...props}>
      {/* pass value to immediate children */}
      {props.children}
    </CharacteristicContext.Provider>
  );
};