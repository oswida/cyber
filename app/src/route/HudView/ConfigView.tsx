import { useI18n } from "@solid-primitives/i18n";
import {
  Accessor,
  Component,
  createEffect,
  createMemo,
  createSignal,
  Match,
  Setter,
  Show,
  Switch,
} from "solid-js";
import {
  inodSessionKey,
  mqttClientLink,
  saveGenericData,
  sessionData,
  SessionInfo,
  setSessionData,
  storageSize,
  useAppData,
} from "~/common";
import { Button, Dialog, Flex, Input, Texte } from "~/component";

type Props = {
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
};

export const ConfigView: Component<Props> = ({ open, setOpen }) => {
  const [t] = useI18n();
  const apd = useAppData();
  var nameRef: HTMLInputElement;
  var colorRef: HTMLInputElement;
  var remoteRef: HTMLInputElement;
  var natsRef: HTMLInputElement;
  var natsTokenRef: HTMLInputElement;
  const [hosting, setHosting] = createSignal(false);

  createEffect(() => {
    if (!open() || nameRef === undefined || colorRef === undefined || !apd)
      return;
    const data = sessionData();
    if (!data) return;
    nameRef.value = data.username ? data.username : "";
    colorRef.value = data.color ? data.color : "";
    natsRef.value = data.nats;
    natsTokenRef.value = data.nats_token;
    remoteRef.value = data.remote;
    setHosting(data.hosting);
  });

  const save = () => {
    if (!nameRef || !colorRef || !apd) return;
    const newState = {
      ...sessionData(),
      username: nameRef.value,
      color: colorRef.value,
      nats: natsRef.value,
      nats_token: natsTokenRef.value,
      remote: remoteRef.value,
      hosting: hosting(),
    } as SessionInfo;
    setSessionData(newState);
    saveGenericData(inodSessionKey, newState);
    setOpen(false);
  };

  const switchHosting = () => {
    if (!apd) return;
    setHosting(!hosting());
  };

  const link = createMemo(() => {
    return mqttClientLink();
  });

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      title={t("Configuration")}
      opacity="more"
    >
      <Flex type="column" center style={{ gap: "10px" }}>
        <Texte color="pink">{t("Storage")}</Texte>
        <Flex>
          <Texte>Current storage is</Texte>
          <Texte color="yellow"> {`${storageSize()} bytes`}</Texte>
        </Flex>
        <Texte size="small" style={{ "max-width": "80em" }}>
          Please remember that this app is using local browser storage instead
          of a database. The most popular limit for such a storage is about 5MB.
        </Texte>
        <Texte color="pink">{t("Identification")}</Texte>
        <Flex>
          <Texte>{`Browser ID:`}</Texte>
          <Texte color="yellow">{sessionData()?.browserID}</Texte>
        </Flex>
        <Flex vcenter style={{ gap: "15px" }}>
          <Flex vcenter>
            <Texte>Username</Texte>
            <Input ref={(el) => (nameRef = el)} />
          </Flex>
          <Flex vcenter>
            <Texte>Color (HTML code)</Texte>
            <Input ref={(el) => (colorRef = el)} style={{ width: "7em" }} />
          </Flex>
        </Flex>
        <Texte color="pink">{t("Network_connection")}</Texte>
        <Texte size="small" style={{ "max-width": "80em" }}>
          If you have an access to some MQTT server with Websockets, you can
          share dice rolls and board notes with other users. Please select
          'Host' or 'Client' mode below. <br />
          In 'Host' mode, you need only a MQTT server address and credentials
          (if needed), for 'Client' there should be also provided an ID of the
          hosting browser.
          <br />
        </Texte>
        <Switch>
          <Match when={hosting()}>
            <Flex>
              <Button onClick={switchHosting}>{t("Client")}</Button>
              <Button color="filled" onClick={switchHosting}>
                {t("Host")}
              </Button>
            </Flex>
          </Match>
          <Match when={!hosting()}>
            <Flex>
              <Button color="filled" onClick={switchHosting}>
                {t("Client")}
              </Button>
              <Button onClick={switchHosting}>{t("Host")}</Button>
            </Flex>
          </Match>
        </Switch>

        <Flex type="column" style={{ "align-items": "end" }}>
          <Flex vcenter>
            <Texte>Server address</Texte>
            <Input
              ref={(el) => (natsRef = el)}
              style={{ width: "25em" }}
              placeholder="ex. ws://hostname:port"
            />
          </Flex>
          <Flex vcenter>
            <Texte>Credentials</Texte>
            <Input
              ref={(el) => (natsTokenRef = el)}
              style={{ width: "25em" }}
              placeholder="username:password"
            />
          </Flex>
          <Show when={!hosting()}>
            <Flex vcenter>
              <Texte>Remote host Browser ID</Texte>
              <Input
                ref={(el) => (remoteRef = el)}
                style={{ width: "25em" }}
                placeholder="ex. 854a051c-7869-4698-9dfa-4feccb748ce4"
              />
            </Flex>
          </Show>
          <Show when={hosting()}>
            <Flex type="column" center style={{ "margin-top": "15px" }}>
              <Texte color="pink">{t("Connection_link")}</Texte>
              <Texte
                size="small"
                style={{
                  "max-width": "800px",
                  "overflow-wrap": "anywhere",
                  "align-self": "end",
                }}
              >
                {link()}
              </Texte>
            </Flex>
          </Show>
        </Flex>
        <Button onClick={save} style={{ "margin-top": "15px" }}>
          {t("Save")}
        </Button>
      </Flex>
    </Dialog>
  );
};
