import { lens } from "../lensesWithObjects";

const getMap =
  <K, V>(key: K) =>
  (map: Map<K, V>) =>
    map.get(key);

const setMap =
  <K, V>(key: K) =>
  (value: V) =>
  (map: Map<K, V>) =>
    new Map(map).set(key, value);

const lensMap = <K, V>(key: K) =>
  lens(getMap<K, V>(key), setMap<K, V>(key));

export {};
