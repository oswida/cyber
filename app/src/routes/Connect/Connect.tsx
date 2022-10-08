import { useAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { stateSessionData, useNats } from "~/common";

export const Connect = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [sessionData, setSessionData] = useAtom(stateSessionData);
  const { connectNats } = useNats();

  useEffect(() => {
    if (!params) return;
    console.log("Connect", params);

    const id = params.get("id");
    if (!id) {
      navigate("/");
      return;
    }
    const server = params.get("server");
    const token = params.get("token");
    const newState = {
      ...sessionData,
      hosting: false,
      remote: id,
      nats: server ? server : sessionData.nats,
      nats_token: token ? token : sessionData.nats_token,
    };

    setSessionData(newState);
    connectNats(newState).then(() => {
      navigate("/");
    });
  }, [params]);

  return <></>;
};
