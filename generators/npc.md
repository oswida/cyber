---
layout: default
title: Bohater niezależny
parent: Generatory
nav_order: 1
---

# Generator: Bohater niezależny

[Wersja generatora online](https://oswida.github.io/cyber/app/dist/#/npc)

## Procedura

Aby wygenerować losowego bohatera niezależnego należy wylosować:

- imię
- nazwisko
- zawód
- przynajmniej jeden charakterystyczny element wyglądu
- posiadany sprzęt jeśli BN ma coś takiego
- pozytywną i negatywną cechę charakteru
- przynajmniej jeden cel lub pragnienie

## Imię (1k20 + 1k20)

Pierwszy rzut wybiera kolumnę, drugi pozycję w kolumnie.

| k20 | Kolumna | C1 `(1-4)` | C2 `(5-8)` | C3 `(9-12)` | C4 `(13-16)` | C5 `(17-20)` |
| --- | :-----: | ---------- | ---------- | ----------- | ------------ | ------------ |
| 1   |    1    | Abdul      | David      | Joseph      | Min          | Samuel       |
| 2   |    1    | Ahmad      | Elena      | Juan        | Ming         | Sandra       |
| 3   |    1    | Ahmed      | Elizabeth  | Laura       | Mohammed     | Sarah        |
| 4   |    1    | Alan       | Emmanuel   | Lei         | Natalya      | Sergey       |
| 5   |    2    | Alexander  | Fatima     | Li          | Nushi        | Siti         |
| 6   |    2    | Ali        | Francisco  | Lin         | Olga         | Sri          |
| 7   |    2    | Ana        | George     | Linda       | Patricia     | Sunita       |
| 8   |    2    | Andrea     | Ghulam     | Ling        | Patrick      | Susan        |
| 9   |    3    | Andrey     | Hassan     | Luis        | Paul         | Svetlana     |
| 10  |    3    | Angela     | Hong       | Manuel      | Pedro        | Tatyana      |
| 11  |    3    | Anita      | Hui        | Maria       | Peng         | Thomas       |
| 12  |    3    | Anna       | Ibrahim    | Marie       | Peter        | Victor       |
| 13  |    4    | Antonio    | Irina      | Marina      | Ping         | Vladimir     |
| 14  |    4    | Barbara    | Ivan       | Mario       | Qing         | Wei          |
| 15  |    4    | Bin        | James      | Mark        | Ram          | William      |
| 16  |    4    | Carlos     | Jean       | Martha      | Richard      | Xin          |
| 17  |    5    | Carmen     | Joao       | Martin      | Rita         | Yan          |
| 18  |    5    | Charles    | John       | Mary        | Robert       | Ying         |
| 19  |    5    | Christine  | Jorge      | Michael     | Roberto      | Yong         |
| 20  |    5    | Daniel     | Jose       | Miguel      | Rosa         | Yu           |

## Nazwisko (k20+k20)

Pierwszy rzut wybiera kolumnę, drugi pozycję w kolumnie.

| k20 | Kolumna | C1 `(1-4)` | C2 `(5-8)` | C3 `(9-12)` | C4 `(13-16)` | C5 `(17-20)` |
| --- | :-----: | ---------- | ---------- | ----------- | ------------ | ------------ |
| 1   |    1    | Adams      | Davis      | James       | Nelson       | Sanchez      |
| 2   |    1    | Allen      | Diaz       | Jenkins     | Nguyen       | Sanders      |
| 3   |    1    | Anderson   | Edwards    | Johnson     | Parker       | Scott        |
| 4   |    1    | Bailey     | Evans      | Jones       | Perez        | Smith        |
| 5   |    2    | Baker      | Fisher     | Kelly       | Perry        | Stewart      |
| 6   |    2    | Barnes     | Flores     | Kim         | Peterson     | Sullivan     |
| 7   |    2    | Bell       | Foster     | King        | Phillips     | Taylor       |
| 8   |    2    | Bennett    | Garcia     | Lee         | Powell       | Thomas       |
| 9   |    3    | Brooks     | Gomez      | Lewis       | Price        | Thompson     |
| 10  |    3    | Brown      | Gonzalez   | Long        | Ramirez      | Torres       |
| 11  |    3    | Butler     | Gray       | Lopez       | Reed         | Turner       |
| 12  |    3    | Campbell   | Green      | Martin      | Reyes        | Walker       |
| 13  |    4    | Carter     | Hall       | Martinez    | Richardson   | Ward         |
| 14  |    4    | Clark      | Harris     | Miller      | Rivera       | Watson       |
| 15  |    4    | Coleman    | Henderson  | Mitchell    | Roberts      | White        |
| 16  |    4    | Collins    | Hernandez  | Moore       | Robinson     | Williams     |
| 17  |    5    | Cook       | Hill       | Morgan      | Rodriguez    | Wilson       |
| 18  |    5    | Cooper     | Howard     | Morris      | Rogers       | Wood         |
| 19  |    5    | Cox        | Hughes     | Murphy      | Ross         | Wright       |
| 20  |    5    | Cruz       | Jackson    | Myers       | Russell      | Young        |

## Zajęcie (k20+k20)

Pierwszy rzut wybiera kolumnę, drugi pozycję w kolumnie.

| k20 | Kolumna | C1 `(1-4)`               | C2 `(5-8)`                | C3 `(9-12)`              | C4 `(13-16)`                    | C5 `(17-20)`              |
| --- | :-----: | ------------------------ | ------------------------- | ------------------------ | ------------------------------- | ------------------------- |
| 1   |    1    | Aktywista                | Handlarz software'em      | Łowca talentów           | Pisarz                          | Stróż nocny               |
| 2   |    1    | Akwizytor                | Hodowca zwierząt domowych | Magazynier               | Policjant                       | Stylistka                 |
| 3   |    1    | Analityk danych          | Hostessa                  | Makler giełdowy          | Pomocnik do wynajęcia           | Szef gangu                |
| 4   |    1    | Ankieter                 | Influencer                | Masażystka               | Portier                         | Taksówkarz                |
| 5   |    2    | Asystent osobisty        | Instruktor fitness        | Mechanik                 | Pracownik wsparcia technicznego | Tatuażysta                |
| 6   |    2    | Barman                   | Instruktor sztuki walki   | Muzyk                    | Programista gier                | Technik robotyk           |
| 7   |    2    | Bimbrownik               | Inżynier genetyk          | Najemnik                 | Programista zabezpieczeń        | Technik telekomunikacyjny |
| 8   |    2    | Chemik                   | Inżynier elektronik       | Nauczyciel               | Programista SI                  | Technik budowlany         |
| 9   |    3    | Cybertechnik             | Inżynier nanotechnolog    | Naukowiec                | Prostytutka                     | Tester oprogramowania     |
| 10  |    3    | Detektyw                 | Kierowca transportowy     | Negocjator               | Przemytnik                      | Trener e-sportu           |
| 11  |    3    | Ekoterrorysta            | Kierowca autobusu         | Ochroniarz               | Przywódca sekty                 | Uliczny iluzjonista       |
| 12  |    3    | Elektryk                 | Kierowca wyścigowy        | Ogrodnik                 | Reporter kanału informacyjnego  | Uliczny kaznodzieja       |
| 13  |    4    | Fryzjerka                | Klubowy DJ                | Operator dronów          | Robotnik fabryczny              | Urzędnik Administracji    |
| 14  |    4    | Gejsza                   | Kontroler ruchu           | Operator maszyn ciężkich | Rusznikarz                      | Właściciel klubu          |
| 15  |    4    | Grafik                   | Korporacyjny szpieg       | Opiekunka do dzieci      | Sanitariusz                     | Zabójca                   |
| 16  |    4    | Gospodarz "reality show" | Kosmetyczka               | Paser                    | Sekretarka                      | Zawodnik e-sportu         |
| 17  |    5    | Gwiazda "reality show"   | Kucharz                   | Pielęgniarka             | Specjalista PR                  | Zawodnik sportów walki    |
| 18  |    5    | Haker                    | Kurier                    | Pilot cywilny            | Sportowiec                      | Złodziej                  |
| 19  |    5    | Handlarz bronią          | Laborant                  | Pilot wojskowy           | Sprzątacz                       | Złomiarz                  |
| 20  |    5    | Handlarz narkotykami     | Lekarz                    | Piosenkarz               | Sprzedawca sklepowy             | Żołnierz                  |

## Charakterystyczny element wyglądu (k20+k20)

Pierwszy wynik wybiera sekcję, drugi podpunkt z sekcji.

### Wygląd: 1 - 7

1. Skołtuniona, wielokolorowa fryzura z wplecionymi nitkami światłowodów
2. Modne ubranie i czarny skórzany trencz
3. Kolczasta obroża na szyi
4. Srebrne dredy i opalizujące oczy
5. Wojskowe spodnie cargo i koszulka znanego zespołu
6. Kombinezon motocyklisty i wzmacniana kurtka
7. Różowe dredy i bystre zielone oczy
8. Czarny kombinezon rowerowy
9. Różowy irokez i czerwone cybernetyczne oczy
10. Szary garnitur i lustrzane okulary
11. Całe ciało pokryte tatuażami
12. Ciężkie cybernetyczne dłonie
13. Wszystkie zęby przekształcone w kły
14. Cybernetyczne przewody na powierzchni skóry
15. Skórzane ubranie, metalowe klamry, ćwieki i paski
16. Cyfrowe tatuaże pobierające dane z sieci
17. Metalowe zęby
18. Przerośnięte, masywne mięśnie
19. Plątanina zużytej elektroniki zwisająca z szyi
20. Dodatkowa cybernetyczna kończyna

### Wygląd 8 - 14

1. Metalowa cybernetyczna twarz
2. Holograficzne, programowalne kolczyki
3. Całe ciało porośnięte krótkim futrem
4. Modne buty sportowe z systemem nawigacji
5. Ubranie z błyszczącej metalicznie tkaniny
6. Tradycyjne, japońskie kimono
7. Drogi, bawełniany garnitur
8. Gładkie, przylizane włosy i opaska wyświetlająca bieżące notowania giełdowe
9. Kuloodporna kurtka ze zniekształconym logo korporacji
10. Rytualne blizny na twarzy
11. Długie, skórzane buty do kolan i pomarańczowa, puchowa kurtka
12. Granatowa kurtka z wbudowanym monitorem funkcji życiowych
13. Długi szary płaszcz, kapelusz i okulary ze wzmacniaczem optycznym
14. Rozdwojony język i pionowe źrenice
15. Dżinsowe spodnie i bluza z naszywką flagi narodowej
16. Ubranie stylizowane na kombinezon roboczy, pomarańczowe diody na rękawach
17. Wojskowy beret i apaszka
18. Długi błyszczący płaszcz z kolorowym, futrzanym kołnierzem
19. Obcisły, skórzany kombinezon
20. Bejsbolówka i żółte słuchawki na uszach

### Wygląd: 15 - 20

1. Długa, miękka szata ze złotymi nitkami
2. Wielki, podświetlany symbol religijny zawieszony na grubym łańcuchu
3. Wygolona głowa z implantem sterującym do dronów
4. Niebieski irokez i oczy z tęczówkami zmieniającymi kolor
5. Długie buty, krótkie spodenki, ortalionowa kurtka sygnalizacyjna
6. Sportowy dres z neonowym logo znanej marki
7. Ubranie khaki stylizowane na mundur
8. Garnitur z heksagonalnym deseniem i logo znanej firmy
9. Kamizelka wzmacniana stalowymi płytkami
10. Białe, długie włosy i kowbojski kapelusz
11. Skóra rąk pokryta kolorowymi, gadzimi łuskami
12. Metalowa osłona czaszki z wbudowanym sonarem
13. Skóra twarzy z programowalnym makijażem
14. Cybernetyczny ogon z wmontowaną kamerą
15. Sztuczne skrzela z boku szyi
16. Karmazynowy kolor skóry i kostne narośla na czole
17. Całe ciało zamknięte w metalowej powłoce
18. Ubiór stylizowany na komiksowego superbohatera i wszczep symulujący supermoc
19. Ubiór stylizowany na wiktoriański, cylinder i laska z projektorem holograficznym
20. Hermetyczny kombinezon epidemiologiczny noszony na stałe

## Sprzęt

Pierwszy wynik wybiera sekcję, drugi podpunkt z sekcji.

### Sprzęt: 1 - 7

1. Kamuflaż termooptyczny
2. Gogle noktowizyjne
3. Wojskowy pistolet laserowy
4. Implant paralizatora ręcznego
5. Komputer przenośny z algorytmami deszyfrującymi
6. Zmodyfikowane genetycznie zwierzę domowe
7. Zestaw narzędzi elektronicznych
8. Dron bojowy uzbrojony w karabin maszynowy
9. Dron zwiadowczy wyposażony w kamery
10. Pancerz z nanosiatki
11. Implant nawigacyjny
12. Walizka z narzędziami i częściami zamiennymi
13. Cybernetyczne ramię
14. Aparat oddechowy i modulator głosu na dolnej części twarzy
15. Błyszcząca wodoodporna peleryna z wyświetlaczem pogody
16. Personalne mikrodrony medyczne pełzające po skórze
17. Automatyczny rozpylacz feromonów
18. Wykrywacz trucizn wmontowany w jamę ustną
19. Gogle transmitujące bez przerwy popularny show
20. Chip nagrywający wrażenia zmysłowe

### Sprzęt: 8 - 14

1. Wszczepiony dozownik stymulantów
2. Booster kognitywny zwiększający umiejętności interpersonalne
3. Krótkie, ostre, wysuwane ostrza wbudowane w paznokcie
4. Wszczepiony projektor holograficzny
5. Kwaso- i ognioodporna, syntetyczna skóra na rękach
6. Dwa japońskie miecze z dozownikiem trucizny
7. Wielki tasak kuchenny z wygrawerowanym dziwnym symbolem
8. Zbiór pism religijnych z całego świata na podręcznym czytniku
9. Przenośny dysk z kolekcją wirusów komputerowych
10. Deskorolka z dodatkowym napędem i mocnymi głośnikami
11. Zbiór cennych antyków technologicznych
12. Neuromięśniowa matryca do programowania rysów twarzy
13. Wszczepiony dozownik endorfin
14. Ciemnozielony plecak z zestawem pierwszej pomocy
15. Wbudowany neutralizator toksyn z wyświetlaczem na dłoni
16. Cybernetyczna dłoń z wbudowanymi narzędziami chirurgicznymi
17. Przenośny, wielofunkcyjny skaner
18. Broń krótka w kaburze przy pasie i neurokontroler tej broni
19. Cybernetyczne nogi specjalizowane do biegu i skoków
20. Neutralizator akustyczny

### Sprzęt: 15 - 20

1. Cybernetyczne oko z infrawizją
2. Wszczepione filtry oddechowe
3. Gitara elektryczna z pełnym osprzętem
4. Analizator chemiczny
5. Imponująca kolekcja cyfrowych autografów znanych celebrytów
6. Dobrze zabezpieczony, prywatny węzeł w Infosferze
7. Wbudowany w rękę wykrywacz podsłuchów
8. Wzmocniony słuch z poszerzonym pasmem częstotliwości
9. Stary, połatany van (ale na chodzie) z ekranowaną karoserią
10. Magnetyczny zestaw wspinaczkowy
11. Robot strażniczy w postaci mechanicznego jamnika
12. Zestaw wojskowych krótkofalówek z szyfrowaną transmisją
13. Wysokiej jakości oprogramowanie do imitacji awatarów w Infosferze
14. Eksperymentalny cyberdek o zwiększonej pojemności
15. Sensory ruchu wszczepione bezpośrednio w czaszkę
16. Nanoboty znakujące wraz z goglami do ich odnajdywania
17. Skrzynia ładunków wybuchowych różnego rodzaju
18. Zagłuszacz (jammer) szerokopasmowy
19. Wariograf optyczny wbudowany w oko
20. Symulator dźwięków wszczepiony w krtań

## Cechy charakteru

Pierwszy rzut wybiera kolumnę, drugi pozycję w kolumnie.

### Pozytywna

| k20 | Kolumna | C1 `(1-4)`              | C2 `(5-8)`         | C3 `(9-12)`    | C4 `(13-16)`     | C5 `(17-20)`    |
| --- | :-----: | ----------------------- | ------------------ | -------------- | ---------------- | --------------- |
| 1   |    1    | Aktywny                 | Elegancki          | Niezależny     | Samokrytyczny    | Uporządkowany   |
| 2   |    1    | Ambitny                 | Elokwentny         | Niezawodny     | Samowystarczalny | Uprzejmy        |
| 3   |    1    | Bezinteresowny          | Empatyczny         | Obowiązkowy    | Schludny         | Uważny          |
| 4   |    1    | Bystry                  | Entuzjastyczny     | Odpowiedzialny | Serdeczny        | Wesoły          |
| 5   |    2    | Charyzmatyczny          | Galant             | Odważny        | Silny            | Wierny          |
| 6   |    2    | Ciekawy                 | Godny zaufania     | Opiekuńczy     | Skoncentrowany   | Wnikliwy        |
| 7   |    2    | Cierpliwy               | Hojny              | Pewny siebie   | Skromny          | Wrażliwy        |
| 8   |    2    | Czarujący               | Honorowy           | Pogodny        | Skuteczny        | Współczujący    |
| 9   |    3    | Czujny                  | Humorystyczny      | Pokorny        | Słodki           | Współpracujący  |
| 10  |    3    | Czysty                  | Innowacyjny        | Pracowity      | Słowny           | Wykształcony    |
| 11  |    3    | Delikatny               | Inteligentny       | Praktyczny     | Spokojny         | Wyrozumiały     |
| 12  |    3    | Dobroczynny             | Interesujący       | Przewidujący   | Spostrzegawczy   | Zasadniczy      |
| 13  |    4    | Dobroduszny             | Intuicyjny         | Przystosowany  | Sprawny          | Zdecydowany     |
| 14  |    4    | Dobrotliwy              | Kontemplacyjny     | Przywódczy     | Sprytny          | Zdolny          |
| 15  |    4    | Dobry sędzia charakteru | Krytycznie myślący | Przyzwoity     | Sympatyczny      | Zdyscyplinowany |
| 16  |    4    | Dobry słuchacz          | Kulturalny         | Punktualny     | Szanujący        | Zorganizowany   |
| 17  |    5    | Dowcipny                | Logiczny           | Racjonalny     | Szczery          | Zrelaksowany    |
| 18  |    5    | Dynamiczny              | Lojalny            | Refleksyjny    | Szczodry         | Zręczny         |
| 19  |    5    | Dyskretny               | Moralny            | Rzetelny       | Troskliwy        | Zrównoważony    |
| 20  |    5    | Elastyczny              | Nieprzekupny       | Samodzielny    | Uczciwy          | Żądny przygód   |

### Negatywna

| k20 | Kolumna | C1 `(1-4)`          | C2 `(5-8)`             | C3 `(9-12)`        | C4 `(13-16)`     | C5 `(17-20)`      |
| --- | :-----: | ------------------- | ---------------------- | ------------------ | ---------------- | ----------------- |
| 1   |    1    | Aspołeczny          | Fanatyczny             | Nieśmiały          | Pretensjonalny   | Uciążliwy         |
| 2   |    1    | Autorytarny         | Flirciarz              | Nietolerancyjny    | Primadonna       | Uparty            |
| 3   |    1    | Bez poczucia humoru | Głupi                  | Nieuczciwy         | Prowokujący      | Urażony           |
| 4   |    1    | Bez wdzięku         | Hipokryta              | Nieuporządkowany   | Próżny           | Wąskie horyzonty  |
| 5   |    2    | Bezczelny           | Idiotyczny             | Nieuważny          | Przekupny        | Wrogi             |
| 6   |    2    | Bezduszny           | Ignorant               | Niewłaściwy        | Przewidywalny    | Wścibski          |
| 7   |    2    | Bezlitosny          | Kłamca                 | Niezdyscyplinowany | Psychopatyczny   | Wybredny          |
| 8   |    2    | Bezmyślny           | Łatwowierny            | Nijaki             | Rozpieszczony    | Wymagający        |
| 9   |    3    | Bezwolny            | Masochista             | Obibok             | Sadysta          | Zamknięty w sobie |
| 10  |    3    | Bigot               | Nadgorliwy             | Obłąkany           | Samolubny        | Zapominalski      |
| 11  |    3    | Brudny              | Nadmiernie emocjonalny | Obojętny           | Sarkastyczny     | Zarozumiały       |
| 12  |    3    | Brutalny            | Nerwowy                | Obraźliwy          | Sknerus          | Zazdrosny         |
| 13  |    4    | Buntownicza         | Niechlujny             | Obsesyjny          | Słaby            | Zboczony          |
| 14  |    4    | Chaotyczny          | Niecierpliwy           | Oszust             | Surowy           | Zdezorganizowany  |
| 15  |    4    | Chytry              | Nieczuły               | Pechowiec          | Syndrom bohatera | Złośliwy          |
| 16  |    4    | Destrukcyjny        | Niedojrzały            | Pedantyczny        | Szorstki         | Zły słuchacz      |
| 17  |    5    | Destrukcyjny        | Niegodny zaufania      | Pesymista          | Sztuczny         | Zuchwały          |
| 18  |    5    | Dziecinny           | Niegrzeczny            | Podstępny          | Śliski           | Żarłoczny         |
| 19  |    5    | Egoistyczny         | Nielojalny             | Pompatyczny        | Tchórz           | Żartowniś         |
| 20  |    5    | Fałszywy            | Nieracjonalny          | Pracoholik         | Tępy             | Żądny chwały      |

## Cel lub pragnienie

Pierwszy wynik wybiera sekcję, drugi podpunkt z sekcji.

### Cel: 1 - 4

1. Nauczyć się nowej umiejętności związanej z zawodem
2. Odłożyć pieniądze na operację kogoś bliskiego
3. Uratować przyjaciela z rąk porywaczy
4. Odnaleźć zaginione dziecko
5. Wykonać jeszcze jedną robotę przed odejściem na emeryturę
6. Zdobyć cokolwiek co pomoże zrujnować korporację
7. Żyć spokojnie i w miarę dostatnio
8. Zapewnić swoim dzieciom lepszy start
9. Wykraść dane z laboratorium korporacji
10. Uciec przed zemstą gangu ulicznego
11. Pozbyć się niewygodnych wspomnień
12. Wymazać swoją tożsamość z systemu
13. Dorwać tego, kto wymordował moją rodzinę
14. Zamknąć w końcu tę sprawę nieukończoną od wielu lat
15. Odszyfrować ważne dane osobiste
16. Zerwać niewygodny kontrakt
17. Znaleźć tego, kto mnie wydał i dowiedzieć się dlaczego
18. Dowiedzieć się co planuje korporacja ...
19. Zdobyć władzę tak, żeby wszyscy się mnie bali
20. Znaleźć porządną, legalną pracę

### Cel: 5 - 8

1. Spłacić stary dług
2. Pozbyć się głosów ze swojej głowy
3. Przestać się w końcu bać
4. Kupić bliskiej osobie nietuzinkowy prezent
5. Zdobyć popularność w mediach
6. Wykonać robotę, za którą mi zapłacono
7. Znaleźć sprawę, za którą warto walczyć
8. Zdobyć przyjaciół wśród bogaczy
9. Udowodnić wszystkim, że jestem kimś
10. Dostać się do popularnej grupy w Infosferze
11. Zwyciężyć w walce ze śmiertelną chorobą
12. Przeżyć za wszelką cenę
13. Żyć zgodnie ze swoimi przekonaniami
14. Głosić Słowo Boże
15. Wyrównać porachunki z sąsiadami
16. Zdobyć sławę dzięki szaleńczym wybrykom
17. Przypomnieć sobie kim byłem zanim mnie porwano
18. Wyzwolić się od technologii
19. Zdobyć pieniądze na chirurgię plastyczną
20. Założyć własny biznes

### Cel: 9 - 12

1. Znaleźć prawdziwą miłość
2. Wyleczyć alergię na cybermodyfikacje
3. Zmienić zawód
4. Dowiedzieć się co oznaczają te dziwne symbole w moich plikach
5. Spotkać osobiście gwiazdę medialną
6. Wygrać chociaż raz w ulubionej grze komputerowej online
7. Pogodzić się z bliską osobą
8. Rzucić to wszystko i wyjechać gdzieś
9. Pomóc bezdomnym na mojej ulicy
10. Zdobyć pracę w korporacji
11. Wyrwać się wreszcie z domu
12. Wyleczyć się z uzależnienia
13. Zdobyć pierwsze miejsce w konkursie ...
14. Pozbyć się dowodów zbrodni
15. Nagrać interesującego vloga
16. Zdobyć swój pierwszy milion subskrypcji
17. Nauczyć się pilotażu
18. Zbudować własne SI
19. Zaprezentować własną twórczość przed publicznością
20. Udostępniać publicznie każdą zdobytą informację

### Cel: 13 - 16

1. Uniknąć wyroku śmierci wydanego przez sektę
2. Uwolnić kogoś bliskiego od wpływów sekty
3. Wyleczyć kogoś bliskiego z uzależnienia
4. Zaimponować znajomej osobie
5. Zapomnieć swoją korporacyjną przeszłość
6. Wrobić swojego szefa, bo jest zwykłą świnią
7. Zaimponować komuś znajomemu
8. Opchnąć ten trefny towar
9. Odzyskać swoją tożsamość
10. Pozbyć się tego nielegalnego wszczepu
11. Wyjechać z bliskimi na wspaniałe wczasy
12. Upewnić się, że nikt mnie nie zdemaskuje
13. Zostać obrzydliwie bogatym, za wszelką cenę
14. Przekonać innych, że świat jest iluzją
15. Okradać bogatych i rozdawać biednym
16. Zająć się działalnością charytatywną
17. Założyć własną hodowlę prawdziwych zwierząt domowych
18. Opracować swoją własną wersję znanego narkotyku
19. Nauczyć się programowania
20. Stworzyć własną sektę religijną

### Cel: 17 - 20

1. Umieścić wirusa w swojej biurowej sieci
2. Wyczyścić swój komputer z nieznanego wirusa
3. Dowiedzieć się co szef robi w pracy po godzinach
4. Nagrać to co się dzieje na nocnej zmianie w firmie
5. Zdobyć nielegalny dostęp do platformy rozrywkowej
6. Zorganizować najlepszą imprezę na dzielnicy
7. Namówić przyjaciela na wspólne wyjście do nielegalnego klubu
8. Wziąć udział w nielegalnych walkach na arenie
9. Wyplenić zło na tym świecie
10. Być przykładnym obywatelem
11. Uzyskać stopień naukowy
12. Uniknąć odpowiedzialności za popełniony błąd
13. Doświadczyć czegoś nowego
14. Odnaleźć wewnętrzny spokój
15. Obalić ten skorumpowany rząd
16. Zdobyć kolejną działkę
17. Bawić się do upadłego w najbliższy weekend
18. Włamać się do systemu rządowego
19. Odzyskać utraconą miłość
20. Spalić cały ten pokręcony świat
