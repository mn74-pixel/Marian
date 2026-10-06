# Złotodźwięk — prototyp 0.19

Gra platformowo-przygodowa HTML5 Canvas. 48 komnat na sześciu piętrach i dwadzieścia trzy
ukryte komnaty (łącznie 71),
z drogami powrotnymi i bocznymi znaleziskami. Pomieszczenia nie mają nazw ani
plansz tytułowych. Cała komnata mieści się na szerokość ekranu; Marian zachowuje
zbliżenie z poprzedniej wersji. Sześć odmian otoczenia rozróżnia miejsca wizualnie.

## Kryształowy ogród 0.19

Pięć nowych komnat s19–s23 jest połączonych z prawą krawędzią wcześniejszego
skarbca s18. Przejście wymaga latarni `beacon`. Zbierasz dwie próbki szkła;
każda zapisuje wyjaśnienie barw w dzienniku i jest wymagana przy swoim zamku.
Pierwszy filtr przepuszcza turkus (zielone + niebieskie), drugi złoto (czerwone
+ zielone). Trzy przełączniki otwierają lub zamykają źródła RGB. Promienie,
bieżąca mieszanka, docelowe szkło i przewód do wrót są widoczne w komnacie.
Kolor uzupełniają etykiety, stan źródeł oraz opis w dzienniku.

Nowe otoczenie ma świecące kryształy, szklane łuki, bramę, świetlisty wodospad
i mineralne rośliny. Trasy obejmują niezależne podesty i trzyetapowe wspinaczki.
Ostatni pokój mieści skarb oraz skrót powrotny. Rozwiązania, próbki i nagroda
zachowują się po wczytaniu; stare zapisy pozostają zgodne. Lista celów i mapa
obejmują nową odnogę. Łącznie 71 komnat, 23 tajne pokoje i 14 zagadek.

`prism-depths.js` zawiera dane wyprawy i mieszanie RGB. 112 testów logiki
sprawdza wszystkie stałe podesty, przedmioty, trasy w obie strony, blokady,
próbki, mieszanie barw, zapis i drogę powrotną. Test Chrome
`?adventure&expedition&clockwork&linked&prism&feedback` przechodzi przez całą
przygodę; `visual-review.html` renderuje wszystkie 71 komnat.

## Materiały i głębia 0.18

`material-detail.js` dodaje krótkie cienie pod podestami, rysy metalu, słoje drewna,
drobne ślady roślin na zielonych platformach, światło z góry i niskie refleksy
w chłodnych pomieszczeniach. Boczne przejścia mają obramowania i oświetlony próg.
Efekty nie zmieniają geometrii ani nie zasłaniają przedmiotów; podesty zachowują
jasną, czytelną krawędź. Animowane refleksy respektują ograniczenie ruchu.

## Audio i zmiana scenerii 0.17

Efekty są domyślnie włączone; kontekst audio uruchamia kliknięcie startu.
Krótki sygnał potwierdza start i ponowne włączenie dźwięku. Wyciszenie jest
zapisywane niezależnie od postępu i pozostaje po odświeżeniu. Zbieranie nut
oraz dzwonki mają wyraźniejsze poziomy; skok ma krótki, łagodny efekt.
Nie dodano jeszcze docelowych nagrań saksofonu ani ustalanych miejsc muzycznych.

`room-looks.js` zmienia otoczenie dwóch zwykłych komnat na każdym piętrze
(16 pokoi), pozostawiając ich fizyczne trasy. Kanały przechodzą w warsztaty,
kasyno w biblioteki, a ogród w podziemne instalacje. Rosety i wysokie okna
uzupełniają architekturę. Pełny przegląd grafiki renderuje 66 komnat.
105 testów logiki przeszło po wprowadzeniu odmian otoczenia.
`smoke.html?preference` sprawdza sygnał startowy i zachowanie wyciszenia po
odświeżeniu. Testy Chrome nie potwierdzają wyjścia głośników urządzenia użytkownika.

## Detale otoczenia 0.16

Nowa warstwa `environment-details.js` dodaje spójne detale w 66 komnatach:
kamienne pilastry i ślady zużycia, donice z poruszającymi się liśćmi oraz klatkę,
zawory kanałów z kroplami i refleksami, drobne mechanizmy kasyna, oprawione szkice
i książki, narzędzia warsztatowe oraz mineralne przebarwienia. Rozmieszczenie
jest stabilne i zależy od komnaty. Ruch otoczenia respektuje preferencję
ograniczenia animacji. Dekoracje rysowane są przed podestami i przedmiotami.

Zebrane skarby zostawiają otwartą skrzynkę na swoim podeście również po powrocie
lub wczytaniu. To czytelny ślad przeszukania miejsca. Przegląd grafiki sprawdza
rendering wszystkich 66 komnat. Logika, mapa, rankingowe statystyki nut oraz
stan istniejących zagadek pozostają zgodne z poprzednim zapisem.

## Połączone instalacje i nuty 0.15

Lustra pokazują źródło, promień, trzy obracane lustra oraz odbiornik w samej
komnacie. Przewód do wrót świeci po doprowadzeniu światła; schemat pod grą jest
pomocą, a nie jedynym wyjaśnieniem. Zdalne pokrętła na podłodze mają te same
numery co lustra na ścianie. Manometry i lampy mają widoczną linię zasilania.

Po rozwiązaniu światła i obu mechanizmów warsztatu portal w r41 otwiera pięć
kolejnych komnat. Woda zasila generator; znaleziony plan instalacji trafia do
dziennika i jest wymagany przy generatorze. Energia zasila latarnię, która
odblokowuje skarbiec. Przejścia wstecz pozostają wolne, a zdobyte rozwiązania
trwają po porażce lub wczytaniu. Lista celów pod grą pokazuje cały łańcuch.
Odwiedzony portal wyprawy jest oznaczony ◇ na mapie.

Nuty nadal dają 100 punktów każda. `World.noteCount` wylicza liczbę unikalnych
zebranych nut z bieżącej komnaty i zapisów odwiedzonych pokoi; powrót nie zwiększa
licznika. Zapis zawiera `noteStats.collected` i `noteStats.points`. Starsze zapisy
odzyskują licznik z zachowanych flag zbioru. Osobny licznik pod grą przygotowuje
statystykę pod przyszły ranking; ranking online i personalizacja muzyczna nie
zostały jeszcze wdrożone. Nie ma wysyłania wyników na serwer.

Łącznie 66 komnat, 18 tajnych pokoi i 12 zagadek. 105 testów logiki przeszło,
w tym zależności zasilania, zbiór nut bez duplikatów i migracja starszego zapisu.
Test Chrome `?adventure&expedition&clockwork&linked&feedback` sprawdza pełne
wyprawy, interfejs, trwały zapis i reakcję graficzną wszystkich 12 zagadek.

## Mechaniczna wyprawa 0.14

Trzy kolejne pokoje tworzą odnogę od r34. Pierwszy zamek wymaga ustawienia
trzech manometrów na 2, 1, 3 (cykl 0–3). W warsztacie na górnym podeście leży
rysunek; dopiero po jego znalezieniu można rozwiązać mozaikę w następnym pokoju.
Dźwignie zamieniają pary płytek, zamiast obracać pojedyncze symbole. Cel to
◆ → ✦ → ●; przykładowe rozwiązanie to pierwsza, potem druga dźwignia.
Za zamkiem znajduje się mechaniczny ptak i skarb, a prawy portal skraca powrót.

`clockwork.js` zawiera nową odnogę. Grafika obejmuje zębate koła, rurociągi,
manometry z poruszanymi wskazówkami i ptaka z ruchomymi skrzydłami oraz zegarem.
Łącznie: 61 komnat, 13 tajnych pokoi, 9 zagadek i 4 wpisy w dzienniku.
98 testów JavaScriptCore sprawdza m.in. wszystkie przedmioty i podesty,
przytrzymanie mechanizmów w pobliżu drabin, zapis częściowo ułożonej mozaiki
oraz kompletną trasę nowej wyprawy. `smoke.html?clockwork&feedback` sprawdza
warsztat w Chrome i wizualną reakcję wszystkich dziewięciu zagadek.
Podgląd: http://127.0.0.1:8081/?v=0.19. Dotychczasowy zapis pozostaje zgodny.

## Czytelność zagadek 0.13

Dzwonki zachowują stałe symbole nut; po naciśnięciu kołyszą się, świecą i pokazują
reakcję na podstawie. Nad mechanizmem widoczny jest zapis przyjętych nut oraz
postęp sekwencji. Rozwiązanie zostawia napis i oznaczenia ✓ również po powrocie
lub odświeżeniu. Wszystkie siedem mechanizmów pokazuje naciśnięcie w planszy
oraz pod grą. Test `smoke.html?adventure&expedition&feedback` sprawdza pełne
wyprawy i porównuje rendering przed interakcją, po interakcji oraz po rozwiązaniu
każdej zagadki. Wszystkie 98 testów logiki i test Chrome przeszły.

## Powiązane sekrety 0.12

Siedem nowych komnat tworzy dwie trzyczęściowe wyprawy i dodatkowy sekret.
Zagadki obracania luster oraz wyboru odważników mają czytelne schematy pod grą.
Wskazówki na podestach zapisują się w dzienniku; szklany zapis otwiera dalszą
komnatę, a zapis w odbiciu trzeba przeczytać od końca. Oba zamki wymagają
faktycznego odnalezienia wskazówki. Łącznie są teraz siedem zagadek.

Dwa artefakty z opcjonalnych skarbców odblokowują skróty powrotne i ujawniają
portal w drugim pokoju od początku. Za nim czeka pociąg płynący po niebie.
Przedmioty, zapisy i rozwiązania zachowują się po porażce oraz odświeżeniu;
starsze zapisy wersji 3 pozostają zgodne. Nowe wyprawy są bez presji czasu.

`expeditions.js` zawiera połączenia, przedmioty i śledzenie promienia;
`expedition-art.js` rysuje nowe scenerie, artefakty oraz schematy mechanizmów.
Test Chrome `smoke.html?expedition` sprawdza obie wyprawy, dziennik, skróty,
zapis oraz bonusowe przejście. Sprawdzono wariant desktopowy z wcześniejszymi
zagadkami i audio oraz mobilny przy 390 px. Przegląd grafiki renderuje 58 komnat.
W tej sesji podgląd działa na http://127.0.0.1:8081/?v=0.19.

## Przygoda muzyczna 0.11

Trzy różne zagadki otwierają trzy autorskie, bezpieczne komnaty nagród. Symbole
oraz wskazówki pod grą pozwalają rozwiązać wszystko bez słuchu i bez presji czasu.
↑ przy mechanizmie wykonuje jedną akcję; przytrzymanie nie powtarza naciśnięć.

- Dzwonki: odczytanie kolejności ● / ◆ / ✦. Błędna nuta pozwala próbować dalej.
- Sprzężone krążki: obrót wybranego oraz sąsiedniego symbolu; po prawym wracamy
  do lewego. Trzeba ustawić cały zapis, a nie tylko każdy symbol osobno.
- Gwiazdy: przełączniki zmieniają po kilka świateł. Połączenia i ich numery są
  widoczne, a celem jest zapalenie trzech gwiazd jednocześnie.

Za portalami rosną kwiaty-maszyny, obraca się planetarium i śpi wieloryb z gwiazd.
Każdy świat ma platformową drogę do jednego fragmentu melodii i portal powrotny.
Z trzema fragmentami oraz saksofonem trzeba zagrać na znaku w ostatnim sekrecie.
Wieloryb budzi się, zmienia światło i daje jednorazową premię. Finał jest opcjonalny,
nie kończy eksploracji ani nie zastępuje głównego wyjścia z trzema pieczęciami.

Krótkie autorskie motywy dzwonków i pozytywki powstają w Web Audio. Przycisk
„Dźwięk” je włącza. Pauza i wyciszenie zatrzymują motywy, a odtwarzanie własnego
nagrania saksofonu ma pierwszeństwo. Finał działa wizualnie także bez nagrania.
Zapis nadal korzysta z `zlotodzwiek-v07`, format 3, rozszerzony opcjonalnymi polami
`puzzles`, `fragments`, `encore`; wcześniejsze zapisy zachowują postęp. Mapa pokazuje
trzy nowe przejścia osobno pod główną siatką. Po głównym zakończeniu można wrócić
do eksploracji przyciskiem „Odkrywaj dalej”.

Dla testowania: mechanizmy znajdują się w `r06`, `r22`, `r38`, portale prowadzą
do `s01`, `s02`, `s03`. Nie są to nazwy pokazywane graczowi.

## Trasy 0.10

Dwanaście układów połączeń podestów zastępuje osiem zestawów niezależnych
balkonów. Krótkie drabiny łączą kondygnacje, galerie mają po kilka wejść,
a układy schodkowe wymagają zmiany kierunku podczas wspinania. Warianty
mają odmienne wysokości i szerokości na kolejnych piętrach.

- Liny: ↑/↓ — chwyt i wspinanie; Spacja + kierunek — odskok. Zejście jest szybsze
  niż wejście. Pierwsza lina jest w czwartej komnacie, nad bezpieczną podłogą.
- Pękające mostki: po nadepnięciu ostrzegają przez 1,1 s, znikają na 2,8 s
  i odnawiają się, gdy postać ich nie zajmuje. Pod mostkiem jest bezpieczna podłoga.
- Początek nadal nie ma śmiertelnych pułapek. Ekwipunek i odkryta mapa pozostają
  zgodne z wcześniejszym zapisem; po wczytaniu Marian stoi przy bezpiecznym wejściu.

Źródła inspiracji i zakres faktycznej analizy kodu opisano w dokumencie badań.

## Oprawa 0.9

Żywsze palety sześciu otoczeń i materiałów podestów. Animowana warstwa tła:
obracające się koła zębate, para, kręgi i refleksy wody, świetliki oraz miękkie
światło lamp. W ogrodzie są kwiaty, w bibliotece proporce, a w jaskiniach
kryształy. Dekoracje są rysowane za platformami i postacią.

Przerysowane skórzane skrzynie i futerał, fasetowane pieczęcie, ozdobne wyjście
reagujące na komplet znalezisk, barwne iskry zbierania. Marian ma bardziej
nasyconą kurtkę, detale ubrania i poruszającą się podczas biegu chustę.
Animacje korzystają z czasu świata, więc pauza je zatrzymuje. Preferencja
systemowa ograniczenia ruchu zamraża animacje dekoracyjne i wyłącza nowe iskry.
Zapis, mapa i trudność są zgodne z wersją 0.8.

## Oprawa 0.8

Sześć scenerii otrzymało nowe materiały, głębię i lokalne światło: kamienne
sklepienia, mosiężne lampy, zasłony, szklane kopuły, mechanizmy i skały.
Podesty mają jasne krawędzie, drabiny metalowe poręcze, a przedmioty wyraźne
sylwetki. Marian ma dopracowane ubranie i cień zależny od wysokości nad podłożem.
Tła są buforowane w rozdzielczości 1440 × 810; pamięć podręczna mieści osiem teł.

Saksofon został narysowany ponownie: zwężający się korpus, ciasny dolny łuk,
rozszerzająca się czara, szyjka, ustnik, pręty i klapy. Referencja budowy:
[Yamaha — The Structure of the Saxophone](https://www.yamaha.com/en/musical_instrument_guide/saxophone/mechanism/).
Rysunek jest autorski, wykonany w Canvas. Ta sama ilustracja służy ekranowi
zdobycia, ekwipunkowi i animacji grania. Wersja 0.8 korzysta z zapisu 0.7,
bez resetowania postępu; geometria i fizyka pozostają zgodne z wersją 0.7.

## Uruchomienie

```sh
cd /Users/nowakowski/Zlotodzwiek
python3 -m http.server 8080 --bind 127.0.0.1
```

Otwórz http://localhost:8080/?v=0.19. Do prób na telefonie w tej samej sieci
serwer należy uruchomić z `--bind 0.0.0.0`, a na telefonie podać adres IP komputera.

## Eksploracja

- A/D lub ←/→: ruch. Przejście przez boczną krawędź prowadzi do sąsiedniej komnaty.
- Spacja: skok; krótkie wciśnięcie daje niższy skok. Na drabinie pozwala odskoczyć.
- ↑/↓ lub W/S: wspinanie po drabinach i linach. Puszczenie kierunku zatrzymuje na szczeblu.
- Pięć kolorowych kluczy otwiera włazy na kolejne piętra. Klucz nie zużywa się.
  Powrót w górę jest zawsze dostępny. Wszystkie 48 pomieszczeń są połączone.
- M / przycisk Mapa: odkryte pola i przejścia. Mapa zatrzymuje symulację.
- Pierwsze cztery komnaty nie mają śmiertelnych zagrożeń. Dalej pojawiają się
  szczeliny, patrolujące stworzenia, kolce na opcjonalnych podestach, okresowe
  zapory i odcinki pasa transportowego. Zapora ostrzega przed aktywacją.
- Trzy pieczęcie na bocznych podestach oraz saksofon otwierają ostatnie wyjście.
  ↑ przy wyjściu kończy przygodę. Odkrywanie wszystkich komnat jest opcjonalne.
- Po porażce Marian wraca do wejścia do bieżącej komnaty, zachowując znaleziska.

Układ jest stały, bez losowania przy każdym wejściu: dwanaście bazowych układów
podestów ma odmienne wysokości, szerokości i przeszkody na kolejnych piętrach.
Komnaty mają 48 różnych zestawów geometrii, ale korzystają ze wspólnego zestawu
motywów i elementów graficznych. To rozbudowany prototyp, nie 48 odrębnych kampanii.

## Saksofon i nagranie

Futerał znajduje się na górnym podeście trzeciej komnaty w prawo od początku
(start liczymy jako pierwszą komnatę). ↑ przy futerale wywołuje duży ekran
zdobycia z rysunkiem instrumentu. Gra czeka na świadome potwierdzenie; komunikat
nie znika od ruchu ani upływu czasu. Po potwierdzeniu saksofon pozostaje widoczny
w ekwipunku jako „ZDOBYTY ✓”. Otwarty futerał oznaczony jest „ZABRANY ✓”.

- J / ♫: wyjmij saksofon i zagraj; ponowne J lub ruch chowa instrument.
- Marian chodzi bez instrumentu na plecach, także po znalezieniu.
- „Dodaj nagranie”: lokalny WAV/MP3 do 30 MB. Dźwięk nie jest wysyłany do serwera.
  Po odświeżeniu nagranie trzeba wybrać ponownie. Bez pliku działa sama animacja.
- Po wybraniu pliku sprawdź przycisk pauzy: okno wyboru pliku może zatrzymać grę
  przez utratę aktywności przeglądarki.
- Pad: drążek/krzyżak — ruch i drabiny; A — skok/potwierdzenie znaleziska;
  X — saksofon; Back — mapa; Start — pauza. Dotyk: przyciski na ekranie.

## Zapis i zgodność

Zapis `zlotodzwiek-v07`, format 3: odkryte komnaty, zabrane nuty i przedmioty,
klucze, pieczęcie, saksofon, potwierdzenie jego zdobycia, punkty i próby,
stan zagadek, fragmenty muzyki oraz przebudzenie wieloryba.
Zapis następuje po znaleziskach, przejściach, porażce, pauzie i opuszczeniu strony.
Wczytanie wraca do bezpiecznego wejścia do zapisanej komnaty.

Poprzedni zapis `zlotodzwiek-v05` pozostaje nienaruszony. Przy pierwszym
uruchomieniu nowej mapy zachowujemy zdobyty wcześniej saksofon, punkty i próby;
pozycja i stare klucze nie odpowiadają nowemu układowi. Odzyskany instrument ma
osobny ekran potwierdzenia. Niepotwierdzone nowe znalezisko też przetrwa odświeżenie.

## Pliki i weryfikacja

- `realms.js`: dane komnat, przejścia, przedmioty i stopniowanie przeszkód.
- `adventures.js`, `adventure-art.js`: dane zagadek, ukryte komnaty i ich grafika.
- `engine.js`: deterministyczna fizyka 120 Hz i trwały stan świata.
- `character.js`, `scenery.js`, `art.js`: autorska grafika Canvas.
- `game.js`: sterowanie, okna mapy i znaleziska, audio oraz zapis.
- `tests.html`: 98 testów — wszystkie przechodzą w JavaScriptCore. Obejmują
  geometrię, graf i kolejność kluczy, fizyczne przejście każdej komnaty w obie strony,
  wieloetapowe dojście do każdego stałego podestu i przedmiotu, liny, zapadanie
  oraz odnowienie mostków, szyby w obie strony, zapis i modal znaleziska.
- `smoke.html`: test interfejsu w Chrome — start, drabiny, mapa/pauza,
  trwałe potwierdzenie zdobycia, ikona ekwipunku, lokalny WAV, zatrzymanie audio,
  boczne przejście. `?adventure` sprawdza trzy zagadki bez audio, portale, fragmenty,
  finał, zapis i mapę. `?adventure&mobile&clue` sprawdza wskazówki przy 390 px.
  `?discovery&mobile` sprawdza potwierdzenie przy szerokości 390 px.
- `visual-review.html`: sześć przykładowych scenerii i kontrola renderowania wszystkich 58 komnat (PASS).

Testy przeglądarkowe resetują postęp w używanym profilu przeglądarki. Nagranie
w teście jest technicznym, cichym WAV. Docelowego nagrania użytkownika nie ma.
Nie przeprowadzono prób na fizycznym telefonie ani padzie; szerokość mobilna
została sprawdzona w Chrome. JavaScriptCore sprawdza logikę, nie cały interfejs Safari.

Analiza inspiracji i dostępności kodu: [docs/MONTEZUMA-RESEARCH.md](docs/MONTEZUMA-RESEARCH.md).
