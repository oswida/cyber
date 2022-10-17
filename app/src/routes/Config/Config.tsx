import { useAtom, useAtomValue } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  configOpen,
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
  const remoteRef = useRef<HTMLInputElement>();
  const natsRef = useRef<HTMLInputElement>();
  const natsTokenRef = useRef<HTMLInputElement>();
  const uname = useMemo(() => sessionData.username, [sessionData]);
  const proxy = useMemo(() => sessionData.nats, [sessionData]);
  const remote = useMemo(() => sessionData.remote, [sessionData]);
  const token = useMemo(() => sessionData.nats_token, [sessionData]);
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
      setErr("Username is required");
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

  return (
    <Modal isOpen={co} onClose={() => setCo(false)}>
      <Flex direction="column" css={{ alignItems: "center", gap: 15 }}>
        <Text size="small" color="pink">
          Storage
        </Text>
        <Text css={{ width: 700, textAlign: "center" }} size="small">
          Current storage use is: <b>{`${storageSize} bytes`}</b>.<br />
          Please remember that this app is using local browser storage instead
          of a database.
          <br /> The most popular limit for such a storage is about 5MB.
        </Text>
        <Text size="small" color="pink">
          Identification
        </Text>
        <Flex>
          <Text>ID:</Text>
          <Text color="yellow">{sessionData.browserID}</Text>
        </Flex>
        <Flex css={{ alignItems: "center" }}>
          <Text>Username:</Text>
          <Input ref={nameRef as any} defaultValue={uname} />
        </Flex>
        <Text size="small" color={nats.connection != null ? "green" : "pink"}>
          Connection {nats.connection != null && `(established)`}
        </Text>
        <Text css={{ width: 700, textAlign: "center" }} size="small">
          If you have an access to some NATS server, you can share dice rolls
          and board notes with other users. Please select 'Host' or 'Client'
          mode below. In 'Host' mode, you need only a NATS server address, for
          'Client' there should be also an ID of the hosting browser provided.
        </Text>
        <Flex css={{ alignItems: "center" }}>
          <Text>NATS Server:</Text>
          <Input
            ref={natsRef as any}
            defaultValue={proxy}
            css={{ width: "20em" }}
            onChange={() => setRefreshLink(!refreshLink)}
          />
        </Flex>
        <Flex css={{ alignItems: "center" }}>
          <Text>NATS Auth Token (if needed):</Text>
          <Input
            ref={natsTokenRef as any}
            defaultValue={token}
            css={{ width: "20em" }}
            onChange={() => setRefreshLink(!refreshLink)}
          />
        </Flex>
        <Flex css={{ alignItems: "center" }}>
          {host && <Text color="pink">Hosting...</Text>}
          {host && (
            <Button onClick={() => setHost(false)}>switch to Client</Button>
          )}
          {!host && (
            <Button onClick={() => setHost(true)}>switch to Host</Button>
          )}
        </Flex>

        <Flex
          css={{
            alignItems: "center",
            visibility: host ? "hidden" : "visible",
            height: host ? 0 : undefined,
          }}
        >
          <Text color={host ? "pink" : "primary"}>Remote ID:</Text>
          <Input
            ref={remoteRef as any}
            defaultValue={remote}
            disabled={host}
            css={{ width: "20em" }}
          />
        </Flex>

        {host && (
          <Flex direction="column">
            <Text size="small">Connection link:</Text>
            <Text size="small" css={{ maxWidth: 700 }}>
              {hostLink}
            </Text>
          </Flex>
        )}

        <Button css={{ marginTop: 10, maxWidth: "max-content" }} onClick={save}>
          Save
        </Button>
        {err !== "" && <Text color="pink">{err}</Text>}
      </Flex>
    </Modal>
  );
};
