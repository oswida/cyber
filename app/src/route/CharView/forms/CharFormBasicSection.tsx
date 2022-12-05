import { useI18n } from "@solid-primitives/i18n";
import { createEffect } from "solid-js";
import { PcInfoKeys, useEditCharacter } from "~/common";
import { Flex, Input, TextArea, Texte } from "~/component";

export const CharFormBasicSection = () => {
  const [t] = useI18n();
  const editor = useEditCharacter();
  var nameRef: HTMLInputElement;
  var creditRef: HTMLInputElement;
  var subRef: HTMLInputElement;
  var bkgRef: HTMLInputElement;
  var notesRef: HTMLDivElement;

  createEffect(() => {
    if (!nameRef || !creditRef || !subRef || !bkgRef || !editor) return;
    const ec = editor.editCharacter();
    nameRef.value = ec.name;
    creditRef.value = ec.credits.toString();
    subRef.value = ec.subscription;
    bkgRef.value = ec.background;
    notesRef.innerText = ec.notes ? ec.notes : "";
  });

  const change = (key: PcInfoKeys) => {
    if (!nameRef || !creditRef || !subRef || !bkgRef) return;
    switch (key) {
      case "name":
        editor?.setEditCharacter((prev) => ({ ...prev, name: nameRef.value }));
        break;
      case "credits":
        {
          const num = Number.parseInt(creditRef.value);
          editor?.setEditCharacter((prev) => ({ ...prev, credits: num }));
        }
        break;
      case "subscription":
        editor?.setEditCharacter((prev) => ({
          ...prev,
          subscription: subRef.value,
        }));
        break;
      case "background":
        editor?.setEditCharacter((prev) => ({
          ...prev,
          background: bkgRef.value,
        }));
        break;
      case "notes":
        editor?.setEditCharacter((prev) => ({
          ...prev,
          notes: notesRef.innerText,
        }));
        break;
    }
  };

  return (
    <Flex
      style={{
        width: "90%",
        gap: "10px",
        "align-self": "center",
        "justify-content": "space-evenly",
        "flex-wrap": "wrap",
      }}
    >
      <Flex>
        <Flex type="column">
          <Texte size="middle" color="yellow">
            {t("Name")}
          </Texte>
          <Input
            ref={(el) => (nameRef = el)}
            style={{ width: "18em" }}
            onBlur={() => change("name")}
          />
        </Flex>
      </Flex>
      <Flex type="column">
        <Texte size="middle" color="yellow">
          {t("Background")}
        </Texte>
        <Input
          ref={(el) => (bkgRef = el)}
          style={{ width: "18em" }}
          onBlur={() => change("background")}
        />
      </Flex>
      <Flex type="column">
        <Texte size="middle" color="yellow">
          {t("Subscription")}
        </Texte>
        <Input
          ref={(el) => (subRef = el)}
          style={{ width: "12em" }}
          onBlur={() => change("subscription")}
        />
      </Flex>
      <Flex type="column">
        <Texte size="middle" color="yellow">
          {t("Credits")}
        </Texte>
        <Input
          ref={(el) => (creditRef = el)}
          style={{ width: "9em" }}
          onBlur={() => change("credits")}
        />
      </Flex>
      <Flex type="column">
        <Texte size="middle" color="yellow">
          {t("Notes")}
        </Texte>
        <TextArea
          contentEditable={true}
          ref={(el) => (notesRef = el)}
          style={{ "min-width": "350px", height: "130px", overflow: "auto" }}
          onBlur={() => change("notes")}
        />
      </Flex>
    </Flex>
  );
};
