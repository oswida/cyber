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

## Charakterystyczny element wyglądu

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
21. Metalowa cybernetyczna twarz
22. Holograficzne, programowalne kolczyki
23. Całe ciało porośnięte krótkim futrem
24. Modne buty sportowe z systemem nawigacji
25. Ubranie z błyszczącej metalicznie tkaniny
26. Tradycyjne, japońskie kimono
27. Drogi, bawełniany garnitur
28. Gładkie, przylizane włosy i opaska wyświetlająca bieżące notowania giełdowe
29. Kuloodporna kurtka ze zniekształconym logo korporacji
30. Rytualne blizny na twarzy
31. Długie, skórzane buty do kolan i pomarańczowa, puchowa kurtka
32. Granatowa kurtka z wbudowanym monitorem funkcji życiowych
33. Długi szary płaszcz, kapelusz i okulary ze wzmacniaczem optycznym
34. Rozdwojony język i pionowe źrenice
35. Dżinsowe spodnie i bluza z naszywką flagi narodowej
36. Ubranie stylizowane na kombinezon roboczy, pomarańczowe diody na rękawach
37. Wojskowy beret i apaszka
38. Długi błyszczący płaszcz z kolorowym, futrzanym kołnierzem
39. Obcisły, skórzany kombinezon
40. Bejsbolówka i żółte słuchawki na uszach
41. Długa, miękka szata ze złotymi nitkami
42. Wielki, podświetlany symbol religijny zawieszony na grubym łańcuchu
43. Wygolona głowa z implantem sterującym do dronów
44. Niebieski irokez i oczy z tęczówkami zmieniającymi kolor
45. Długie buty, krótkie spodenki, ortalionowa kurtka sygnalizacyjna
46. Sportowy dres z neonowym logo znanej marki
47. Ubranie khaki stylizowane na mundur
48. Garnitur z heksagonalnym deseniem i logo znanej firmy
49. Kamizelka wzmacniana stalowymi płytkami
50. Białe, długie włosy i kowbojski kapelusz
51. Skóra rąk pokryta kolorowymi, gadzimi łuskami
52. Metalowa osłona czaszki z wbudowanym sonarem
53. Skóra twarzy z programowalnym makijażem
54. Cybernetyczny ogon z wmontowaną kamerą
55. Sztuczne skrzela z boku szyi
56. Karmazynowy kolor skóry i kostne narośla na czole
57. Całe ciało zamknięte w metalowej powłoce
58. Ubiór stylizowany na komiksowego superbohatera i wszczep symulujący supermoc
59. Ubiór stylizowany na wiktoriański, cylinder i laska z projektorem holograficznym
60. Hermetyczny kombinezon epidemiologiczny

## Sprzęt

1. Kamuflaż termooptyczny
2. Gogle noktowizyjne
3. Wojskowy pistolet laserowy
4. Implant paralizatora ręcznego
5. Tani komputer przenośny
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
21. Wszczepiony dozownik stymulantów
22. Booster kognitywny zwiększający umiejętności interpersonalne
23. Krótkie, ostre, wysuwane ostrza wbudowane w paznokcie
24. Wszczepiony projektor holograficzny
25. Kwaso- i ognioodporna, syntetyczna skóra na rękach
26. Dwa japońskie miecze
27. Wielki tasak kuchenny z wygrawerowanym dziwnym symbolem
28. Zbiór pism religijnych z całego świata na podręcznym czytniku
29. Przenośny dysk z kolekcją wirusów komputerowych
30. Deskorolka z dodatkowym napędem i mocnymi głośnikami
31. Zbiór cennych antyków technologicznych
32. Neuromięśniowa matryca do programowania rysów twarzy
33. Wszczepiony dozownik endorfin
34. Ciemnozielony plecak z zestawem pierwszej pomocy
35. Wbudowany neutralizator toksyn z wyświetlaczem na dłoni
36. Cybernetyczna dłoń z wbudowanymi narzędziami chirurgicznymi
37. Przenośny, wielofunkcyjny skaner
38. Broń krótka w kaburze przy pasie
39. Cybernetyczne nogi specjalizowane do biegu i skoków
40. Neutralizator akustyczny
41. Cybernetyczne oko z infrawizją
42. Wszczepione filtry oddechowe
43. Gitara elektryczna z osprzętem
44. Analizator chemiczny
45. Imponująca kolekcja cyfrowych autografów znanych celebrytów
46. Dobrze zabezpieczony, prywatny węzeł w Infosferze
47. Wbudowany w rękę wykrywacz podsłuchów
48. Wzmocniony słuch z poszerzonym pasmem częstotliwości
49. Stary, połatany van (ale na chodzie)
50. Magnetyczny zestaw wspinaczkowy

## Cechy charakteru

| Pozytywna cecha charakteru |                       |                    |
| -------------------------- | --------------------- | ------------------ |
| 1. Aktywny                 | 34.Kontemplacyjny     | 67.Skromny         |
| 2. Ambitny                 | 35.Krytycznie myślący | 68.Skuteczny       |
| 3. Bezinteresowny          | 36.Kulturalny         | 69.Słodki          |
| 4. Bystry                  | 37.Logiczny           | 70.Słowny          |
| 5. Charyzmatyczny          | 38.Lojalny            | 71.Spokojny        |
| 6. Ciekawy                 | 39.Moralny            | 72.Spostrzegawczy  |
| 7. Cierpliwy               | 40.Nieprzekupny       | 73.Sprawny         |
| 8. Czarujący               | 41.Niezależny         | 74.Sprytny         |
| 9. Czujny                  | 42.Niezawodny         | 75.Sympatyczny     |
| 10.Czysty                  | 43.Obowiązkowy        | 76.Szanujący       |
| 11.Delikatny               | 44.Odpowiedzialny     | 77.Szczery         |
| 12.Dobroczynny             | 45.Odważny            | 78.Szczodry        |
| 13.Dobroduszny             | 46.Opiekuńczy         | 79.Troskliwy       |
| 14.Dobrotliwy              | 47.Pewny siebie       | 80.Uczciwy         |
| 15.Dobry sędzia charakteru | 48.Pogodny            | 81.Uporządkowany   |
| 16.Dobry słuchacz          | 49.Pokorny            | 82.Uprzejmy        |
| 17.Dowcipny                | 50.Pracowity          | 83.Uważny          |
| 18.Dynamiczny              | 51.Praktyczny         | 84.Wesoły          |
| 19.Dyskretny               | 52.Przewidujący       | 85.Wierny          |
| 20.Elastyczny              | 53.Przystosowany      | 86.Wnikliwy        |
| 21.Elegancki               | 54.Przywódczy         | 87.Wrażliwy        |
| 22.Elokwentny              | 55.Przyzwoity         | 88.Współczujący    |
| 23.Empatyczny              | 56.Punktualny         | 89.Współpracujący  |
| 24.Entuzjastyczny          | 57.Racjonalny         | 90.Wykształcony    |
| 25.Galant                  | 58.Refleksyjny        | 91.Wyrozumiały     |
| 26.Godny zaufania          | 59.Rzetelny           | 92.Zasadniczy      |
| 27.Hojny                   | 60.Samodzielny        | 93.Zdecydowany     |
| 28.Honorowy                | 61.Samokrytyczny      | 94.Zdolny          |
| 29.Humorystyczny           | 62.Samowystarczalny   | 95.Zdyscyplinowany |
| 30.Innowacyjny             | 63.Schludny           | 96.Zorganizowany   |
| 31.Inteligentny            | 64.Serdeczny          | 97.Zrelaksowany    |
| 32.Interesujący            | 65.Silny              | 98.Zręczny         |
| 33.Intuicyjny              | 66.Skoncentrowany     | 99.Zrównoważony    |
|                            |                       | 100 Żądny przygód  |

| Negatywna cecha charakteru |                       |                      |
| -------------------------- | --------------------- | -------------------- |
| 1. Aspołeczny              | 34.Niecierpliwy       | 67.Psychopatyczny    |
| 2. Autorytarny             | 35.Nieczuły           | 68.Rozpieszczony     |
| 3. Bez poczucia humoru     | 36.Niedojrzały        | 69.Sadysta           |
| 4. Bez wdzięku             | 37.Niegodny zaufania  | 70.Samolubny         |
| 5. Bezczelny               | 38.Niegrzeczny        | 71.Sarkastyczny      |
| 6. Bezduszny               | 39.Nielojalny         | 72.Sknerus           |
| 7. Bezlitosny              | 40.Nieracjonalny      | 73.Słaby             |
| 8. Bezmyślny               | 41.Nieśmiały          | 74.Surowy            |
| 9. Bezwolny                | 42.Nietolerancyjny    | 75.Syndrom bohatera  |
| 10. Bigot                  | 43.Nieuczciwy         | 76.Szorstki          |
| 11. Brudny                 | 44.Nieuporządkowany   | 77.Sztuczny          |
| 12. Brutalny               | 45.Nieuważny          | 78.Śliski            |
| 13. Buntownicza            | 46.Niewłaściwy        | 79.Tchórz            |
| 14. Chaotyczny             | 47.Niezdyscyplinowany | 80.Tępy              |
| 15. Chytry                 | 48.Nijaki             | 81.Uciążliwy         |
| 16. Destrukcyjny           | 49.Obibok             | 82.Uparty            |
| 17. Destrukcyjny           | 50.Obłąkany           | 83.Urażony           |
| 18. Dziecinny              | 51.Obojętny           | 84.Wąskie horyzonty  |
| 19. Egoistyczny            | 52.Obraźliwy          | 85.Wrogi             |
| 20. Fałszywy               | 53.Obsesyjny          | 86.Wścibski          |
| 21. Fanatyczny             | 54.Oszust             | 87.Wybredny          |
| 22. Flirciarz              | 55.Pechowiec          | 88.Wymagający        |
| 23. Głupi                  | 56.Pedantyczny        | 89.Zamknięty w sobie |
| 24. Hipokryta              | 57.Pesymista          | 90.Zapominalski      |
| 25. Idiotyczny             | 58.Podstępny          | 91.Zarozumiały       |
| 26. Ignorant               | 59.Pompatyczny        | 92.Zazdrosny         |
| 27. Kłamca                 | 60.Pracoholik         | 93.Zboczony          |
| 28. Łatwowierny            | 61.Pretensjonalny     | 94.Zdezorganizowany  |
| 29. Masochista             | 62.Primadonna         | 95.Złośliwy          |
| 30. Nadgorliwy             | 63.Prowokujący        | 96.Zły słuchacz      |
| 31. Nadmiernie emocjonalny | 64.Próżny             | 97.Zuchwały          |
| 32. Nerwowy                | 65.Przekupny          | 98.Żarłoczny         |
| 33. Niechlujny             | 66.Przewidywalny      | 99.Żartowniś         |
|                            |                       | 100.Żądny chwały     |

## Cel lub pragnienie

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
21. Spłacić stary dług
22. Pozbyć się głosów ze swojej głowy
23. Przestać się w końcu bać
24. Kupić bliskiej osobie nietuzinkowy prezent
25. Zdobyć popularność w mediach
26. Wykonać robotę, za którą mi zapłacono
27. Znaleźć sprawę, za którą warto walczyć
28. Zdobyć przyjaciół wśród bogaczy
29. Udowodnić wszystkim, że jestem kimś
30. Dostać się do popularnej grupy w Infosferze
31. Zwyciężyć w walce ze śmiertelną chorobą
32. Przeżyć za wszelką cenę
33. Żyć zgodnie ze swoimi przekonaniami
34. Głosić Słowo Boże
35. Wyrównać porachunki z sąsiadami
36. Zdobyć sławę dzięki szaleńczym wybrykom
37. Przypomnieć sobie kim byłem zanim mnie porwano
38. Wyzwolić się od technologii
39. Zdobyć pieniądze na chirurgię plastyczną
40. Znaleźć prawdziwą miłość
41. Wyleczyć alergię na cybermodyfikacje
42. Zmienić zawód
43. Dowiedzieć się co oznaczają te dziwne symbole w moich plikach
44. Spotkać osobiście gwiazdę medialną
45. Wygrać chociaż raz w ulubionej grze komputerowej online
46. Pogodzić się z bliską osobą
47. Rzucić to wszystko i wyjechać gdzieś
48. Pomóc bezdomnym na mojej ulicy
49. Zdobyć pracę w korporacji
50. Wyrwać się wreszcie z domu
51. Wyleczyć się z uzależnienia
52. Zdobyć pierwsze miejsce w konkursie ...
53. Pozbyć się dowodów zbrodni
54. Nagrać interesującego vloga
55. Zdobyć swój pierwszy milion subskrypcji
56. Nauczyć się pilotażu
57. Zbudować własne SI
58. Zaprezentować własną twórczość przed publicznością
59. Udostępniać publicznie każdą zdobytą informację
60. Uniknąć wyroku śmierci wydanego przez sektę
61. Uwolnić kogoś bliskiego od wpływów sekty
62. Wyleczyć kogoś bliskiego z uzależnienia
63. Zaimponować znajomej osobie
64. Zapomnieć swoją korporacyjną przeszłość
65. Wrobić swojego szefa, bo jest zwykłą świnią
66. Zaimponować komuś znajomemu
67. Opchnąć ten trefny towar
68. Odzyskać swoją tożsamość
69. Pozbyć się tego nielegalnego wszczepu
70. Wyjechać z bliskimi na wspaniałe wczasy
71. Upewnić się, że nikt mnie nie zdemaskuje
72. Zostać obrzydliwie bogatym, za wszelką cenę
73. Przekonać innych, że świat jest iluzją
74. Okradać bogatych i rozdawać biednym
75. Zająć się działalnością charytatywną
76. Założyć własną hodowlę prawdziwych zwierząt domowych
77. Opracować swoją własną wersję znanego narkotyku
78. Nauczyć się programowania
79. Stworzyć własną sektę religijną
80. Umieścić wirusa w swojej biurowej sieci
81. Wyczyścić swój komputer z nieznanego wirusa
82. Dowiedzieć się co szef robi w pracy po godzinach
83. Nagrać to co się dzieje na nocnej zmianie w firmie
84. Zdobyć nielegalny dostęp do platformy rozrywkowej
85. Zorganizować najlepszą imprezę na dzielnicy
86. Namówić przyjaciela na wspólne wyjście do nielegalnego klubu
87. Wziąć udział w nielegalnych walkach na arenie
88. Wyplenić zło na tym świecie
89. Być przykładnym obywatelem
90. Uzyskać stopień naukowy
91. Uniknąć odpowiedzialności za popełniony błąd
92. Doświadczyć czegoś nowego
93. Odnaleźć wewnętrzny spokój
94. Obalić ten skorumpowany rząd
95. Zdobyć kolejną działkę
96. Bawić się do upadłego w najbliższy weekend
97. Włamać się do systemu rządowego
98. Odzyskać utraconą miłość
99. Spalić cały ten pokręcony świat
100. Założyć własny biznes
