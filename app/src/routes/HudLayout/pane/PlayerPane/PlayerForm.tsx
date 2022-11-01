import { useAtom, useAtomValue } from "jotai";
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
import { Button, Flex, Modal } from "~/component";
import { BasicForm } from "./BasicForm";
import { ModForm } from "./ModForm";
import { InventoryForm } from "./InventoryForm";
import { StatForm } from "./StatForm";
import { usePlayerForm } from "./usePlayerForm";

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

  const { itemState, setValue, psyWatch, triggerPsyWatch } =
    usePlayerForm(item);

  const { savePlayers } = useStorage();
  const { publish } = useNats();
  const nats = useAtomValue(stateNats);
  const sessionData = useAtomValue(stateSessionData);

  const onSubmit = () => {
    if (!item || !itemState) return;
    const newState = { ...players };
    newState[item.id] = itemState;
    setPlayers(newState);
    savePlayers(newState);
    setPf({ item: undefined, open: false });
    if (itemState.shared) {
      publish(nats.connection, topicChars, [itemState]);
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

  return (
    <Modal
      opacity="more"
      isOpen={pf.open}
      onClose={() => setPf({ open: false, item: undefined })}
    >
      <FormRoot>
        <Flex direction="column" css={{ width: "80vw", gap: 30 }} center>
          <BasicForm itemState={itemState} setValue={setValue} />
          <StatForm
            itemState={itemState}
            setValue={setValue}
            psyWatch={psyWatch}
          />

          <Flex css={{ gap: 40 }} direction="column">
            <InventoryForm itemState={itemState} setValue={setValue} />

            <ModForm
              itemState={itemState}
              setValue={setValue}
              itemType="cybermods"
              triggerPsyWatch={triggerPsyWatch}
            />

            <ModForm
              itemState={itemState}
              setValue={setValue}
              itemType="cyberdeck"
              triggerPsyWatch={triggerPsyWatch}
            />
          </Flex>
        </Flex>
      </FormRoot>
      <Button
        css={{ position: "absolute", bottom: 20, right: 20 }}
        onClick={onSubmit}
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
