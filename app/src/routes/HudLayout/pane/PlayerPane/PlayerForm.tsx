import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  langHud,
  PcInfo,
  stateNats,
  statePlayerForm,
  statePlayers,
  stateSessionData,
  styled,
  topicChars,
  useNats,
} from "~/common";
import { useStorage } from "~/common/storage";
import { Button, Flex, Modal, Text } from "~/component";
import { CyberdeckForm } from "./CyberdeckForm";
import { CybermodForm } from "./CybermodForm";
import { InventoryForm } from "./InventoryForm";
import { PFInput } from "./styles";

const FormRoot = styled("div", {
  overflowY: "auto",
  overflowX: "hidden",
  width: "80vw",
  marginTop: 30,
  marginBottom: 30,
});

export const PlayerForm = ({ item }: { item: PcInfo | undefined }) => {
  const [pf, setPf] = useAtom(statePlayerForm);
  const [players, setPlayers] = useAtom(statePlayers);
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm<PcInfo>();
  const { savePlayers } = useStorage();
  const { publish } = useNats();
  const nats = useAtomValue(stateNats);
  const sessionData = useAtomValue(stateSessionData);

  useEffect(() => {
    if (!item) return;
    setValue("inventory", item.inventory);
    setValue("cybermods", item.cybermods);
    setValue("cyberdeck", item.cyberdeck);
    setValue("id", item.id);
    setValue("shared", item.shared);
    setValue("deprived", item.deprived ? true : false);
  }, [item]);

  const inventory = watch("inventory");
  const cybermods = watch("cybermods");
  const cyberdeck = watch("cyberdeck");
  const shared = watch("shared");
  const deprived = watch("deprived");

  const onSubmit = (data: PcInfo) => {
    if (!item) return;
    const newState = { ...players };
    newState[item.id] = data;
    setPlayers(newState);
    savePlayers(newState);
    setPf({ item: undefined, open: false });
    if (data.shared) {
      publish(nats.connection, topicChars, [data]);
    }
  };

  const deleteItem = () => {
    if (!item) return;
    const newState = { ...players };
    newState[item.id] = undefined;
    setPlayers(newState);
    savePlayers(newState);
    setPf({ item: undefined, open: false });
  };

  const toggleShared = () => {
    if (!item) return;
    const info = getValues();
    setValue("shared", !info.shared);
  };

  const toggleDeprived = () => {
    if (!item) return;

    const info = getValues();
   
    setValue("deprived", info.deprived ? false : true);
  };

  return (
    <Modal
      opacity="more"
      isOpen={pf.open}
      onClose={() => setPf({ open: false, item: undefined })}
    >
      <FormRoot>
        <form>
          <Flex direction="column" css={{ width: "80vw", gap: 30 }} center>
            <Flex css={{ gap: 40 }} center>
              <Flex direction="column" css={{ flex: 1 }}>
                <Text color="yellow" size="small">
                  {langHud[sessionData.lang!!].name}
                </Text>
                <PFInput
                  css={{
                    width: 250,
                  }}
                  defaultValue={item?.name ?? ""}
                  {...register("name")}
                />
              </Flex>
              <Flex direction="column">
                <Text color="yellow" size="small">
                  {langHud[sessionData.lang!!].credits}
                </Text>

                <PFInput
                  {...register("credits")}
                  defaultValue={item?.credits ?? 0}
                  css={{
                    width: 130,
                  }}
                />
              </Flex>
              <Flex direction="column">
                <Text color="yellow" size="small">
                  {langHud[sessionData.lang!!].subscription}
                </Text>
                <PFInput
                  css={{
                    width: 130,
                  }}
                  defaultValue={item?.subscription ?? ""}
                  {...register("subscription")}
                />
              </Flex>
              <Button
                size="small"
                color={shared ? "green" : undefined}
                css={{ alignSelf: "center" }}
                onClick={toggleShared}
              >
                {shared
                  ? langHud[sessionData.lang!!].shared
                  : langHud[sessionData.lang!!].private}
              </Button>
            </Flex>

            <Flex css={{ gap: 40 }}>
              <Flex direction="column" center>
                <Text color="yellow" size="small">
                  BIO
                </Text>
                <Flex>
                  <PFInput
                    center
                    css={{ width: "2em" }}
                    defaultValue={item?.bio ? item?.bio[0] : 0}
                    {...register("bio.0")}
                    maxLength={2}
                  />
                  /
                  <PFInput
                    center
                    css={{ width: "2em" }}
                    defaultValue={item?.bio ? item?.bio[1] : 0}
                    {...register("bio.1")}
                    maxLength={2}
                  />
                </Flex>
              </Flex>

              <Flex direction="column" center>
                <Text color="yellow" size="small">
                  PSY
                </Text>
                <Flex>
                  <PFInput
                    center
                    css={{ width: "2em" }}
                    defaultValue={item?.psy ? item?.psy[0] : 0}
                    {...register("psy.0")}
                    maxLength={2}
                  />
                  /
                  <PFInput
                    center
                    css={{ width: "2em" }}
                    defaultValue={item?.psy ? item?.psy[1] : 0}
                    {...register("psy.1")}
                    maxLength={2}
                  />
                </Flex>
              </Flex>

              <Flex direction="column" center>
                <Text color="yellow" size="small">
                  INF
                </Text>
                <Flex>
                  <PFInput
                    center
                    css={{ width: "2em" }}
                    defaultValue={item?.inf ? item?.inf[0] : 0}
                    {...register("inf.0")}
                    maxLength={2}
                  />
                  /
                  <PFInput
                    center
                    css={{ width: "2em" }}
                    defaultValue={item?.inf ? item?.inf[1] : 0}
                    {...register("inf.1")}
                    maxLength={2}
                  />
                </Flex>
              </Flex>

              <Flex direction="column" center>
                <Text color="yellow" size="small">
                  {langHud[sessionData.lang!!].hp}
                </Text>
                <Flex>
                  <PFInput
                    center
                    css={{ width: "2em" }}
                    defaultValue={item?.hp ? item?.hp[0] : 0}
                    {...register("hp.0")}
                    maxLength={2}
                  />
                  /
                  <PFInput
                    center
                    css={{ width: "2em" }}
                    defaultValue={item?.hp ? item?.hp[1] : 0}
                    {...register("hp.1")}
                    maxLength={2}
                  />
                </Flex>
              </Flex>

              <Flex direction="column" center>
                <Text color="yellow" size="small">
                  {langHud[sessionData.lang!!].armor}
                </Text>
                <Flex>
                  <PFInput
                    center
                    css={{ width: "2em" }}
                    defaultValue={item?.armor ?? 0}
                    {...register("armor")}
                    maxLength={2}
                  />
                </Flex>
              </Flex>

              <Flex direction="column">
                <Button
                  onClick={toggleDeprived}
                  size="small"
                  border={deprived ? "standard" : "underline"}
                  color={deprived ? "filled" : undefined}
                >
                  {langHud[sessionData.lang!!].deprived}
                </Button>
              </Flex>
            </Flex>

            <Flex css={{ gap: 40 }} direction="column">
              <InventoryForm
                getValues={getValues}
                setValue={setValue}
                inventory={inventory}
                register={register}
              />

              <CybermodForm
                getValues={getValues}
                setValue={setValue}
                cybermods={cybermods}
                register={register}
              />

              <CyberdeckForm
                getValues={getValues}
                setValue={setValue}
                cyberdeck={cyberdeck}
                register={register}
              />
            </Flex>
          </Flex>
        </form>
      </FormRoot>
      <Button
        css={{ position: "absolute", bottom: 20, right: 20 }}
        onClick={handleSubmit(onSubmit)}
      >
        {" "}
        {langHud[sessionData.lang!!].save}
      </Button>
      <Button
        css={{ position: "absolute", bottom: 120, right: 20, color: "red" }}
        onClick={deleteItem}
      >
        {langHud[sessionData.lang!!].delete}
      </Button>
    </Modal>
  );
};
