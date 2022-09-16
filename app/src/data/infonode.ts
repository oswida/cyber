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
  selected: boolean;
};

export const infoType = [
  "Publiczny",
  "Prywatny",
  "Prywatny strzeżony",
  "Rządowy",
  "Korporacyjny",
  "Wojskowy",
  "SI",
];

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
];

export const infoData = [
  "Najnowsze, jeszcze nie emitowane odcinki popularnego serialu",
  "Kompromitujące nagrania ważnego pracownika korporacji",
  "Zestaw starych gier komputerowych",
  "Dane medyczne ukradzione ze szpitala Administracji",
  "Dokładne plany jednej z korporacyjnych arkologii",
  "Dane osobowe całego działu korporacyjnego",
  "Wielka księga przepisów kulinarnych",
  "Plany techniczne nieznanego cybermodu",
  "Plany techniczne drona bojowego",
  "Kody otwierające wszystkie drzwi wybranego urzędu Administracji",
  "Lista skorumpowanych policjantów",
  "Odpowiedzi na pytania w najbliższym quizie multimedialnym",
  "Lista zwycięzców konkursu piękności, który się jeszcze nie odbył",
  "Tomik wierszy wątpliwej jakości",
  "Cheaty do popularnej gry online",
  "Receptura na domowy wyrób narkotyków",
  "Komplet fałszywych dokumentów",
  "Największa na świecie kolekcja muzyki",
  "Zestaw artykułów o tajemniczych eksperymentach genetycznych",
  "Kolekcja filmów ... różnego rodzaju",
  "Kody wejściowe do mieszkań w budżetowym wieżowcu",
  "Bardzo ciekawe projekty modnych ubrań",
  "Zestaw wirusów komputerowych",
  "1k6 programów hakerskich różnego rodzaju",
  "Adresy rodzin szefów znanych gangów",
  "1k4 fałszywych sygnatur dla pojazdów dowolnego typu",
  "Wykaz kont bankowych znanego pracownika korporacji",
  "Dane konta bankowego z 1k4 tys. kredytów",
  "1k4 biletów na najbliższy koncert w operze",
  "1k4 wejściowek na znane wydarzenie sportowe",
  "Dwa karnety do ekskluzywnej restauracji",
  "Pamiętnik szefa mafii",
  "Nieznane, zaszyfrowane dane",
  "Kody do hakowania linii energetycznych w wybranej dzielnicy",
  "Bilans finansowy jednej z korporacji",
  "Rękopis niewydanej powieści (może być dobra)",
  "Zapis z kamer bezpieczeństwa z nagraną zbrodnią",
  "Kody wejściowe do bazy wojskowej",
  "Grafik zajęć znanej gwiazdy medialnej",
  "Konstrukt (zapis osobowości) zmarłego celebryty",
];
