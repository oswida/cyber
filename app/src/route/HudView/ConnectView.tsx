import { Navigate, useSearchParams } from "@solidjs/router";
import { Component } from "solid-js";
import {
  decompressData64,
  inodSessionKey,
  saveGenericData,
  sessionData,
  setSessionData,
  useAppData,
} from "~/common";

export const ConnectView: Component = () => {
  const apd = useAppData();
  const [params] = useSearchParams();

  let data = params.data;
  if (data.trim() !== "") {
    const dt = decompressData64(data);
    const newState = {
      ...sessionData(),
      nats: dt.nats,
      nats_token: dt.token,
      remote: dt.remote,
      hosting: false,
    };

    setSessionData(newState);
    saveGenericData(inodSessionKey, newState);
  }
  return <Navigate href={"/"}></Navigate>;
};
