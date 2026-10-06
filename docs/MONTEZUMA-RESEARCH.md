# Montezuma’s Revenge — rozpoznanie z 30.09.2026

## Zamysł i wnioski dla Mariana

W rozmowie z Robertem Jaegerem autor wskazuje nieliniowość Atari Superman oraz
skakanie z Donkey Kong jako inspiracje. Opisuje też użycie jego oryginalnego kodu
Atari jako podstawy do portów przygotowywanych przez Parker Brothers.
Źródło pierwotne: [wywiad z autorem, Tech-Gaming, 18.11.2024](https://www.tech-gaming.com/qa-montezuma_revenge/).

Wniosek projektowy dla naszej gry: ważniejsze są odkrywanie połączonych miejsc,
powroty i przedmioty niż nieustanne używanie zdolności bojowych. Saksofon jako
znalezisko daje konkretny cel eksploracji i szczególny moment muzyczny. To nasza
interpretacja kierunku, nie mechanika zaczerpnięta z oryginału.

## Co rzeczywiście sprawdzono w kodzie

[Wątek AtariAge z 2005 roku](https://forums.atariage.com/topic/81275-montezumas-revenge-hack-question-answered/)
zawiera fragment dezasemblacji **portu Atari 2600**. Widoczna procedura zmniejsza
licznik żyć, sprawdza jego znak i zapisuje następny stan gry. To przykład oddzielenia
stanu rozgrywki od samego ruchu postaci. Dyskusja wskazuje zależność od adresów
tabel, czasu wykonania instrukcji oraz przełączania banków E0. Nie jest to
potwierdzony autorski kod źródłowy Jaegera dla Atari 800.

Próba pobrania dołączonego `Montezuma__s_Revenge_Source.zip` zakończyła się HTTP 403.
Przeczytano fragment w treści wątku; pełnego archiwum nie przeanalizowano.
Nie znaleziono potwierdzonego publicznego repozytorium oryginalnych źródeł Atari 800.
Nie oznacza to, że takie źródła nie istnieją.

[Relacja autora MonteMaker z rozpracowania wersji Atari 800](https://montemaker.blogspot.com/2018/09/some-history-about-romhacking.html)
opisuje rozdzielenie danych pomieszczeń, przedmiotów i przeciwników od procedur,
a także format komnat 40 × 25 pól i ich kompresję. Jest to świadectwo osoby
analizującej plik wykonywalny, nie publikacja oryginalnych źródeł. Tych ustaleń
nie zweryfikowano samodzielnie w pełnym pliku gry.

## Zastosowanie w prototypie 0.6

- Mapy i przedmioty pozostają w danych (`realms.js`), reguły w `engine.js`.
- `saxFound` jest trwałym stanem ekwipunku. `playingSax` jest stanem chwilowym,
  kasowanym przez ruch, pauzę, porażkę i zmianę świata.
- Marian nie nosi instrumentu na plecach. Otwiera futerał w górnej wnęce kanałów
  klawiszem ↑; J pozwala potem wyjąć instrument i zagrać.
- Brama wymaga klucza, dzięki czemu brak saksofonu nie blokuje głównej drogi.
- Energia, rytmiczna osłona i premia improwizacji nie są już aktywnymi mechanikami.
- Nagranie użytkownika jest lokalnie dekodowane przez Web Audio. Nie dostarczono
  docelowego nagrania; test odtwarzania używa wyłącznie technicznego, cichego WAV.

Nie przenoszono kodu, map ani grafiki Montezuma’s Revenge. Nie przebudowywano
jeszcze świata na osobne ekrany-komnaty: obecny prototyp nadal ma przewijaną kamerę.

## Ponowne sprawdzenie i przebudowa 0.7

Ponowne poszukiwania obejmowały hasła dotyczące źródeł Atari 800, dezasemblacji
6502/2600 i repozytoriów GitHub. Wyniki nie potwierdzają, że pełny autorski kod
oryginału jest obecnie ogólnodostępny. Nie traktujemy pliku ROM/XEX ani kodu
trenującego agenta do gry jako źródeł samej gry.

### Sprawdzone konkretne pliki i ślady

1. [Repozytorium Michalcieslik1/Montezuma-s-Revenge](https://github.com/Michalcieslik1/Montezuma-s-Revenge):
   pobrano `main/cart.tic`, odczytano nagłówki bloków bez uruchamiania pliku.
   Archiwum ma 1064 bajty, a blok Lua 314 bajtów. Ten blok tylko przemieszcza
   sprite przyciskami, animuje go i rysuje napis demonstracyjny. Nie zawiera
   komnat, ekwipunku ani reguł Montezumy. Sprawdzono również `index.html`
   (uruchamia cart.tic) i `tic80.js` (runtime, bez osadzonego cart.tic).
   Tytuł repozytorium nie jest dowodem, że dostarczono kod gry.
2. [Kolekcja johnidm/asm-atari-2600](https://github.com/johnidm/asm-atari-2600):
   lista plików nie zawiera Montezumy. Link do dawnej kolekcji BJARS przekierowuje
   obecnie na stronę sprzedaży domeny. Nie uzyskano stamtąd kodu.
3. Wskazany wcześniej wątek AtariAge pozostaje źródłem widocznego fragmentu
   procedury utraty życia portu 2600. Nie uzyskano pełnego załącznika. Wniosek
   z instrukcji zmniejszenia licznika i warunkowego skoku: procedura wybiera
   kolejny stan po utracie życia, zamiast realizować całą rozgrywkę w jednym
   bloku. Na tej podstawie nie można opisać kompletnego algorytmu kolizji,
   generowania mapy czy zachowania przeciwników oryginału.

### Co można ustalić z instrukcji oryginalnej gry

[Instrukcja Parker Brothers dla Atari 2600, transkrypcja](https://www.atariage.com/manual_html_page.php?SoftwareLabelID=310)
opisuje połączone komnaty, drabiny, powroty, narzędzia pokazywane w ekwipunku,
klucze otwierające drzwi przy podejściu, okresowe zapory i znikające podłogi.
Są w niej także pasy transportowe, przeciwnicy i końcowa komnata skarbów.
To dokumentacja portu 2600 — nie należy przenosić jego liczby poziomów i
parametrów na Atari 800. Nie przypisujemy oryginałowi naszej liczby 48 komnat.

Praktyczny wniosek dla tej iteracji: czytelny, trwały ekwipunek jest równie
ważny jak samo zbieranie; a duża mapa potrzebuje rozgałęzień, powrotów i powodów
do przeszukiwania podestów. Stąd 48 autorskich komnat w grafie 8 × 6,
pięć etapów odblokowywanych kluczami, boczne pieczęcie oraz osobny ekran
potwierdzający zdobycie saksofonu. Nie kopiowano kodu, map ani grafiki źródłowej gry.

To analiza dostępnego fragmentu kodu i zweryfikowanych materiałów, **nie pełna
analiza oryginalnych źródeł Atari 800**. Dalsza analiza oryginału wymaga zdobycia
właściwego archiwum źródeł lub kompletnej, opisanej dezasemblacji.


## Dalsza analiza — 01.10.2026, wersja 0.10

Nowe poszukiwania objęły GitHub, AtariAge, forum Plus/4, Allegro oraz publikacje
narzędzi społeczności. Wyniki rozdzielamy według tego, co faktycznie udostępniają:

- [Demo Tony: Born for Adventure / Montezuma’s Gold](https://github.com/maciejmalecki/tony-demo)
  to odrębna gra, nie źródła Montezuma’s Revenge. Pobrano archiwum gałęzi `main`
  i przeczytano `src/kickass/physics.asm` oraz `src/kickass/level/demo/data.asm`.
  Autor [ogłosił publikację źródeł](https://monochrome-productions.itch.io/tony/devlog/618246/source-code-for-tonys-demo-is-available).
  Kod zawiera stany chodzenia, wspinania i skoku; testuje podłoże i drabinę
  osobno, wyrównuje pozycję do drabiny, a skok opisuje tablicą przesunięć.
  Dane poziomu mają osobne tablice wyjść N/E/S/W, obiektów i stanu komnat.
  Wniosek: połączenia i przejścia między stanami zasługują na osobny projekt.
  Nie uruchamiano ani nie kopiowano tego kodu do naszej gry.
- [Autor edytora Preliminary Monty](https://www.reddit.com/r/atari8bit/comments/1oidoul/any_interest_in_a_montezumas_revenge_level_creator/)
  deklaruje źródła Python i nadpisywanie danych komnat w istniejącym XEX.
  Podany link Google Drive podczas pobierania zwrócił HTTP 404. Źródeł edytora
  nie uzyskano; deklaracja autora nie jest potwierdzeniem zawartości archiwum.
- Ponownie sprawdzono [załącznik AtariAge](https://forums.atariage.com/topic/81275-montezumas-revenge-hack-question-answered/).
  Link do `Montezuma__s_Revenge_Source.zip` jest widoczny, ale próba otwarcia
  nie zwróciła archiwum. Nadal dostępny jest opisany wcześniej fragment 2600.
- [Wątek Plus/4](https://plus4world.powweb.com/forum/35254/Games)
  wskazuje stare BJARS oraz remake z edytorem na Allegro. Wątek Allegro nie
  otworzył się w narzędziu przeglądania. To tropy, nie przeanalizowane źródła.

[Instrukcja wydawcy dla Apple II / IBM PC](https://mirrors.apple2.org.za/ftp.apple.asimov.net/documentation/applications/misc/montezumas-revenge-manual-photocopy-source.pdf)
na drukowanych stronach 7–10 opisuje drabiny, łańcuchy do wspinania,
słupy do zjazdu w dół, przenośniki i znikające podłogi. Nie utożsamiamy parametrów
tego portu z Atari 800. Nasze liny są współczesną interpretacją łańcuchów:
można je chwytać kierunkiem pionowym i odskakiwać. Nasze mostki reagują na
nadepnięcie i ostrzegają, podczas gdy instrukcja opisuje okresowe znikanie.

W 0.10 przebudowano połączenia podestów: dwanaście rodzin tras, krótkie
odcinki między piętrami, galerie, podejścia schodkowe, liny i opcjonalne mostki.
Układy, kod i grafika są autorskie. Nie uzyskano kompletnego autorskiego kodu
oryginalnej wersji Atari 800; ROM/XEX pozostaje plikiem gry, nie źródłami.
