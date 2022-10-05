import { useAtom, useAtomValue } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  configOpen,
  sessionDataType,
  stateNats,
  stateSessionData,
  stateStorageSize,
} from "~/common";
import { Button, Flex, Input, Modal, Text } from "~/component";
import { useStorage } from "~/common/storage";

export const Config = ({
  saveCallback,
}: {
  saveCallback: (data: sessionDataType) => void;
}) => {
  const [sessionData, setSessionData] = useAtom(stateSessionData);
  const [co, setCo] = useAtom(configOpen);
  const nameRef = useRef<HTMLInputElement>();
  const remoteRef = useRef<HTMLInputElement>();
  const natsRef = useRef<HTMLInputElement>();
  const uname = useMemo(() => sessionData.username, [sessionData]);
  const proxy = useMemo(() => sessionData.nats, [sessionData]);
  const remote = useMemo(() => sessionData.remote, [sessionData]);
  const [host, setHost] = useState(false);
  const nats = useAtomValue(stateNats);
  const { saveSessionData } = useStorage();
  const storageSize = useAtomValue(stateStorageSize);
  const [err, setErr] = useState("");

  useEffect(() => {
    setHost(sessionData.hosting);
  }, [sessionData]);

  const save = () => {
    if (!nameRef.current || !remoteRef.current || !natsRef.current) return;
    setErr("");
    if (nameRef.current.value == "") {
      setErr("Username is required");
      return;
    }
    if (!host && remoteRef.current.value == "") {
      setErr(
        "If you selected client connection, the remote ID should be provided"
      );
      return;
    }
    const newValue = {
      ...sessionData,
      username: nameRef.current.value,
      remote: remoteRef.current.value,
      proxy: natsRef.current.value,
      hosting: host,
    };
    saveSessionData(newValue);
    setSessionData(newValue);
    setCo(false);
    // nats connection
    saveCallback(newValue);
  };

  return (
    <Modal isOpen={co} onClose={() => setCo(false)}>
      <Flex direction="column" css={{ alignItems: "flex-end", gap: 15 }}>
        <Text color="yellow">Storage</Text>
        <Text css={{ width: 500, textAlign: "right" }}>
          Current storage use is: <b>{`${storageSize} bytes`}</b>.<br />
          Please remember that this app is using local browser storage instead
          of a database. The most popular limit for such a storage is about 5MB.
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
        <Flex css={{ alignItems: "center" }}>
          <Text>Proxy Server:</Text>
          <Input ref={natsRef as any} defaultValue={proxy} />
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

        <Flex css={{ alignItems: "center" }}>
          <Text color={host ? "pink" : "primary"}>Remote ID:</Text>
          <Input
            ref={remoteRef as any}
            defaultValue={remote}
            disabled={host}
            css={{ width: "20em" }}
          />
        </Flex>

        <Button css={{ marginTop: 10, maxWidth: "max-content" }} onClick={save}>
          Save
        </Button>
        {err !== "" && <Text color="pink">{err}</Text>}
      </Flex>
    </Modal>
  );
};
