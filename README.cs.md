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
- **Řádky předmětů** — jeden na předmět, každý se svým průměrem a posledními známkami jako
  malými barevnými čtverečky (slovní hodnocení jako `"Sl"` se zobrazí jako obyčejný šedý
  čtvereček, ne jako číslo). Odznak `+N` se objeví, pokud má předmět víc známek, než kolik jich
  nese atribut entity.
- **Zvýraznění nové známky** — známka se označí jako nová buď proto, že právě dorazila přes
  event integrace `skolaonline_znamky_new_mark`, nebo proto, že je datovaná v posledních
  několika dnech.
- **Celá historie** — kliknutím na řádek předmětu (nebo na tlačítko "Celá historie" pro celé
  dítě) se zavolá service integrace `skolaonline_znamky.get_marks`, který stáhne kompletní
  seznam pro daný předmět/dítě včetně tématu a slovního hodnocení, které se do atributů entity
  nevejdou.

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
| `subject_order` | list | pořadí z atributu | ID předmětů v pořadí, v jakém se mají zobrazovat. |
| `subject_colors` | map | žádná | ID předmětu → hex barva, použije se pro pruh a název předmětu. |

```yaml
type: custom:skolaonline-znamky-ui-marks-all-card
entity: sensor.<dítě>_marks
title: 'Tomáš'
subject_order:
  - D118760
  - D118763
subject_colors:
  D118763: '#3f51b5'
```

## Použití grafického editoru

Místo úpravy YAML otevřete grafický editor karty (ikona tužky) a vyberte entitu dítěte a
nastavte vlastní název. Sekce **pořadí a barvy předmětů** vypíše všechny předměty, které entita
momentálně nese — přetažením řádku za jeho úchyt změníte pořadí předmětů na kartě, kliknutím na
barevný kroužek u předmětu otevřete výběr barvy pro jeho zvýraznění (tlačítko vedle vrátí
výchozí barvu).

Předměty, které z entity zmizí (např. předmět se v daném pololetí neučí), z tohoto seznamu
prostě zmizí — nic se nemusí ručně uklízet.

## Řešení problémů

- **Karta se nenabízí v "Přidat kartu"** — nabízí se jen pro entity, u kterých registr entit
  hlásí `platform: skolaonline_znamky`; ověřte, že integrace entitu vytvořila a že jde o
  `sensor.*_marks`, ne o jinou entitu na stejném zařízení.
- **"Celá historie" hlásí chybu** — nepodařilo se zavolat service
  `skolaonline_znamky.get_marks`, nejčastěji proto, že config entry integrace není načtený
  (zkontrolujte Nastavení → Zařízení a služby), nebo je API Škola OnLine dočasně nedostupné.
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
