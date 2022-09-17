export type NodeType = {
  name: string;
  ntype: string;
  hp: number;
  inf: number;
  security: string;
  ice: string;
  black: boolean;
  more: string;
  data: string;
  look: string;
};

export type NodeClass =
  | "Publiczny"
  | "Prywatny"
  | "Prywatny strzeżony"
  | "Rządowy"
  | "Korporacyjny"
  | "Wojskowy"
  | "SI";

export const NodeClassName = [
  "Publiczny",
  "Prywatny",
  "Prywatny strzeżony",
  "Rządowy",
  "Korporacyjny",
  "Wojskowy",
  "SI",
];

export const NodeClassHP = {
  Publiczny: "1d3",
  Prywatny: "1d6",
  "Prywatny strzeżony": "1d6+3",
  Rządowy: "1d6+6",
  Korporacyjny: "1d8+6",
  Wojskowy: "1d10+6",
  SI: "2d6+6",
};

export const NodeClassInf = {
  Publiczny: "1d6",
  Prywatny: "1d6+2",
  "Prywatny strzeżony": "1d8+3",
  Rządowy: "1d8+6",
  Korporacyjny: "1d10+6",
  Wojskowy: "1d12+6",
  SI: "2d6+8",
};

export const NodeClassMore = {
  Publiczny: "-",
  Prywatny: "-",
  "Prywatny strzeżony": "-",
  Rządowy: "alarmy informujące o ataku",
  Korporacyjny: "alarmy, śledzenie włamywacza",
  Wojskowy: "alarmy, śledzenie włamywacza",
  SI: "LOD czarny lub biały, wybór SI",
};

export const infoLook = [
  "Rubinowa, przezroczysta piramida obracająca się wokół własnej osi",
  "Cztery błękitne sześciany połączone ze sobą rogami",
  "Czarna kula połyskliwej cieczy z drobnymi wypustkami pojawiającymi się na powierzchni",
  "Kilkanaście okręgów z kolorowego światła obracających się wokół wspólnego środka",
  "Płaska, szara powierzchnia (jakby blat stołu)",
  "Wielki, ciemnoniebieski wir z plamkami czerwonego światła wewnątrz",
  "Długi, czarny budynek bez okien, z pojedynczym wejściem",
  "Ozdobna skrzynia z serialu o piratach",
  "Miniaturowy model układu słonecznego z węzłem w centrum",
  "Czerwona klatka zrobiona z laserowych prętów",
  "Pojedynczy sześcian płonący zielonym, neonowym światłem",
  "Wielki, obracający się neon z nazwą lub logo firmy",
  "Maska z kamienia przedstawiająca twarz właściciela lub osoby ważnej dla tego węzła",
  "Stalowe kule wirujące wokół wspólnego środka",
  "Kostka Rubika z błyszczącego metalu z obracającymi się ciągle segmentami",
  "Wielki, świetlisty ziggurat",
  "Bryła geometryczna ze świetlistymi symbolami matematycznymi wyświetlanymi na ścianach",
  "Długi ciąg szklanych tafli podświetlanych różnokolorowymi diodami",
  "Bezkształtna, brunatna chmura wypełniona błyskawicami",
  "Przezroczysty prostopadłościan wypełniony promieniami lasera",
  "Model kuli ziemskiej zrobiony z malutkich klocków",
  "Świetlisty trapezoid z symbolami matematycznymi w środku",
  "Kolumna światła niknąca w nieskończoności z czerwonymi sześcianami w środku",
  "Ludzka postać zrobiona z metalowych sześcianów",
  "Trójwymiarowa makieta budynku, z czarnego, matowego materiału",
  "Czerwona, płonąca kula, emitująca regularne błyski",
  "Figura geometryczna przypominająca origami",
  "Dziwaczna konstrukcja z metalowych rur",
  "Trójwymiarowe logo firmy lub właściciela",
  "Kolorowa chmura tekstu (slogany reklamowe)",
  "Wir powietrzny wypełniony kryształkami lodu",
  "Zielona, noeonowa wstęga Moebiusa",
  "Prostokątny ekran, na którym bez przerwy rysowane są fraktale",
  "Heksagonalna siatka z metalicznymi pająkami ",
  "Błękitna kula, na jej powierzchni losowo zapalają się zielone punkty",
  "Okrągła brama międzywymiarowa, przypominająca Gwiezdne Wrota",
  "Trójwymiarowy model podwójnej helisy z logo firmy/właściciela w środku",
  "Biały sześcian bez żadnych dodatkowych oznaczeń",
  "Szachownica z bryłami geometrycznymi zamiast figur",
  "Konstrukcja mechaniczna pełna kół zębatych, przekładni i dźwigni",
  "Przezroczysta sfera wypełniona mistycznymi symbolami",
  "Starannie pielęgnowany japoński ogród",
  "Szary kamienny menhir pokryty świetlistymi runami",
  "Pudełko z origami z klejnotem w środku",
  "Symbol nieskończoności zrobiony z milionów metalowych kulek",
  "Wielka księga z tajemniczym symbolem na skórzanej okładce",
  "Złoty trójkąt z okiem w środku",
  "Wielkie, płonące oko z wąską czarną źrenicą",
  "Wielokolorowy, hipnotyczny wir",
  "Okno wyświetlające dziwaczne obrazy",
];

export const NodeData: Record<NodeClass, string[]> = {
  Publiczny: [
    "Zestaw starych gier komputerowych",
    "Wielka księga przepisów kulinarnych",
    "Plany budynku użyteczności publicznej",
    "Odpowiedzi na pytania w najbliższym quizie multimedialnym",
    "Cheaty do popularnej gry online",
    "Receptura na domowy wyrób stymulantów",
    "Tomik wierszy wątpliwej jakości",
    "Bardzo ciekawe projekty modnych ubrań",
    "Lista zwycięzców konkursu piękności, który się jeszcze nie odbył",
    " Największa na świecie kolekcja muzyki",
    " Nieznane, zaszyfrowane dane",
    " Zapis z kamer bezpieczeństwa budynku publicznego",
    " Grafik zajęć znanej gwiazdy medialnej",
    " Nagranie brutalnej interwencji policji",
    " Nagranie protestów aktywistów pod bramą fabryki",
    " Nagranie z manifestem grupy terrorystycznej",
    " Oficjalne oświadczenie grupy hakerskiej",
    " Pełne dane medyczne dotyczące leku na znaną chorobę",
    " Plany techniczne drona policyjnego",
    " Lista skorumpowanych policjantów  ",
  ],
  Prywatny: [
    "Dane medyczne ukradzione ze szpitala Administracji",
    "Plany techniczne nieznanego cybermodu",
    "Kolekcja filmów ... różnego rodzaju",
    "Zestaw artykułów o tajemniczych eksperymentach genetycznych",
    "1k4 wejściowek na znane wydarzenie sportowe",
    "Zestaw wirusów komputerowych",
    "Rękopis niewydanej powieści (może być dobra)",
  ],
  "Prywatny strzeżony": [
    "Komplet fałszywych dokumentów",
    "1k4 fałszywych sygnatur dla pojazdów dowolnego typu",
    "Dane konta bankowego z 1k4 tys. kredytów",
    "1k4 biletów na najbliższy koncert w operze",
    "1k6 programów hakerskich różnego rodzaju",
    "Kody do hakowania linii energetycznych w wybranej dzielnicy",
    "Kody wejściowe do mieszkań w zwykłym wieżowcu",
    "Adresy rodzin szefów znanych gangów",
    "Dwa karnety do ekskluzywnej restauracji",
    "Pamiętnik szefa mafii",
  ],
  Rządowy: [
    "Kody otwierające wszystkie drzwi wybranego urzędu Administracji",
    "Zapis z kamer bezpieczeństwa z nagraną zbrodnią",
    "Spis osób podejrzanych o szpiegostwo",
  ],
  Korporacyjny: [
    "Najnowsze, jeszcze nie emitowane odcinki popularnego serialu",
    "Kompromitujące nagrania ważnego pracownika korporacji",
    "Dokładne plany jednej z korporacyjnych arkologii",
    "Dane osobowe całego działu korporacyjnego",
    "Wykaz kont bankowych znanego pracownika korporacji",
    "Roczny bilans finansowy",
    "Dane pracowników podejrzewanych o szpiegostwo",
    "Teczki osobowe pracowników konkurencyjnej korporacji",
    "Zestaw przepustek wejściowych do arkologii",
    "Kompromitujące dane polityków",
    "Dane techniczne najnowszego produktu",
    "Informacje o finansowaniu grup terrorystycznych",
    "Lista policjantów na usługach korporacji",
    "Lista urzędników Administracji na usługach korporacji",
    "Plany przejęcia kontroli nad gangami w danej dzielnicy",
    "Kontakty do osób/firm wynajmowanych do 'mokrej roboty'",
    "Dokumentacja nielegalnych eksperymentów genetycznych",
    "Hasła do magazynu pełnego produktów korporacji",
    "Zlecenia transportu nieznanych materiałów do placówki badawczej",
    "Plany korporacyjnej placówki badawczej",
  ],
  Wojskowy: [
    "Plany techniczne drona bojowego",
    "Kody wejściowe do bazy wojskowej",
    "Zdalne kody sterujące do myśliwca wojskowego",
    "Program deszyfrujący transmisje w sieci taktycznej",
    "Plany techniczne robota wojskowego",
    "Kody wejściowe do magazynu broni",
    "Przepustka do magazynu wojskowych cybermodów",
    "Dane adresowe ważnych dowódców wojskowych",
    "Dokumentacja produkcyjna wojskowych stymulantów",
    "Kody sterujące satelity wojskowego",
    "Zdjęcia z satelity pokazujące nielegalne placówki badawcze",
    "Lista szpiegów konkurencji w wybranej korporacji",
    "Rozkazy eksterminacji ludności w przypadku zagrożenia nieznaną chorobą",
    "Dokumentacja zabójczego wirusa hodowanego w laboratorium",
    "Plany rozmieszczenia głowic nuklearnych",
    "Zapisy rozmów ze spotkań zarządu wybranej korporacji",
    "Lista korporacyjnych SI postrzeganych jako zagrożenie",
    "Plany techniczne superlekkiego działka EMP",
    "Plany techniczne cyberkończyny z emiterem EMP",
    "Lista szpiegów wojskowych w korporacjach",
  ],
  SI: [
    " Konstrukt (zapis osobowości) zmarłego celebryty",
    "Dane techniczne węzła Agencji Energii Atomowej",
    "Kody źródłowe innej SI",
    "Kody wejściowe do wszystkich systemów policyjnych",
    "Zestaw 1k6 potężnych wirusów komputerowych",
  ],
};
