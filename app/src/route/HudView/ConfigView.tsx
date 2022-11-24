import { useI18n } from "@solid-primitives/i18n";
import {
  Accessor,
  Component,
  createEffect,
  createMemo,
  Match,
  Setter,
  Show,
  Switch,
} from "solid-js";
import { inodSessionKey, saveGenericData, useAppData } from "~/common";
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

  createEffect(() => {
    if (!open() || nameRef === undefined || colorRef === undefined || !apd)
      return;
    const data = apd.sessionData();
    if (!data) return;
    nameRef.value = data.username ? data.username : "";
    colorRef.value = data.color ? data.color : "";
  });

  const save = () => {
    if (!nameRef || !colorRef || !apd) return;
    const newState = {
      ...apd.sessionData(),
      username: nameRef.value,
      color: colorRef.value,
    };
    apd.setSessionData(newState);
    saveGenericData(apd, inodSessionKey, newState);
    setOpen(false);
  };

  const isHost = createMemo(() => {
    if (!apd) return false;
    return apd.sessionData().hosting;
  });

  const switchHosting = () => {
    if (!apd) return;
    apd.setSessionData((prev) => ({ ...prev, hosting: !prev.hosting }));
  };

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
          <Texte color="yellow"> {`${apd?.storageSize()} bytes`}</Texte>
        </Flex>
        <Texte size="small" style={{ "max-width": "80em" }}>
          Please remember that this app is using local browser storage instead
          of a database. The most popular limit for such a storage is about 5MB.
        </Texte>
        <Texte color="pink">{t("Identification")}</Texte>
        <Flex>
          <Texte>{`Browser ID:`}</Texte>
          <Texte color="yellow">{apd?.sessionData()?.browserID}</Texte>
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
          <Match when={isHost()}>
            <Button color="filled" onClick={switchHosting}>
              {t("Host")}
            </Button>
          </Match>
          <Match when={!isHost()}>
            <Button onClick={switchHosting}>{t("Client")}</Button>
          </Match>
        </Switch>

        <Flex type="column" style={{ "align-items": "end" }}>
          <Flex vcenter>
            <Texte>Server address</Texte>
            <Input
              ref={(el) => (natsRef = el)}
              style={{ width: "20em" }}
              placeholder="ex. ws://hostname:port"
            />
          </Flex>
          <Flex vcenter>
            <Texte>Credentials</Texte>
            <Input
              ref={(el) => (natsTokenRef = el)}
              style={{ width: "20em" }}
              placeholder="username:password"
            />
          </Flex>
          <Show when={!isHost()}>
            <Flex vcenter>
              <Texte>Remote host Browser ID</Texte>
              <Input
                ref={(el) => (remoteRef = el)}
                style={{ width: "20em" }}
                placeholder="ex. 854a051c-7869-4698-9dfa-4feccb748ce4"
              />
            </Flex>
          </Show>
        </Flex>
        <Button onClick={save}>{t("Save")}</Button>
      </Flex>
    </Dialog>
  );
};
