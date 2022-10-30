export const globalStr: Record<string, Record<string, string>> = {
  pl: {
    generate: "Generuj",
    clear: "Wyczyść",
    export: "Eksport",
    nodeclass: "Klasa",
    "node class": "Klasa węzła",
    any: "Dowolny",
    d6: "k6",
    d8: "k8",
    d10: "k10",
    d12: "k12",
    volunteer: "wolontariusz",
    hacker: "haker",
    selfdefense: "samoobrona",
    hp: "ochr",
    ice: "lod",
    "main hud": "start",
    import: "import",
    traits: "Charakter",
    goal: "Cel",
    inshape: "obiekt w kształcie",
  },
  en: {
    generate: "Generate",
    clear: "Clear",
    export: "Export",
    nodeclass: "Class",
    "node class": "Node Class",
    any: "Any",
    d6: "d6",
    d8: "d8",
    d10: "d10",
    d12: "d12",
    volunteer: "volunteer",
    hacker: "hacker",
    selfdefense: "self-defense",
    hp: "hp",
    ice: "ice",
    "main hud": "main",
    import: "import",
    traits: "Traits",
    goal: "Goal",
    inshape: "",
  },
};

export const genTitles: Record<string, Record<string, string>> = {
  pl: {
    npc: "Bohater niezależny",
    corpo: "Zaibatsu",
    node: "Infowęzeł",
    place: "Miejsce",
    job: "Robota",
    operations: "Działalność",
    gossip: "Plotka",
  },
  en: {
    npc: "Non-player character",
    corpo: "Zaibatsu",
    node: "Infosphere node",
    place: "Place",
    job: "Job",
    operations: "Operations",
    gossip: "Gossip",
  },
};

export const langHud: Record<string, Record<string, string>> = {
  en: {
    add: "Add",
    armor: "Armor",
    board: "Board",
    clear_roll_history: "Clear roll history locally",
    comment: "Comment",
    config: "Config",
    connected_to: "Connected to",
    connection_link: "Connection link",
    connection: "Connection",
    content: "Content",
    credits: "Credits",
    cybermods: "Cybermods",
    cyberdeck: "Cyberdeck",
    delete: "Delete",
    deprived: "Deprived",
    established: "established",
    export: "Export",
    fatigue: "Fatigue",
    hosting: "Hosting",
    hp: "HP",
    identification: "Identification",
    input_comment: "Input comment for a roll",
    inventory: "Inventory",
    items: "Items",
    name: "Name",
    nats_desc: `If you have an access to some NATS server, you can share dice rolls and board notes with other users. Please select 'Host' or 'Client' mode below. In 'Host' mode, you need only a NATS server address, for 'Client' there should be also an ID of the hosting browser provided.`,
    nats_server: "NATS Server",
    nats_token: "NATS Auth Token (if needed)",
    notes: "Private Notes",
    player_layout: "Player Layout",
    players: "Players",
    public: "Public",
    remote_id: "Remote ID",
    restore_layout_desc: "Click to restore predefined layout",
    roll: "Roll",
    save: "Save",
    search: "Search",
    shared: "Shared",
    scroll_to_inc: "Scroll to inc/dec",
    storage_desc1: "Current storage use is:",
    storage_desc2:
      "Please remember that this app is using local browser storage instead of a database. The most popular limit for such a storage is about 5MB.",
    storage: "Storage",
    subscription: "Subscription",
    switch_client: "switch to Client",
    switch_host: "switch to Host",
    title: "Title",
    username_required: "Username is required",
    username: "Username",
    draw: "Draw",
    color: "Color",
  },
  pl: {
    add: "Dodaj",
    armor: "Pancerz",
    board: "Notatki",
    comment: "Komentarz",
    clear_roll_history: "Wyczyść lokalną historię rzutów",
    config: "Konfiguracja",
    connected_to: "Podłączony do",
    connection_link: "Odnośnik klienta",
    connection: "Połączenie",
    content: "Zawartość",
    credits: "Kredyty",
    cybermods: "Wszczepy",
    cyberdeck: "Cyberdek",
    delete: "Usuń",
    deprived: "Dyskomfort",
    established: "aktywne",
    export: "Eksport",
    fatigue: "Zmęczenie",
    hosting: "Gospodarz",
    hp: "OCHR",
    identification: "Identyfikator",
    input_comment: "Wprowadź komentarz do rzutu",
    items: "Ekwipunek",
    inventory: "Ekwipunek",
    name: "Imię",
    nats_desc: `Jeśli masz dostęp do jakiegoś serwera NATS, możesz współdzielić rzuty kośćmi i notatki z innymi użytkownikami. Proszę wybrać tryb 'Host' lub 'Client' poniżej. W trybie 'Host' potrzebny jest tylko adres serwera NATS, dla trybu 'Client' powinien być również podany ID przeglądarki gospodarza.`,
    nats_server: "Serwer NATS",
    nats_token: "Token NATS (jeśli wymagany)",
    notes: "Notatki prywatne",
    player_layout: "Układ gracza",
    players: "Postacie",
    private: "Prywatny",
    remote_id: "Zdalne ID",
    restore_layout_desc: "Wybierz predefiniowany układ",
    roll: "Rzut",
    save: "Zapisz",
    scroll_to_inc: "Przewiń aby zwiększyć/zmniejszyć",
    search: "Szukaj",
    shared: "Współdzielony",
    storage_desc1: "Aktualny rozmiar danych lokalnych:",
    storage_desc2:
      "Proszę pamiętać, że ta aplikacja używa lokalnego magazynu przeglądarki zamiast bazy danych. Najpopularniejszy limit dla takiego magazynu to około 5MB.",
    storage: "Dane",
    subscription: "Abonament",
    switch_client: "Tryb klienta",
    switch_host: "Tryb gospodarza",
    title: "Tytuł",
    username_required: "Nazwa użytkownika jest wymagana",
    username: "Nazwa użytkownika",
    draw: "Tablica",
    color: "Kolor",
  },
};
