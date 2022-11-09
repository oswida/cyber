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
import { Trans } from "@lingui/macro";

export const Config = ({
  saveCallback,
}: {
  saveCallback: (data: SessionInfo) => void;
}) => {
  const [sessionData, setSessionData] = useAtom(stateSessionData);
  const [, setLang] = useAtom(language);
  const [co, setCo] = useAtom(configOpen);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const colorRef = useRef<HTMLInputElement | null>(null);
  const remoteRef = useRef<HTMLInputElement | null>(null);
  const natsRef = useRef<HTMLInputElement | null>(null);
  const natsTokenRef = useRef<HTMLInputElement | null>(null);
  const uname = useMemo(() => sessionData.username, [sessionData]);
  const proxy = useMemo(() => sessionData.nats, [sessionData]);
  const remote = useMemo(() => sessionData.remote, [sessionData]);
  const token = useMemo(() => sessionData.nats_token, [sessionData]);
  const ucolor = useMemo(() => sessionData.color, [sessionData]);

  const [host, setHost] = useState(false);
  const nats = useAtomValue(stateNats);
  const { saveSessionData } = useStorage();
  const storageSize = useAtomValue(stateStorageSize);
  const [err, setErr] = useState<any>(null);
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
      setErr(<Trans>Username required</Trans>);
      return;
    }
    if (
      !host &&
      natsRef.current.value !== "" &&
      remoteRef.current.value == ""
    ) {
      setErr(
        <Trans>
          If you provided NATS server and selected client connection, the remote
          ID should be provided
        </Trans>
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
    if (sessionData.lang === "pl") {
      setSessionData((state) => ({ ...state, lang: "en" }));
      setLang("en");
    } else {
      setSessionData((state) => ({ ...state, lang: "pl" }));
      setLang("pl");
    }
  };

  return (
    <Modal isOpen={co} onClose={() => setCo(false)}>
      <Flex direction="column" css={{ alignItems: "center", gap: 15 }}>
        <Text size="small" color="pink">
          {<Trans>Storage</Trans>}
        </Text>
        <Text css={{ width: 850, textAlign: "center" }} size="small">
          <Trans>Current storage use is:</Trans> <b>{`${storageSize} bytes`}</b>
          .<br />
          <Trans>
            Please remember that this app is using local browser storage instead
            of a database. The most popular limit for such a storage is about
            5MB.
          </Trans>
        </Text>
        <Text size="small" color="pink">
          <Trans>Identification</Trans>
        </Text>
        <Flex>
          <Text>ID:</Text>
          <Text color="yellow">{sessionData.browserID}</Text>
        </Flex>
        <Flex css={{ alignItems: "center" }}>
          <Text>
            <Trans>Username</Trans>:
          </Text>
          <Input ref={nameRef} defaultValue={uname} />
          <Text>
            <Trans>Color</Trans>:
          </Text>
          <Input ref={colorRef} defaultValue={ucolor} css={{ width: "7em" }} />
          <Button css={{ marginLeft: 20 }} size="small" onClick={toggleLang}>
            {sessionData.lang}
          </Button>
        </Flex>
        <Text size="small" color={nats.connection != null ? "green" : "pink"}>
          <Trans>Connection</Trans>
          {nats.connection != null && <Trans>established</Trans>}
        </Text>
        <Text css={{ width: 700, textAlign: "center" }} size="small">
          <Trans>
            If you have an access to some NATS server, you can share dice rolls
            and board notes with other users. Please select 'Host' or 'Client'
            mode below. In 'Host' mode, you need only a NATS server address, for
            'Client' there should be also an ID of the hosting browser provided
          </Trans>
        </Text>
        <Flex css={{ alignItems: "center" }}>
          <Text>
            <Trans>NATS Server</Trans>:
          </Text>
          <Input
            ref={natsRef}
            defaultValue={proxy}
            css={{ width: "20em" }}
            onChange={() => setRefreshLink(!refreshLink)}
          />
        </Flex>
        <Flex css={{ alignItems: "center" }}>
          <Text>
            <Trans>NATS Auth Token (if needed)</Trans>:
          </Text>
          <Input
            ref={natsTokenRef}
            defaultValue={token}
            css={{ width: "20em" }}
            onChange={() => setRefreshLink(!refreshLink)}
          />
        </Flex>
        <Flex css={{ alignItems: "center" }}>
          {host && (
            <Text color="pink">
              <Trans>Hosting</Trans>...
            </Text>
          )}
          {host && (
            <Button onClick={() => setHost(false)}>
              <Trans>switch to Client</Trans>
            </Button>
          )}
          {!host && (
            <Button onClick={() => setHost(true)}>
              <Trans>switch to Host</Trans>
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
            <Trans>Remote ID</Trans>:
          </Text>
          <Input
            ref={remoteRef}
            defaultValue={remote}
            disabled={host}
            css={{ width: "20em" }}
          />
        </Flex>

        {host && (
          <Flex direction="column">
            <Text size="small">
              <Trans>Connection link</Trans>:
            </Text>
            <Text size="small" css={{ maxWidth: 700 }}>
              {hostLink}
            </Text>
          </Flex>
        )}

        <Button css={{ marginTop: 10, maxWidth: "max-content" }} onClick={save}>
          <Trans>Save</Trans>
        </Button>
        {err !== "" && <Text color="pink">{err}</Text>}
      </Flex>
    </Modal>
  );
};
