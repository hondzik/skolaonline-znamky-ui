# Škola OnLine – Známky (Lovelace karta) <!-- omit from toc -->

[![GitHub Release](https://img.shields.io/github/release/hondzik/skolaonline-znamky-ui.svg?style=for-the-badge)](https://github.com/hondzik/skolaonline-znamky-ui/releases)
[![License](https://img.shields.io/github/license/hondzik/skolaonline-znamky-ui.svg?style=for-the-badge)](LICENSE)
[![Project Maintenance](https://img.shields.io/badge/maintainer-hondzik-blue.svg?style=for-the-badge)](https://github.com/hondzik)
![Github](https://img.shields.io/github/followers/hondzik.svg?style=for-the-badge)
[![GitHub Activity](https://img.shields.io/github/last-commit/hondzik/skolaonline-znamky-ui?style=for-the-badge)](https://github.com/hondzik/skolaonline-znamky-ui/commits/main)

[English](README.md)

Vlastní Lovelace **karta** pro Home Assistant, která zobrazuje známky dítěte z integrace
[`skolaonline_znamky`](https://github.com/hondzik/skolaonline-znamky) pro český školní systém
**Škola OnLine** — barevně zvýrazněný průměr, řádek na předmět s posledními známkami a na
vyžádání celou historii.

## Obsah <!-- omit from toc -->

- [Jak to funguje](#jak-to-funguje)
- [Instalace](#instalace)
  - [1. Instalace pluginu](#1-instalace-pluginu)
  - [2. Přidání karty](#2-přidání-karty)
- [Možnosti konfigurace](#možnosti-konfigurace)
- [Použití grafického editoru](#použití-grafického-editoru)
- [Řešení problémů](#řešení-problémů)
- [Překlady](#překlady)
- [Přispěvatelé](#přispěvatelé)

## Jak to funguje

Karta vychází výhradně z jedné entity `sensor.<dítě>_marks`, kterou už poskytuje integrace
`skolaonline_znamky` — s API Škola OnLine sama nikdy nekomunikuje:

- **Hlavička** — jméno dítěte, školní rok a pololetí, celkový průměr (state) v barevném
  odznaku. České známkování je 1 = nejlepší, 5 = nejhorší, takže barevná škála je obrácená
  oproti běžnému "vyšší = lepší" ukazateli (zelená u 1, červená u 5).
- **Řádky předmětů** — jeden na předmět, s barevným pruhem vlevo (jeho šířka je
  konfigurovatelná přes `border_width`) v barvě nastavené pro daný předmět, každý se svým
  průměrem a posledními známkami jako malými barevnými čtverečky (slovní hodnocení jako `"Sl"`
  se zobrazí jako obyčejný šedý čtvereček, ne jako číslo). Odznak `+N` se objeví, pokud má
  předmět víc známek, než kolik jich nese atribut entity. Předmět, o kterém integrace ví (např.
  z rozvrhu), ale nemá v tomto pololetí zatím žádnou známku, zobrazí místo průměru „–" a místo
  čtverečků text „Zatím žádné známky" — přepínač `show_empty_subjects` (výchozí zapnuto) takové
  předměty úplně skryje, a libovolný jednotlivý předmět lze skrýt z grafického editoru bez
  ohledu na to, jestli známky má.
- **Zvýraznění nové známky** — známka se označí jako nová buď proto, že právě dorazila přes
  event integrace `skolaonline_znamky_new_mark`, nebo proto, že je datovaná v posledních
  několika dnech.
- **Celá historie** — kliknutím na řádek předmětu se pod ním rozbalí kompletní, nezkrácený
  seznam známek toho předmětu (datum, téma a váha, plus pole slovního hodnocení — nic z toho
  se do atributů entity nevejde); rozbalený může být vždy jen jeden předmět, takže otevření
  jiného předchozí zavře. Využívá to volání service integrace `skolaonline_znamky.get_marks` —
  ta vrátí známky všech předmětů bez ohledu na to, který jste chtěli, takže karta si výsledek
  jednou stáhne, 30 minut ho cachuje a znovu použije pro každý další rozbalený předmět, dokud
  cache nezestárne. Cache se okamžitě zahodí i eventem
  `skolaonline_znamky_new_mark` nebo stiskem tlačítka aktualizace (viz níže) — obojí znamená,
  že se známky mohly změnit, takže se při dalším rozbalení stáhnou znovu, ne z už neplatné
  cache.
- **Aktualizace** — ikona vedle průměru zavolá vestavěnou službu `homeassistant.update_entity`
  na entitě, což u entity napojené na coordinator vyvolá okamžitou aktualizaci (stažení
  pololetí a známek, agregace, diff proti uloženým známkám a případně event
  `skolaonline_znamky_new_mark`) — přesně to samé, co by udělala naplánovaná aktualizace, jen
  bez čekání na ni. `get_marks` sám o sobě stav entity nikdy neaktualizuje, takže tohle je
  jediný způsob, jak z karty vynutit čerstvá data ze Škola OnLine.

Karta vždy zobrazuje jen *aktuální* pololetí entity — známky ze Škola OnLine jsou jen ke čtení a
z karty samotné nejde jedinou entitu přepnout na minulé pololetí.

## Instalace

### 1. Instalace pluginu

Nainstalujte přes [HACS](https://hacs.xyz/) jako vlastní repozitář (kategorie: Plugin), pokud
ještě není v výchozím katalogu, nebo zkopírujte `dist/skolaonline-znamky-ui.js` do složky
`www/` a přidejte ho jako Lovelace resource ručně.

[![My Home Assistant](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?repository=skolaonline-znamky-ui&owner=hondzik&category=Plugin)

### 2. Přidání karty

Ujistěte se, že je nastavená integrace
[`skolaonline_znamky`](https://github.com/hondzik/skolaonline-znamky) a že vytvořila entitu
`sensor.<dítě>_marks`. Pak v editoru dashboardu použijte "Přidat kartu" a vyberte tuto entitu —
**Škola OnLine – Známky** se nabídne automaticky pro každou entitu patřící této integraci.

Nebo přidejte kartu přímo přes YAML:

```yaml
type: custom:skolaonline-znamky-ui-marks-all-card
entity: sensor.<dítě>_marks
```

## Možnosti konfigurace

Všechny volby lze nastavit přes YAML i přes grafický editor:

| Volba | Typ | Výchozí | Popis |
| ---------------- | ------ | ------------------ | -------------------------------------------------------------------- |
| `entity` | string | — | Entita `sensor.<dítě>_marks`. Povinné. |
| `title` | string | jméno dítěte | Přepíše jméno zobrazené v hlavičce. |
| `title_font_size` | number | `20` | Velikost písma (px) nadpisu v hlavičce. |
| `subject_font_size` | number | `15` | Velikost písma (px) názvu předmětu. |
| `marks_font_size` | number | `14` | Velikost písma (px) čtverečků se známkami a odznaku "+N dalších". |
| `size_by_weight` | boolean | `false` | Zvětší čtvereček známky podle její váhy vůči průměrné váze zobrazených známek (slovní hodnocení se velikostí chová jako tento průměr, protože jeho vlastní váha nemá smysl). Funguje bez ohledu na to, jakou stupnici vah škola používá (např. 0,1–1 nebo 1–100). |
| `border_width` | number | `8` | Šířka (px) barevného pruhu vlevo u každého předmětu. |
| `show_empty_subjects` | boolean | `true` | Zda zobrazovat předměty, které v tomto pololetí ještě nemají žádnou známku. |
| `subject_order` | list | pořadí z atributu | ID předmětů v pořadí, v jakém se mají zobrazovat. |
| `subject_colors` | map | žádná | ID předmětu → hex barva, použije se pro levý pruh a název předmětu. |
| `subject_hidden` | list | žádná | ID předmětů, které se mají vždy skrýt, bez ohledu na `show_empty_subjects`. |

```yaml
type: custom:skolaonline-znamky-ui-marks-all-card
entity: sensor.<dítě>_marks
title: 'Tomáš'
title_font_size: 22
subject_font_size: 16
marks_font_size: 16
border_width: 10
size_by_weight: true
show_empty_subjects: false
subject_order:
  - D118760
  - D118763
subject_colors:
  D118763: '#3f51b5'
subject_hidden:
  - D118761
```

## Použití grafického editoru

Místo úpravy YAML otevřete grafický editor karty (ikona tužky), vyberte entitu dítěte, nastavte
vlastní název, posuvníkem doladíte všechny tři velikosti písma i šířku levého pruhu a přepínačem
zvolíte, zda se mají zobrazovat i předměty bez známek. Sekce **pořadí a barvy předmětů** vypíše
všechny předměty, které entita momentálně nese, včetně skrytých a těch bez známek (zobrazí se
ztmavené) — přetažením řádku za jeho úchyt změníte pořadí předmětů na kartě, kliknutím na
barevný kroužek u předmětu otevřete výběr barvy pro jeho zvýraznění (tlačítko vedle vrátí
výchozí barvu) a ikonou oka daný předmět skryjete nebo zase zobrazíte bez ohledu na globální
přepínač.

Předměty, které z entity zmizí (např. předmět se v daném pololetí neučí), z tohoto seznamu
prostě zmizí — nic se nemusí ručně uklízet.

## Řešení problémů

- **Karta se nenabízí v "Přidat kartu"** — nabízí se jen pro entity, u kterých registr entit
  hlásí `platform: skolaonline_znamky`; ověřte, že integrace entitu vytvořila a že jde o
  `sensor.*_marks`, ne o jinou entitu na stejném zařízení.
- **Rozbalení předmětu hlásí chybu** — nepodařilo se zavolat service
  `skolaonline_znamky.get_marks`, nejčastěji proto, že config entry integrace není načtený
  (zkontrolujte Nastavení → Zařízení a služby), nebo je API Škola OnLine dočasně nedostupné.
  Ikona aktualizace v hlavičce tohle volání nezkusí znovu — jen vynutí aktualizaci entity;
  zavřete a znovu rozbalte předmět (nebo počkejte, až 30minutová cache zestárne), abyste
  `get_marks` zavolali znovu.
- **Známky/barvy předmětu vypadají špatně po změně pololetí** — `subject_order`/
  `subject_colors` se váží na `subject_id`, ne na název předmětu, takže by mělo zůstat stabilní
  napříč pololetími; pokud se předmětu skutečně změnilo ID (např. jde o opravdu nový předmět),
  stačí ho v editoru znovu přeřadit nebo přebarvit.

## Překlady

Karta i její editor jsou přeloženy do češtiny a angličtiny (pro jiný jazyk se použije
angličtina). Chybí váš jazyk, nebo jste v existujícím překladu našli chybu? Klidně otevřete
issue nebo PR.

## Přispěvatelé

[![Contributors](https://contrib.rocks/image?repo=hondzik/skolaonline-znamky-ui)](https://github.com/hondzik/skolaonline-znamky-ui/graphs/contributors)
