import { useI18n } from "@solid-primitives/i18n";
import { FaSolidMinus, FaSolidPlus } from "solid-icons/fa";
import { useAppData } from "~/common";
import { Flex, Button, Texte, Input, InputButton } from "~/component";

export const DiceRollButton = () => {
  let diceRef: HTMLInputElement;
  let numRef: HTMLInputElement;
  const [t] = useI18n();
  const apd = useAppData();

  const updateDice = () => {
    if (!numRef || !diceRef || !apd) return;
    apd.setSelectedDice(`${numRef.value}d${diceRef.value}`);
  };

  const inc = () => {
    if (!numRef || !diceRef) return;
    const num = Number.parseInt(numRef.value);
    if (Number.isNaN(num)) {
      numRef.value = "1";
      updateDice();
      return;
    }
    numRef.value = `${num + 1}`;
    updateDice();
  };

  const dec = () => {
    if (!numRef || !diceRef) return;
    const num = Number.parseInt(numRef.value);
    if (Number.isNaN(num)) {
      numRef.value = "1";
      updateDice();
      return;
    }
    if (num > 1) {
      numRef.value = `${num - 1}`;
      updateDice();
    }
  };

  const incDice = () => {
    if (!numRef || !diceRef) return;
    const num = Number.parseInt(diceRef.value);
    if (Number.isNaN(num)) {
      diceRef.value = "1";
      updateDice();
      return;
    }
    diceRef.value = `${num + 1}`;
    updateDice();
  };

  const decDice = () => {
    if (!numRef || !diceRef) return;
    const num = Number.parseInt(diceRef.value);
    if (Number.isNaN(num)) {
      diceRef.value = "1";
      updateDice();
      return;
    }
    if (num > 1) {
      diceRef.value = `${num - 1}`;
      updateDice();
    }
  };

  const setDice = (n: number) => {
    if (!diceRef) return;
    diceRef.value = `${n}`;
    updateDice();
  };

  return (
    <Flex type="column">
      <Flex center>
        <Flex>
          <Button
            size="small"
            border="underline"
            noupper
            onClick={() => setDice(4)}
          >
            {t("d4")}
          </Button>
          <Button
            size="small"
            border="underline"
            noupper
            onClick={() => setDice(6)}
          >
            {t("d6")}
          </Button>
          <Button
            size="small"
            border="underline"
            noupper
            onClick={() => setDice(8)}
          >
            {t("d8")}
          </Button>
          <Button
            size="small"
            border="underline"
            noupper
            onClick={() => setDice(10)}
          >
            {t("d10")}
          </Button>

          <Button
            size="small"
            border="underline"
            noupper
            onClick={() => setDice(12)}
          >
            {t("d12")}
          </Button>
          <Button
            size="small"
            border="underline"
            noupper
            onClick={() => setDice(20)}
          >
            {t("d20")}
          </Button>
          <Button
            size="small"
            border="underline"
            noupper
            onClick={() => setDice(100)}
          >
            {t("d100")}
          </Button>
        </Flex>
      </Flex>
      <Flex center>
        <Flex type="column" center>
          <FaSolidPlus onClick={inc} />
          <InputButton
            onChange={updateDice}
            title={t(`Scroll to inc/dec`)}
            type="number"
            ref={(el) => {
              numRef = el;
              numRef.value = "1";
            }}
            maxLength={2}
            min={1}
            style={{ "max-width": "2.5em" }}
          />
          <FaSolidMinus onClick={dec} />
        </Flex>
        <Texte color="yellow">{t("dice_letter")}</Texte>
        <Flex>
          <Flex type="column" center>
            <FaSolidPlus onClick={incDice} />
            <InputButton
              onChange={updateDice}
              title={t(`Scroll to inc/dec`)}
              type="number"
              ref={(el) => {
                diceRef = el;
                diceRef.value = "4";
              }}
              maxLength={3}
              min={1}
              style={{ "max-width": "3.5em" }}
            />
            <FaSolidMinus onClick={decDice} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
