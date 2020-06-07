# IEEE-754-Floating-Point-Converter

bin2dec &amp; dec2bin conversion

Moja implementacja tematu "Konwerter liczb całkowitych i rzeczywistych (zapis zmiennopozycyjny) na i z postaci binarnej"

Użyta technologia: React TypeScript ( w tym oczywiście HTML, CSS, SCSS, JavaScript ).

Aby uruchomić projekt, po prostu otwórz plik build/index.html, otworzy się strona internetowa,
gdzie można wykonać następujące operacje:

- przeliczanie liczb całkowitych na system dziesiętny i na odwrót. Kliknąć w przycisk "Integers number" po czym wpisać liczbę, przeliczanie odbędą się automatycznie.
- przeliczanie liczb rzeczywistych na system dziesiętny i na odwrót wykorzystując IEEE-754 czyli standard reprezentacji binarnej na LICZBACH ZMIENNOPRZECINKOWYCH.
  Należy kliknąć przycisk "Real number" po czym:

1. można wpisać liczbę dziesiętną ( w tym liczby wymierne ), a następnie klinać "to BINARY" aby przeliczyć na liczbę binarną w standarcie IEEE-754.
   Poniżej na niebieskim polu będzie widać szczegóły zapisu liczby zmiennopozycyjnej (liczba 32bitowa, opisana znakiem, eksponentą oraz mantysą)
2. można wpisać liczbę binarną (maksymalnie 32 bitową), a następnie kliknąć "to DECIMAL" aby przeliczyć na liczbę dziesiętną.
   Poniżej na czerwonym polu również wyświetlą się szczegoły liczby zapisej w standarcie IEEE-754.

W folderze "development" znajdują się pliki implementacji, NAJWAZNIEJSZE Z NICH:

- development/src/components/FpConverter/index.tsx - implementacja GUI ( wyglądu ),
  wywołania funkcji, logika obliczenia postaci liczby zmiennoprzecinkowej
- development/src/utils/convertNumberSystem - logika przeliczania liczb bin2dec, dec2bin,
  a także dla liczb bin2dec i dec2bin dla liczb WYMIERNYCH
- development/src/components/Converter/index.tsx - implementacja GUI ( wyglądu ) dla liczb calkowitych,
  wywołania funkcji, część logiki.

ŹRÓDŁA:
https://www.wikihow.com/Convert-a-Number-from-Decimal-to-IEEE-754-Floating-Point-Representation
http://lidia-js.kis.p.lodz.pl/Systemy_Liczbowe/standard_754_teoria.php
https://www.h-schmidt.net/FloatConverter/IEEE754.html <-- sprawdzenie poprawności wyników
