export type NpcType = {
  name: string;
  surname: string;
  traits: string[];
  occupation: string;
  goal: string;
  look: string;
  gear: string;
};

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

const npcOccupation: Record<string, string[]> = {
  pl: [
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
  ],
  en: [
    "Activist",
    "Acquirer",
    "Data analyst",
    "Interviewer",
    "Personal assistant",
    "Bartender",
    "Moonshiner",
    "Chemist",
    "Cybertechnician",
    "Detective",
    "Ecoterrorist",
    "Electrician",
    "Hairdresser",
    "Geisha",
    "Graphic designer",
    "Reality show host",
    "Reality show star",
    "Hacker",
    "Arms dealer",
    "Drug dealer",
    "Software dealer",
    "Pet breeder",
    "Hostess",
    "Influencer",
    "Fitness instructor",
    "Martial arts instructor",
    "Genetic engineer",
    "Electronics engineer",
    "Nanotechnology engineer",
    "Transport truck driver",
    "Public transport driver",
    "Racing driver",
    "Club DJ",
    "Air traffic controller",
    "Corporate spy",
    "Beautician",
    "Cook",
    "Courier",
    "Lab technician",
    "Doctor",
    "Talent Hunter",
    "Warehouseman",
    "Stockbroker",
    "Masseuse",
    "Mechanic",
    "Musician",
    "Mercenary",
    "Teacher",
    "Scientist",
    "Negotiator",
    "Bodyguard",
    "Gardener",
    "Drone operator",
    "Heavy machinery operator",
    "Babysitter",
    "Stolen goods receiver",
    "Nurse",
    "Civilian pilot",
    "Military pilot",
    "Singer",
    "Writer",
    "Policeman",
    "Helper for hire",
    "Porter",
    "Energy emergency worker",
    "Games programmer",
    "Security programmer",
    "AI programmer",
    "Prostitute",
    "Smuggler",
    "Sect leader",
    "News channel reporter",
    "Factory worker",
    "Gunsmith",
    "Sanitarian",
    "Secretary",
    "Public relations specialist",
    "Sportsman",
    "Cleaner",
    "Shop assistant",
    "Night watchman",
    "Stylist",
    "Gang boss",
    "Taxi driver",
    "Tattoo artist",
    "Robotics technician",
    "Telecommunications technician",
    "Construction technician",
    "Software tester",
    "E-sports trainer",
    "Street illusionist",
    "Street preacher",
    "Administration Clerk",
    "Club owner",
    "Assassin",
    "E-sports player",
    "Combat sports player",
    "Thief",
    "Scrapper",
    "Soldier",
  ],
};

const npcPositiveTrait: Record<string, string[]> = {
  pl: [
    "Aktywny",
    "Ambitny",
    "Bezinteresowny",
    "Bystry",
    "Charyzmatyczny",
    "Ciekawy",
    "Cierpliwy",
    "Czarujący",
    "Czujny",
    "Czysty",
    "Delikatny",
    "Dobroczynny",
    "Dobroduszny",
    "Dobrotliwy",
    "Dobry sędzia charakteru",
    "Dobry słuchacz",
    "Dowcipny",
    "Dynamiczny",
    "Dyskretny",
    "Elastyczny",
    "Elegancki",
    "Elokwentny",
    "Empatyczny",
    "Entuzjastyczny",
    "Galant",
    "Godny zaufania",
    "Hojny",
    "Honorowy",
    "Humorystyczny",
    "Innowacyjny",
    "Inteligentny",
    "Interesujący",
    "Intuicyjny",
    "Kontemplacyjny",
    "Krytycznie myślący",
    "Kulturalny",
    "Logiczny",
    "Lojalny",
    "Moralny",
    "Nieprzekupny",
    "Niezależny",
    "Niezawodny",
    "Obowiązkowy",
    "Odpowiedzialny",
    "Odważny",
    "Opiekuńczy",
    "Pewny siebie",
    "Pogodny",
    "Pokorny",
    "Pracowity",
    "Praktyczny",
    "Przewidujący",
    "Przystosowany",
    "Przywódczy",
    "Przyzwoity",
    "Punktualny",
    "Racjonalny",
    "Refleksyjny",
    "Rzetelny",
    "Samodzielny",
    "Samokrytyczny",
    "Samowystarczalny",
    "Schludny",
    "Serdeczny",
    "Silny",
    "Skoncentrowany",
    "Skromny",
    "Skuteczny",
    "Słodki",
    "Słowny",
    "Spokojny",
    "Spostrzegawczy",
    "Sprawny",
    "Sprytny",
    "Sympatyczny",
    "Szanujący",
    "Szczery",
    "Szczodry",
    "Troskliwy",
    "Uczciwy",
    "Uporządkowany",
    "Uprzejmy",
    "Uważny",
    "Wesoły",
    "Wierny",
    "Wnikliwy",
    "Wrażliwy",
    "Współczujący",
    "Współpracujący",
    "Wykształcony",
    "Wyrozumiały",
    "Zasadniczy",
    "Zdecydowany",
    "Zdolny",
    "Zdyscyplinowany",
    "Zorganizowany",
    "Zrelaksowany",
    "Zręczny",
    "Zrównoważony",
    "Żądny przygód",
  ],
  en: [
    "Active",
    "Ambitious",
    "Selfless",
    "Smart",
    "Charismatic",
    "Curious",
    "Patient",
    "Charming",
    "Alert",
    "Pure",
    "Gentle",
    "Benevolent",
    "Good-natured",
    "Benevolent",
    "Good judge of character",
    "Good listener",
    "Witty",
    "Dynamic",
    "Discreet",
    "Flexible",
    "Elegant",
    "Eloquent",
    "Empathetic",
    "Enthusiastic",
    "Gallant",
    "Trustworthy",
    "Generous",
    "Honourable",
    "Humorous",
    "Innovative",
    "Intelligent",
    "Interesting",
    "Intuitive",
    "Contemplative",
    "Critically thinking",
    "Cultural",
    "Logical",
    "Loyal",
    "Moral",
    "Incorruptible",
    "Independent",
    "Reliable",
    "Dutiful",
    "Responsible",
    "Courageous",
    "Caring",
    "Confident",
    "Cheerful",
    "Humble",
    "Hardworking",
    "Practical",
    "Anticipatory",
    "Adaptable",
    "Leadership",
    "Decent",
    "Punctual",
    "Rational",
    "Reflective",
    "Reliable",
    "Independent",
    "Self-critical",
    "Self-sufficient",
    "Neat",
    "Cordial",
    "Strong",
    "Focused",
    "Modest",
    "Efficient",
    "Sweet",
    "Verbal",
    "Calm",
    "Perceptive",
    "Efficient",
    "Clever",
    "Sympathetic",
    "Respectful",
    "Honest",
    "Generous",
    "Caring",
    "Honest",
    "Orderly",
    "Kind",
    "Attentive",
    "Cheerful",
    "Faithful",
    "Insightful",
    "Sensitive",
    "Compassionate",
    "Collaborative",
    "Educated",
    "Understanding",
    "Principled",
    "Determined",
    "Capable",
    "Disciplined",
    "Organised",
    "Relaxed",
    "Skillful",
    "Balanced",
    "Adventurous",
  ],
};
const npcNegativeTrait: Record<string, string[]> = {
  pl: [
    "Aspołeczny",
    "Autorytarny",
    "Bez poczucia humoru",
    "Bez wdzięku",
    "Bezczelny",
    "Bezduszny",
    "Bezlitosny",
    "Bezmyślny",
    "Bezwolny",
    "Bigot",
    "Brudny",
    "Brutalny",
    "Buntownicza",
    "Chaotyczny",
    "Chytry",
    "Destrukcyjny",
    "Dziecinny",
    "Egoistyczny",
    "Fałszywy",
    "Fanatyczny",
    "Flirciarz",
    "Głupi",
    "Hipokryta",
    "Idiotyczny",
    "Ignorant",
    "Kłamca",
    "Łatwowierny",
    "Masochista",
    "Nadgorliwy",
    "Nadmiernie emocjonalny",
    "Nerwowy",
    "Niechlujny",
    "Niecierpliwy",
    "Nieczuły",
    "Niedojrzały",
    "Niegodny zaufania",
    "Niegrzeczny",
    "Nielojalny",
    "Nieracjonalny",
    "Nieśmiały",
    "Nietolerancyjny",
    "Nieuczciwy",
    "Nieuporządkowany",
    "Nieuważny",
    "Niewłaściwy",
    "Niezdyscyplinowany",
    "Nijaki",
    "Obibok",
    "Obłąkany",
    "Obojętny",
    "Obraźliwy",
    "Obsesyjny",
    "Oszust",
    "Pechowiec",
    "Pedantyczny",
    "Pesymista",
    "Podstępny",
    "Pompatyczny",
    "Żądny chwały",
    "Pracoholik",
    "Pretensjonalny",
    "Primadonna",
    "Prowokujący",
    "Próżny",
    "Przekupny",
    "Przewidywalny",
    "Psychopatyczny",
    "Rozpieszczony",
    "Sadysta",
    "Samolubny",
    "Sarkastyczny",
    "Sknerus",
    "Słaby",
    "Surowy",
    "Syndrom bohatera",
    "Szorstki",
    "Sztuczny",
    "Śliski",
    "Tchórz",
    "Tępy",
    "Uciążliwy",
    "Uparty",
    "Urażony",
    "Wąskie horyzonty",
    "Wrogi",
    "Wścibski",
    "Wybredny",
    "Wymagający",
    "Zamknięty w sobie",
    "Zapominalski",
    "Zarozumiały",
    "Zazdrosny",
    "Zboczony",
    "Zdezorganizowany",
    "Złośliwy",
    "Zły słuchacz",
    "Zuchwały",
    "Żarłoczny",
    "Żartowniś",
  ],
  en: [
    "Asocial",
    "Authoritarian",
    "Humourless",
    "Graceless",
    "Insolent",
    "Heartless",
    "Merciless",
    "Mindless",
    "Involuntary",
    "Bigot",
    "Dirty",
    "Brutal",
    "Rebellious",
    "Chaotic",
    "Sly",
    "Destructive",
    "Childish",
    "Egotistical",
    "False",
    "Fanatical",
    "Flirtatious",
    "Stupid",
    "Hypocrite",
    "Idiotic",
    "Ignorant",
    "Liar",
    "Gullible",
    "Masochist",
    "Overzealous",
    "Overly emotional",
    "Nervous",
    "Sloppy",
    "Impatient",
    "Insensitive",
    "Immature",
    "Untrustworthy",
    "Rude",
    "Disloyal",
    "Irrational",
    "Shy",
    "Intolerant",
    "Disrespectful",
    "Disorderly",
    "Inattentive",
    "Improper",
    "Undisciplined",
    "Neuter",
    "Demented",
    "Insane",
    "Indifferent",
    "Offensive",
    "Obsessive",
    "Deceiver",
    "Unlucky",
    "Pedantic",
    "Pessimistic",
    "Deceitful",
    "Pompous",
    "Glory-hungry",
    "Workaholic",
    "Pretentious",
    "Primadonna",
    "Provocative",
    "Vain",
    "Bribery",
    "Predictable",
    "Psychopathic",
    "Spoiled",
    "Sadist",
    "Selfish",
    "Sarcastic",
    "Scrooge",
    "Weak",
    "Harsh",
    "Hero Syndrome",
    "Rough",
    "Artificial",
    "Slippery",
    "Coward",
    "Blunt",
    "Disruptive",
    "Stubborn",
    "Resentful",
    "Narrow-minded",
    "Hostile",
    "Nosy",
    "Picky",
    "Demanding",
    "Close-minded",
    "Forgetful",
    "Conceited",
    "Jealous",
    "Deviant",
    "Disorganised",
    "Malicious",
    "Bad listener",
    "Insolent",
    "Gluttonous",
    "Joker",
  ],
};

const npcGoal: Record<string, string[]> = {
  pl: [
    "Nauczyć się nowej umiejętności związanej z zawodem",
    "Odłożyć pieniądze na operację kogoś bliskiego",
    "Uratować przyjaciela z rąk porywaczy",
    "Odnaleźć zaginione dziecko",
    "Wykonać jeszcze jedną robotę przed odejściem na emeryturę",
    "Zdobyć cokolwiek co pomoże zrujnować korporację",
    "Żyć spokojnie i w miarę dostatnio",
    "Zapewnić swoim dzieciom lepszy start",
    "Wykraść dane z laboratorium korporacji",
    "Uciec przed zemstą gangu ulicznego",
    "Pozbyć się niewygodnych wspomnień",
    "Wymazać swoją tożsamość z systemu",
    "Dorwać tego, kto wymordował moją rodzinę",
    "Zamknąć w końcu tę sprawę nieukończoną od wielu lat",
    "Odszyfrować ważne dane osobiste",
    "Zerwać niewygodny kontrakt",
    "Znaleźć tego, kto mnie wydał i dowiedzieć się dlaczego",
    "Dowiedzieć się co planuje korporacja ...",
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
    "Dowiedzieć się co oznaczają te dziwne symbole w moich plikach",
    "Wziąć udział w słynnym wyścigu",
    "Spotkać osobiście gwiazdę medialną",
    "Wygrać chociaż raz w ulubionej grze komputerowej online",
    "Pogodzić się z bliską osobą",
    "Rzucić to wszystko i wyjechać gdzieś",
    "Pomóc bezdomnym na mojej ulicy",
    "Zdobyć pracę w korporacji",
    "Wyrwać się wreszcie z domu",
    "Wyleczyć się z uzależnienia",
    "Zdobyć pierwsze miejsce w konkursie",
    "Pozbyć się dowodów zbrodni",
    "Nagrać interesującego vloga",
    "Zdobyć swój pierwszy milion subskrypcji",
    "Nauczyć się pilotażu",
    "Zbudować własne SI",
    "Zaprezentować własną twórczość przed publicznością",
    "Udostępniać publicznie każdą zdobytą informację",
    "Uniknąć wyroku śmierci wydanego przez sektę",
    "Uwolnić kogoś bliskiego od wpływów sekty",
    "Wyleczyć kogoś bliskiego z uzależnienia",
    "Zaimponować znajomej osobie",
    "Zapomnieć swoją korporacyjną przeszłość",
    "Wrobić swojego szefa, bo jest zwykłą świnią",
    "Zaimponować komuś znajomemu",
    "Opchnąć ten trefny towar",
    "Odzyskać swoją tożsamość",
    "Pozbyć się tego nielegalnego wszczepu",
    "Wyjechać z bliskimi na wspaniałe wczasy",
    "Upewnić się, że nikt mnie nie zdemaskuje",
    "Zostać obrzydliwie bogatym, za wszelką cenę",
    "Przekonać innych, że świat jest iluzją",
    "Okradać bogatych i rozdawać biednym",
    "Zająć się działalnością charytatywną",
    "Założyć własną hodowlę prawdziwych zwierząt domowych",
    "Opracować swoją własną wersję znanego narkotyku",
    "Nauczyć się programowania",
    "Stworzyć własną sektę religijną",
    "Umieścić wirusa w swojej biurowej sieci",
    "Wyczyścić swój komputer z nieznanego wirusa",
    "Dowiedzieć się co szef robi w pracy po godzinach",
    "Nagrać to co się dzieje na nocnej zmianie w firmie",
    "Zdobyć nielegalny dostęp do platformy rozrywkowej",
    "Zorganizować najlepszą imprezę na dzielnicy",
    "Namówić przyjaciela na wspólne wyjście do nielegalnego klubu",
    "Wziąć udział w nielegalnych walkach na arenie",
    "Wyplenić zło na tym świecie",
    "Być przykładnym obywatelem",
    "Uzyskać stopień naukowy",
    "Uniknąć odpowiedzialności za popełniony błąd",
    "Doświadczyć czegoś nowego",
    "Odnaleźć wewnętrzny spokój",
    "Obalić ten skorumpowany rząd",
    "Zdobyć kolejną działkę",
    "Bawić się do upadłego w najbliższy weekend",
    "Włamać się do systemu rządowego",
    "Odzyskać utraconą miłość",
    "Spalić cały ten pokręcony świat",
    "Założyć własny biznes",
  ],
  en: [
    "To learn a new skill related to the profession",
    "To set aside money for an operation for someone close to me",
    "To rescue a friend from the hands of kidnappers",
    "To find a missing child",
    "Do one more job before retiring",
    "Get anything to help ruin the corporation",
    "To live a quiet and reasonably prosperous life",
    "Provide your children with a better start",
    "Steal data from the corporation's lab",
    "To escape the revenge of a street gang",
    "Get rid of inconvenient memories",
    "Erase your identity from the system",
    "To catch whoever murdered my family",
    "To finally close this case that has been unfinished for many years",
    "Decrypt important personal data",
    "Break an inconvenient contract",
    "Find whoever ratted me out and find out why",
    "Find out what the corporation is planning ...",
    "To gain power so that everyone is afraid of me",
    "Find a decent, legal job",
    "Pay off an old debt",
    "Get the voices out of my head",
    "To stop being afraid at last",
    "To buy a loved one an unusual gift",
    "To gain popularity in the media",
    "To do the job I was paid to do",
    "To find a cause worth fighting for",
    "To win friends among the rich",
    "To prove to everyone that I am somebody",
    "To get into a popular group in the Infosphere",
    "To win against a deadly disease",
    "To survive at all costs",
    "To live according to one's convictions",
    "Preach the Word of God",
    "Get even with your neighbours",
    "To make a name for myself through crazy deeds",
    "To remember who I was before I was kidnapped",
    "To liberate myself from technology",
    "To get money for plastic surgery",
    "To find true love",
    "Cure my allergy to cybermodifications",
    "Change profession",
    "To find out what the strange symbols in my files mean",
    "To take part in a famous race",
    "To meet a media star in person",
    "To win at least once in my favourite online computer game",
    "To reconcile with a loved one",
    "To drop it all and go somewhere else",
    "Help the homeless on my street",
    "Get a corporate job",
    "Get out of the house at last",
    "Get cured of my addiction",
    "To win first place in a competition",
    "Get rid of evidence of a crime",
    "To record an interesting vlog",
    "Get your first million subscriptions",
    "Learn piloting",
    "Build your own AI",
    "Present your own work in front of an audience",
    "Share every piece of information you acquire with the public",
    "Avoid a death sentence handed down by a sect",
    "To free someone close to you from the influence of a sect",
    "To cure someone close to you of an addiction",
    "To impress a friend",
    "To forget one's corporate past",
    "To frame your boss because he is a common pig",
    "Impress someone you know",
    "To sell the junk",
    "Get your identity back",
    "Get rid of that illegal implant",
    "Go on a great holiday with my loved ones",
    "Make sure no one exposes me",
    "To become disgustingly rich, at any cost",
    "Convince others that the world is an illusion",
    "Steal from the rich and give to the poor",
    "Get involved in charity work",
    "Start your own farm of real pets",
    "Develop your own version of a well-known drug",
    "Learn programming",
    "Create your own religious sect",
    "Put a virus on your office network",
    "Clean your computer of an unknown virus",
    "Find out what the boss does at work after hours",
    "Record what happens on the company's night shift",
    "Get illegal access to an entertainment platform",
    "Organize the best party in the neighbourhood",
    "Persuade a friend to go to an illegal club together",
    "Take part in illegal arena fights",
    "To eradicate evil in this world",
    "To be an exemplary citizen",
    "To obtain a scientific degree",
    "To avoid responsibility for a mistake made",
    "To experience something new",
    "To find inner peace",
    "To overthrow this corrupt government",
    "To gain another plot",
    "Party till you drop this coming weekend",
    "Hack into the government system",
    "Regain lost love",
    "Burn down the whole twisted world",
    "Start your own business",
  ],
};

const npcLook = [
  "Skołtuniona, wielokolorowa fryzura z wplecionymi nitkami światłowodów",
  "Modne ubranie i czarny skórzany trencz",
  "Kolczasta obroża na szyi",
  "Srebrne dredy i opalizujące oczy",
  "Wojskowe spodnie cargo i koszulka znanego zespołu",
  "Kombinezon motocyklisty i wzmacniana kurtka",
  "Różowe dredy i bystre zielone oczy",
  "Czarny kombinezon rowerowy",
  "Różowy irokez i czerwone cybernetyczne oczy",
  "Szary garnitur i lustrzane okulary",
  "Całe ciało pokryte tautażami",
  "Ciężkie cybernetyczne dłonie",
  "Wszystkie zęby przekształcone w kły",
  "Cybernetyczne przewody na powierzchni skóry",
  "Skórzane ubranie, metalowe klamry, ćwieki i paski",
  "Cyfrowe tatuaże pobierające dane z sieci",
  "Metalowe zęby",
  "Przerośnięte, masywne mięśnie",
  "Plątanina zużytej elektroniki zwisająca z szyi",
  "Dodatkowa cybernetyczna kończyna",
  "Metalowa cybernetyczna twarz",
  "Holograficzne, programowalne kolczyki",
  "Całe ciało porośnięte krótkim futrem",
  "Modne buty sportowe z systemem nawigacji",
  "Ubranie z błyszczącej metalicznie tkaniny",
  "Tradycyjne, japońskie kimono",
  "Drogi, bawełniany garnitur",
  "Gładkie, przylizane włosy i opaska wyświetlająca bieżące notowania giełdowe",
  "Kuloodporna kurtka ze zniekształconym logo korporacji",
  "Rytualne blizny na twarzy",
  "Długie, skórzane buty do kolan i pomarańczowa, puchowa kurtka",
  "Granatowa kurtka z wbudowanym monitorem funkcji życiowych",
  "Długi szary płaszcz, kapelusz i okulary ze wzmacniaczem optycznym",
  "Rozdwojony język i pionowe źrenice",
  "Dżinsowe spodnie i bluza z naszywką flagi narodowej",
  "Ubranie stylizowane na kombinezon roboczy, pomarańczowe diody na rękawach",
  "Wojskowy beret i apaszka",
  "Długi błyszczący płaszcz z kolorowym, futrzanym kołnierzem",
  "Obcisły, skórzany kombinezon",
  "Bejsbolówka i zółte słuchawki na uszach",
  "Długa, miękka szata ze złotymi nitkami",
  "Wielki, podświetlany symbol religijny zawieszony na grubym łańcuchu",
  "Wygolona głowa z implantem sterującym do dronów",
  "Niebieski irokez i oczy z tęczówkami zmieniającymi kolor",
  "Długie buty, krótkie spodenki, ortalionowa kurtka sygnalizacyjna",
  "Sportowy dres z neonowym logo znanej marki",
  "Ubranie khaki stylizowane na mundur",
  "Garnitur z heksagonalnym deseniem i logo znanej firmy",
  "Kamizelka wzmacniana stalowymi płytkami",
  "Białe, długie włosy i kowbojski kapelusz",
  "Skóra rąk pokryta kolorowymi, gadzimi łuskami",
  "Metalowa osłona czaszki z wbudowanym sonarem",
  "Skóra twarzy z programowalnym makijażem",
  "Cybernetyczny ogon z wmontowaną kamerą",
  "Sztuczne skrzela z boku szyi",
  "Karmazynowy kolor skóry i kostne narośla na czole",
  "Całe ciało zamknięte w metalowej powłoce",
  "Ubiór stylizowany na komiksowego superbohatera i wszczep symulujący supermoc",
  "Ubiór stylizowany na wiktoriański, cylinder i laska z projektorem holograficznym",
  "Hermetyczny kombinezon epidemiologiczny",
];

const npcGear = [
  "Kamuflaż termooptyczny",
  "Gogle noktowizyjne",
  "Wojskowy pistolet laserowy",
  "Implant paralizatora ręcznego",
  "Tani komputer przenośny",
  "Zmodyfikowane genetycznie zwierzę domowe",
  "Zestaw narzędzi elektronicznych",
  "Dron bojowy uzbrojony w karabin maszynowy",
  "Dron zwiadowczy wyposażony w kamery",
  "Pancerz z nanosiatki",
  "Implant nawigacyjny",
  "Walizka z narzędziami i częściami zamiennymi",
  "Cybernetyczne ramię",
  "Aparat oddechowy i modulator głosu na dolnej części twarzy",
  "Błyszcząca wodoodporna peleryna z wyświetlaczem pogody",
  "Personalne mikrodrony medyczne pełzające po skórze",
  "Automatyczny rozpylacz feromonów",
  "Wykrywacz trucizn wmontowany w jamę ustną",
  "Gogle transmitujące bez przerwy popularny show",
  "Chip nagrywający wrażenia zmysłowe",
  "Wszczepiony dozownik stymulantów",
  "Booster kognitywny zwiększający umiejętności interpersonalne",
  "Krótkie, ostre, wysuwane ostrza wbudowane w paznokcie",
  "Wszczepiony projektor holograficzny",
  "Kwaso- i ognioodporna, syntetyczna skóra na rękach",
  "Dwa japońskie miecze",
  "Wielki tasak kuchenny z wygrawerowanym dziwnym symbolem",
  "Zbiór pism religijnych z całego świata na podręcznym czytniku",
  "Przenośny dysk z kolekcją wirusów komputerowych",
  "Deskorolka z dodatkowym napędem i mocnymi głośnikami",
  "Zbiór cennych antyków technologicznych",
  "Neuromięśniowa matryca do programowania rysów twarzy",
  "Wszczepiony dozownik endorfin",
  "Ciemnozielony plecak z zestawem pierwszej pomocy",
  "Wbudowany neutralizator toksyn z wyświetlaczem na dłoni",
  "Cybernetyczna dłoń z wbudowanymi narzędziami chirurgicznymi",
  "Przenośny, wielofunkcyjny skaner",
  "Broń krótka w kaburze przy pasie",
  "Cybernetyczne nogi specjalizowane do biegu i skoków",
  "Neutralizator akustyczny",
  "Cybernetyczne oko z infrawizją",
  "Wszczepione filtry oddechowe",
  "Gitara elektryczna z osprzętem",
  "Analizator chemiczny",
  "Imponująca kolekcja cyfrowych autografów znanych celebrytów",
  "Dobrze zabezpieczony, prywatny węzeł w Infosferze",
  "Wbudowany w rękę wykrywacz podsłuchów",
  "Wzmocniony słuch z poszerzonym pasmem częstotliwości",
  "Stary, połatany van (ale na chodzie)",
  "Magnetyczny zestaw wspinaczkowy",
];

export {
  npcSurnameTable,
  npcNameTable,
  npcOccupation,
  npcPositiveTrait,
  npcNegativeTrait,
  npcGoal,
  npcLook,
  npcGear,
};
