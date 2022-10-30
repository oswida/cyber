import { useAtom, useAtomValue } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  configOpen,
  langHud,
  language,
  SessionInfo,
  stateNats,
  stateSessionData,
  stateStorageSize,
} from "~/common";
import { useStorage } from "~/common/storage";
import { Button, Flex, Input, Modal, Text } from "~/component";

export const Config = ({
  saveCallback,
}: {
  saveCallback: (data: SessionInfo) => void;
}) => {
  const [sessionData, setSessionData] = useAtom(stateSessionData);
  const [co, setCo] = useAtom(configOpen);
  const nameRef = useRef<HTMLInputElement>();
  const colorRef = useRef<HTMLInputElement>();
  const remoteRef = useRef<HTMLInputElement>();
  const natsRef = useRef<HTMLInputElement>();
  const natsTokenRef = useRef<HTMLInputElement>();
  const uname = useMemo(() => sessionData.username, [sessionData]);
  const proxy = useMemo(() => sessionData.nats, [sessionData]);
  const remote = useMemo(() => sessionData.remote, [sessionData]);
  const token = useMemo(() => sessionData.nats_token, [sessionData]);
  const ucolor = useMemo(() => sessionData.color, [sessionData]);

  const [host, setHost] = useState(false);
  const nats = useAtomValue(stateNats);
  const { saveSessionData } = useStorage();
  const storageSize = useAtomValue(stateStorageSize);
  const [err, setErr] = useState("");
  const lang = useAtomValue(language);
  const [refreshLink, setRefreshLink] = useState(false);

  useEffect(() => {
    setHost(sessionData.hosting);
  }, [sessionData]);

  const save = () => {
    if (
      !nameRef.current ||
      !remoteRef.current ||
      !natsRef.current ||
      !natsTokenRef.current
    ) {
      return;
    }
    setErr("");
    if (nameRef.current.value == "") {
      setErr(langHud[sessionData.lang!!].username_required);
      return;
    }
    if (
      !host &&
      natsRef.current.value !== "" &&
      remoteRef.current.value == ""
    ) {
      setErr(
        "If you provided NATS server and selected client connection, the remote ID should be provided"
      );
      return;
    }
    const newValue: SessionInfo = {
      ...sessionData,
      username: nameRef.current.value,
      remote: remoteRef.current.value,
      nats: natsRef.current.value,
      hosting: host,
      nats_token: natsTokenRef.current.value,
      color: colorRef.current?.value,
    };
    saveSessionData(newValue);
    setSessionData(newValue);
    setCo(false);
    // nats connection
    saveCallback(newValue);
  };

  const hostLink = useMemo(() => {
    const server =
      sessionData.nats !== ""
        ? `&server=${encodeURIComponent(sessionData.nats)}`
        : "";
    const token =
      sessionData.nats_token !== ""
        ? `&token=${encodeURIComponent(sessionData.nats_token)}`
        : "";
    let location = window.location.toString();
    if (!location.endsWith("#")) {
      location = location + "#";
    }
    return `${location}/connect?lang=${lang}&id=${encodeURIComponent(
      sessionData.browserID
    )}${server}${token}`;
  }, [sessionData]);

  useEffect(() => {
    setRefreshLink(!refreshLink);
  }, [natsRef.current, natsTokenRef.current]);

  const toggleLang = () => {
    if (sessionData.lang === "pl")
      setSessionData((state) => ({ ...state, lang: "en" }));
    else setSessionData((state) => ({ ...state, lang: "pl" }));
  };

  return (
    <Modal isOpen={co} onClose={() => setCo(false)}>
      <Flex direction="column" css={{ alignItems: "center", gap: 15 }}>
        <Text size="small" color="pink">
          {langHud[sessionData.lang!!].storage}
        </Text>
        <Text css={{ width: 850, textAlign: "center" }} size="small">
          {langHud[sessionData.lang!!].storage_desc1}{" "}
          <b>{`${storageSize} bytes`}</b>.<br />
          {langHud[sessionData.lang!!].storage_desc2}
        </Text>
        <Text size="small" color="pink">
          {langHud[sessionData.lang!!].identification}
        </Text>
        <Flex>
          <Text>ID:</Text>
          <Text color="yellow">{sessionData.browserID}</Text>
        </Flex>
        <Flex css={{ alignItems: "center" }}>
          <Text>{langHud[sessionData.lang!!].username}:</Text>
          <Input ref={nameRef as any} defaultValue={uname} />
          <Text>{langHud[sessionData.lang!!].color}:</Text>
          <Input
            ref={colorRef as any}
            defaultValue={ucolor}
            css={{ width: "7em" }}
          />
          <Button css={{ marginLeft: 20 }} size="small" onClick={toggleLang}>
            {sessionData.lang}
          </Button>
        </Flex>
        <Text size="small" color={nats.connection != null ? "green" : "pink"}>
          {langHud[sessionData.lang!!].connection}{" "}
          {nats.connection != null &&
            `(${langHud[sessionData.lang!!].established})`}
        </Text>
        <Text css={{ width: 700, textAlign: "center" }} size="small">
          {langHud[sessionData.lang!!].nats_desc}
        </Text>
        <Flex css={{ alignItems: "center" }}>
          <Text>{langHud[sessionData.lang!!].nats_server}:</Text>
          <Input
            ref={natsRef as any}
            defaultValue={proxy}
            css={{ width: "20em" }}
            onChange={() => setRefreshLink(!refreshLink)}
          />
        </Flex>
        <Flex css={{ alignItems: "center" }}>
          <Text>{langHud[sessionData.lang!!].nats_token}:</Text>
          <Input
            ref={natsTokenRef as any}
            defaultValue={token}
            css={{ width: "20em" }}
            onChange={() => setRefreshLink(!refreshLink)}
          />
        </Flex>
        <Flex css={{ alignItems: "center" }}>
          {host && (
            <Text color="pink">{langHud[sessionData.lang!!].hosting}...</Text>
          )}
          {host && (
            <Button onClick={() => setHost(false)}>
              {langHud[sessionData.lang!!].switch_client}
            </Button>
          )}
          {!host && (
            <Button onClick={() => setHost(true)}>
              {langHud[sessionData.lang!!].switch_host}
            </Button>
          )}
        </Flex>

        <Flex
          css={{
            alignItems: "center",
            visibility: host ? "hidden" : "visible",
            height: host ? 0 : undefined,
          }}
        >
          <Text color={host ? "pink" : "primary"}>
            {langHud[sessionData.lang!!].remote_id}:
          </Text>
          <Input
            ref={remoteRef as any}
            defaultValue={remote}
            disabled={host}
            css={{ width: "20em" }}
          />
        </Flex>

        {host && (
          <Flex direction="column">
            <Text size="small">
              {langHud[sessionData.lang!!].connection_link}:
            </Text>
            <Text size="small" css={{ maxWidth: 700 }}>
              {hostLink}
            </Text>
          </Flex>
        )}

        <Button css={{ marginTop: 10, maxWidth: "max-content" }} onClick={save}>
          {langHud[sessionData.lang!!].save}
        </Button>
        {err !== "" && <Text color="pink">{err}</Text>}
      </Flex>
    </Modal>
  );
};
