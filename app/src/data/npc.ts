const npcNameTable = [
  "Maria",
  "Nushi",
  "Mohammed",
  "Jose",
  "Wei",
  "Ahmed",
  "Yan",
  "Ali",
  "John",
  "David",
  "Li",
  "Abdul",
  "Ana",
  "Ying",
  "Michael",
  "Juan",
  "Anna",
  "Mary",
  "Jean",
  "Robert",
  "Daniel",
  "Luis",
  "Carlos",
  "James",
  "Antonio",
  "Joseph",
  "Hui",
  "Elena",
  "Francisco",
  "Hong",
  "Marie",
  "Min",
  "Lei",
  "Yu",
  "Ibrahim",
  "Peter",
  "Fatima",
  "Aleksandr",
  "Richard",
  "Xin",
  "Bin",
  "Paul",
  "Ping",
  "Lin",
  "Olga",
  "Sri",
  "Pedro",
  "William",
  "Rosa",
  "Thomas",
  "Jorge",
  "Yong",
  "Elizabeth",
  "Sergey",
  "Ram",
  "Patricia",
  "Hassan",
  "Anita",
  "Manuel",
  "Victor",
  "Sandra",
  "Ming",
  "Siti",
  "Miguel",
  "Emmanuel",
  "Samuel",
  "Ling",
  "Charles",
  "Sarah",
  "Mario",
  "Joao",
  "Tatyana",
  "Mark",
  "Rita",
  "Martin",
  "Svetlana",
  "Patrick",
  "Natalya",
  "Qing",
  "Ahmad",
  "Martha",
  "Andrey",
  "Sunita",
  "Andrea",
  "Christine",
  "Irina",
  "Laura",
  "Linda",
  "Marina",
  "Carmen",
  "Ghulam",
  "Vladimir",
  "Barbara",
  "Angela",
  "George",
  "Roberto",
  "Peng",
  "Ivan",
  "Alexander",
  "Susan",
];
const npcSurnameTable = [
  "Adams",
  "Allen",
  "Anderson",
  "Bailey",
  "Baker",
  "Barnes",
  "Bell",
  "Bennett",
  "Brooks",
  "Brown",
  "Butler",
  "Campbell",
  "Carter",
  "Clark",
  "Coleman",
  "Collins",
  "Cook",
  "Cooper",
  "Cox",
  "Cruz",
  "Davis",
  "Diaz",
  "Edwards",
  "Evans",
  "Fisher",
  "Flores",
  "Foster",
  "Garcia",
  "Gomez",
  "Gonzalez",
  "Gray",
  "Green",
  "Hall",
  "Harris",
  "Henderson",
  "Hernandez",
  "Hill",
  "Howard",
  "Hughes",
  "Jackson",
  "James",
  "Jenkins",
  "Johnson",
  "Jones",
  "Kelly",
  "Kim",
  "King",
  "Lee",
  "Lewis",
  "Long",
  "Lopez",
  "Martin",
  "Martinez",
  "Miller",
  "Mitchell",
  "Moore",
  "Morgan",
  "Morris",
  "Murphy",
  "Myers",
  "Nelson",
  "Nguyen",
  "Parker",
  "Perez",
  "Perry",
  "Peterson",
  "Phillips",
  "Powell",
  "Price",
  "Ramirez",
  "Reed",
  "Reyes",
  "Richardson",
  "Rivera",
  "Roberts",
  "Robinson",
  "Rodriguez",
  "Rogers",
  "Ross",
  "Russell",
  "Sanchez",
  "Sanders",
  "Scott",
  "Smith",
  "Stewart",
  "Sullivan",
  "Taylor",
  "Thomas",
  "Thompson",
  "Torres",
  "Turner",
  "Walker",
  "Ward",
  "Watson",
  "White",
  "Williams",
  "Wilson",
  "Wood",
  "Wright",
  "Young",
];

const npcOccupation = [
  "Aktywista",
  "Akwizytor",
  "Analityk danych",
  "Ankieter",
  "Asystent osobisty",
  "Barman",
  "Bimbrownik",
  "Chemik",
  "Cybertechnik",
  "Detektyw",
  "Ekoterrorysta",
  "Elektryk",
  "Fryzjerka",
  "Gejsza",
  "Grafik",
  "Gospodarz reality show",
  "Gwiazda reality show",
  "Haker",
  "Handlarz bronią",
  "Handlarz narkotykami",
  "Handlarz oprogramowaniem",
  "Hodowca zwierząt domowych",
  "Hostessa",
  "Influencer",
  "Instruktor fitness",
  "Instruktor sztuki walki",
  "Inżynier genetyk",
  "Inżynier elektronik",
  "Inżynier nanotechnologii",
  "Kierowca ciężarówki transportowej",
  "Kierowca komunikacji publicznej",
  "Kierowca wyścigowy",
  "Klubowy DJ",
  "Kontroler ruchu powietrznego",
  "Korporacyjny szpieg",
  "Kosmetyczka",
  "Kucharz",
  "Kurier",
  "Laborant",
  "Lekarz",
  "Łowca talentów",
  "Magazynier",
  "Makler giełdowy",
  "Masażystka",
  "Mechanik",
  "Muzyk",
  "Najemnik",
  "Nauczyciel",
  "Naukowiec",
  "Negocjator",
  "Ochroniarz",
  "Ogrodnik",
  "Operator dronów",
  "Operator maszyn ciężkich",
  "Opiekunka do dzieci",
  "Paser",
  "Pielęgniarka",
  "Pilot cywilny",
  "Pilot wojskowy",
  "Piosenkarz",
  "Pisarz",
  "Policjant",
  "Pomocnik do wynajęcia",
  "Portier",
  "Pracownik pogotowia energetycznego",
  "Programista gier",
  "Programista zabezpieczeń",
  "Programista SI",
  "Prostytutka",
  "Przemytnik",
  "Przywódca sekty",
  "Reporter kanału informacyjnego",
  "Robotnik fabryczny",
  "Rusznikarz",
  "Sanitariusz",
  "Sekretarka",
  "Specjalista ds Public Relations",
  "Sportowiec",
  "Sprzątacz",
  "Sprzedawca sklepowy",
  "Stróż nocny",
  "Stylistka",
  "Szef gangu",
  "Taksówkarz",
  "Tatuażysta",
  "Technik robotyk",
  "Technik telekomunikacyjny",
  "Technik budowlany",
  "Tester oprogramowania",
  "Trener e-sportu",
  "Uliczny iluzjonista",
  "Uliczny kaznodzieja",
  "Urzędnik Administracji",
  "Właściciel klubu",
  "Zabójca",
  "Zawodnik e-sportu",
  "Zawodnik sportów walki",
  "Złodziej",
  "Złomiarz",
  "Żołnierz",
];

const npcTrait = [
  "Agresja",
  "Altruizm",
  "Ambicja",
  "Arogancja",
  "Bezczelność",
  "Bezinteresowność",
  "Bezmyślność",
  "Brutalność",
  "Chamstwo",
  "Chciwość",
  "Chytrość",
  "Ciekawość",
  "Cierpliwość",
  "Cynizm",
  "Despotyzm",
  "Dobroduszność",
  "Dobroć",
  "Dokładność",
  "Duma",
  "Dzikość",
  "Egoizm",
  "Empatia",
  "Fanatyzm",
  "Gadatliwość",
  "Geniusz",
  "Gościnność",
  "Gruboskórność",
  "Grzeczność",
  "Głupota",
  "Hipochondria",
  "Hipokryzja",
  "Inteligencja",
  "Impulsywność",
  "Kokieteria",
  "Lekkomyślność",
  "Lenistwo",
  "Lizus",
  "Lojalność",
  "Lubieżność",
  "Komunikatywność",
  "Kłótliwość",
  "Małomówność",
  "Naiwność",
  "Niecierpliwość",
  "Nieczułość",
  "Niefrasobliwość",
  "Niegodziwy",
  "Nieuczciwość",
  "Niewinność",
  "Nikczemność",
  "Obłuda",
  "Odpowiedzialność",
  "Odwaga",
  "Okrucieństwo",
  "Optymizm",
  "Ostrożność",
  "Oszczędność",
  "Patriotyzm",
  "Perfekcjonizm",
  "Perfidia",
  "Pesymizm",
  "Pobożność",
  "Podejrzliwość",
  "Powaga",
  "Pruderia",
  "Przezorność",
  "Próżność",
  "Pycha",
  "Rozsądek",
  "Roztropność",
  "Samochwalstwo",
  "Sceptycyzm",
  "Skromność",
  "Skąpstwo",
  "Sprawiedliwość",
  "Spryt",
  "Szczerość",
  "Szlachetność",
  "Takt",
  "Talent",
  "Tchórzostwo",
  "Troskliwość",
  "Tupet",
  "Uczciwość",
  "Uprzejmość",
  "Upór",
  "Wdzięk",
  "Wielkoduszność",
  "Wrażliwość",
  "Wspaniałomyślność",
  "Wulgarność",
  "Wyobraźnia",
  "Wyrozumiałość",
  "Zaciekłość",
  "Złośliwość",
  "Zrzędliwość",
  "Łagodność",
  "Łatwowierność",
  "Śmiałość",
  "Życzliwość",
];

const npcGoal = [
  "Nauczyć się nowej umiejętności związanej z zawodem",
  "Odłożyć pieniądze na operację kogoś bliskiego",
  "Uratować przyjaciela z rąk porywaczy",
  "Odnaleźć zaginione dziecko",
  "Wykonać jeszcze jedną robotę przed odejściem na emeryturę",
  "Zdobyć cokolwiek co pomoże zrujnować korporację",
  "Żyć spokojnie i w miarę dostatnio",
  "Zapewnić swoim dzieciom lepszy start",
  "Wykraść dane z laboratorium korporacji",
  "Uciec przed gangiem ulicznym",
  "Pozbyć się niewygodnych wspomnień",
  "Wymazać swoją tożsamość z systemu",
  "Dorwać tego, kto wymordował moją rodzinę",
  "Zamknąć w końcu tę sprawę nieukończoną od wielu lat",
  "Odszyfrować ważne dane osobiste",
  "Zerwać niewygodny kontrakt",
  "Znaleźć tego, kto mnie wydał i dowiedzieć się dlaczego",
  "Dowiedzieć się co planuje korporacja X",
  "Zdobyć władzę tak, żeby wszyscy się mnie bali",
  "Znaleźć porządną, legalną pracę",
  "Spłacić stary dług",
  "Pozbyć się głosów ze swojej głowy",
  "Przestać się w końcu bać",
  "Kupić bliskiej osobie nietuzinkowy prezent",
  "Zdobyć popularność w mediach",
  "Wykonać robotę, za którą mi zapłacono",
  "Znaleźć sprawę, za którą warto walczyć",
  "Zdobyć przyjaciół wśród bogaczy",
  "Udowodnić wszystkim, że jestem kimś",
  "Dostać się do popularnej grupy w Infosferze",
  "Zwyciężyć w walce ze śmiertelną chorobą",
  "Przeżyć za wszelką cenę",
  "Żyć zgodnie ze swoimi przekonaniami",
  "Głosić Słowo Boże",
  "Wyrównać porachunki z sąsiadami",
  "Zdobyć sławę dzięki szaleńczym wybrykom",
  "Przypomnieć sobie kim byłem zanim mnie porwano",
  "Wyzwolić się od technologii",
  "Zdobyć pieniądze na chirurgię plastyczną",
  "Znaleźć prawdziwą miłość",
  "Wyleczyć alergię na cybermodyfikacje",
  "Zmienić zawód",
  "Dowiedzieć się co oznaczają te dziwne symbole w moich plikach personalnych",
  "Wziąć udział w słynnym wyścigu",
  "Spotkać osobiście gwiazdę medialną",
  "Wygrać chociaż raz w ulubionej grze komputerowej online",
  "Pogodzić się z bliską osobą",
  "Rzucić to wszystko i wyjechać gdzieś",
  "Pomóc bezdomnemu na mojej ulicy",
  "Zdobyć pracę w korporacji",
];

const npcView = [
  "Skołtuniona, wielkolorowa fryzura z wplecionymi nitkami światłowodów",
  "Wielki, podświetlany symbol religijny zawieszony na grubym łańcuchu",
];

export {
  npcSurnameTable,
  npcNameTable,
  npcOccupation,
  npcTrait,
  npcGoal,
  npcView,
};
