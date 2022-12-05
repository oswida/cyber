import { useI18n } from "@solid-primitives/i18n";
import { useNavigate } from "@solidjs/router";
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
import {
  Button,
  Dialog,
  Flex,
  Input,
  Select,
  SelectItemType,
  Texte,
} from "~/component";

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
  const [lng, setLng] = createSignal<string | undefined>(sessionData()?.lang);
  const langItems: SelectItemType[] = [
    { label: "PL", value: "pl" },
    { label: "EN", value: "en" },
  ];
  const navigate = useNavigate();

  createEffect(() => {
    if (!open() || nameRef === undefined || colorRef === undefined) return;
    const data = sessionData();
    if (!data) return;
    nameRef.value = data.username ? data.username : "";
    colorRef.value = data.color ? data.color : "";
    natsRef.value = data.nats;
    natsTokenRef.value = data.nats_token;
    remoteRef.value = data.remote;
    setLng(data.lang);
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
      lang: lng(),
    } as SessionInfo;
    setSessionData(newState);
    saveGenericData(inodSessionKey, newState);
    setOpen(false);
    window.location.href = "/";
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
          <Texte>{t("config_current_storage")}</Texte>
          <Texte color="yellow">
            {" "}
            {`${(storageSize() / 1024).toFixed(2)} KB`}
          </Texte>
        </Flex>
        <Texte size="small" style={{ "max-width": "80em" }}>
          {t("config_storage_info")}
        </Texte>
        <Texte color="pink">{t("Identification")}</Texte>
        <Flex>
          <Texte>{t("Browser_ID")}</Texte>
          <Texte color="yellow">{sessionData()?.browserID}</Texte>
        </Flex>
        <Flex vcenter style={{ gap: "15px" }}>
          <Flex vcenter>
            <Texte>{t("Username")}</Texte>
            <Input ref={(el) => (nameRef = el)} />
          </Flex>
          <Flex vcenter>
            <Texte>{`${t("Color")} (${t("HTML_code")})`}</Texte>
            <Input ref={(el) => (colorRef = el)} style={{ width: "7em" }} />
          </Flex>
          <Flex vcenter>
            <Select
              title="Lang"
              data={langItems}
              selected={lng}
              setSelected={setLng}
            />
          </Flex>
        </Flex>
        <Texte color="pink">{t("Network_connection")}</Texte>
        <Texte
          size="small"
          style={{ "max-width": "65em", "text-align": "center" }}
        >
          {t("config_network_desc1")}
          <br />
          {t("config_network_desc2")}
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
            <Texte>{t("Server_address")}</Texte>
            <Input
              ref={(el) => (natsRef = el)}
              style={{ width: "30em" }}
              placeholder="ex. ws://hostname:port"
            />
          </Flex>
          <Flex vcenter>
            <Texte>{t("Credentials")}</Texte>
            <Input
              ref={(el) => (natsTokenRef = el)}
              style={{ width: "30em" }}
              placeholder="username:password"
            />
          </Flex>
          <Show when={!hosting()}>
            <Flex vcenter>
              <Texte>{t("Remote_Browser_ID")}</Texte>
              <Input
                ref={(el) => (remoteRef = el)}
                style={{ width: "30em" }}
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
