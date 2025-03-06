// Eksempel på data for et sikkerhetstiltak med implementeringsguide
// Disse dataene kan brukes for å teste komponenten

const exampleMeasures = [
    {
      id: "measure1",
      title: "Aktiver totrinnsbekreftelse",
      description: "Beskytt viktige kontoer med et ekstra sikkerhetslag for å forhindre uautorisert tilgang selv om passordet kompromitteres.",
      reason: "Totrinnsverifisering gjør det betydelig vanskeligere for angripere å få tilgang til kontoer, selv om passordet er kjent.",
      priority: "Høy",
      category: "Identitets- og tilgangsstyring",
      eloPoints: 40,
      implementationSteps: [
        {
          title: "Last ned programvare for administrasjon",
          description: "Last ned og installer sentralisert programvare for å håndtere totrinnsbekreftelse for alle kontoer.",
          completed: false,
          details: [
            "Gå til leverandørens nettsted, opprett en konto hvis nødvendig og last ned administrasjonsverktøyet.",
            "Installer på en server eller PC som vil fungere som kontrollpunkt."
          ]
        },
        {
          title: "Kartlegg viktige kontoer",
          description: "Lag en liste over alle viktige brukere og kontoer som skal ha totrinnsbekreftelse.",
          completed: false,
          details: [
            "Inkluder e-postkontoer, tilganger til skytjenester, administrative kontoer og VPN-tilganger.",
            "Prioriter basert på hvilke kontoer som har mest privilegier eller tilgang til sensitiv informasjon."
          ]
        },
        {
          title: "Velg autentiseringsmetode",
          description: "Bestem hvilken form for totrinnsbekreftelse som passer best for din bedrift.",
          completed: false,
          details: [
            "Du kan velge mellom SMS-koder, e-postkoder, dedikerte app-genererte koder (som Google Authenticator, Microsoft Authenticator) eller fysiske sikkerhetsøkler (som YubiKey)."
          ]
        },
        {
          title: "Konfigurer løsningen",
          description: "Sett opp totrinnsbekreftelse i sentralisert administrasjonssystem.",
          completed: false,
          details: [
            "Følg leverandørens veiledning for konfigurasjon. Sørg for at du setter gode standardinnstillinger som balanserer sikkerhet og brukervennlighet."
          ]
        }
      ]
    },
    {
      id: "measure2",
      title: "Implementer totrinnsverifisering",
      description: "Sett opp totrinnsverifisering for alle brukere for å styrke påloggingssikkerheten.",
      reason: "Totrinnsverifisering beskytter kontoer selv om passord blir kompromittert.",
      priority: "Høy",
      category: "Identitets- og tilgangsstyring",
      eloPoints: 40,
      implementationSteps: [
        {
          title: "Velg en løsning for totrinnsverifisering",
          description: "Velg en løsning som passer for bedriftens størrelse og behov.",
          completed: false,
          details: [
            "For små bedrifter: Vurder Microsoft Authenticator, Google Authenticator eller Authy.",
            "For større bedrifter: Vurder en Enterprise-løsning som Duo Security eller RSA SecurID."
          ]
        },
        {
          title: "Konfigurer totrinnsverifisering for administrative kontoer",
          description: "Start med å aktivere for de mest kritiske kontoene i organisasjonen.",
          completed: false,
          details: [
            "Administrative kontoer bør prioriteres først.",
            "Sørg for at systemadministratorer er opplært i hvordan de skal bruke løsningen."
          ]
        },
        {
          title: "Utarbeid brukerveiledning",
          description: "Lag en enkel guide for sluttbrukere om hvordan de skal konfigurere og bruke totrinnsverifisering.",
          completed: false,
          details: [
            "Inkluder skjermbilder og trinnvise instruksjoner.",
            "Tilby støtte for brukere som har problemer med å konfigurere løsningen."
          ]
        },
        {
          title: "Implementer for alle brukere",
          description: "Rull ut løsningen til alle ansatte i organisasjonen.",
          completed: false,
          details: [
            "Vurder en gradvis utrulling for å minimere brukerstøtteproblemer.",
            "Følg opp for å sikre at alle har konfigurert løsningen korrekt."
          ]
        },
        {
          title: "Gjennomfør testing",
          description: "Test at løsningen fungerer som forventet for alle brukere og systemer.",
          completed: false,
          details: [
            "Verifiser at brukere kan logge på med totrinnsverifisering.",
            "Test gjenopprettingsprosessen hvis en bruker mister sin andre faktor."
          ]
        }
      ]
    },
    {
      id: "measure3",
      title: "Sikker passordpolicy",
      description: "Implementer en sikker passordpolicy som balanserer sikkerhet og brukervennlighet.",
      reason: "Sterke passord er førstelinjeforsvaret mot uautorisert tilgang til systemer og data.",
      priority: "Høy",
      category: "Identitets- og tilgangsstyring",
      eloPoints: 35,
      implementationSteps: [
        {
          title: "Definer passordkrav",
          description: "Utarbeid krav til passordkompleksitet og utløp som følger beste praksis.",
          completed: false,
          details: [
            "Anbefalt: Minst 12 tegn, kombinasjon av store og små bokstaver, tall og spesialtegn.",
            "Vurder å bruke passordfrase i stedet for komplekse passord (lettere å huske, vanskeligere å knekke)."
          ]
        },
        {
          title: "Konfigurer passordpolicy",
          description: "Implementer passordpolicyen i Active Directory eller tilsvarende system.",
          completed: false,
          details: [
            "Konfigurer utløpsdato (anbefalt: hver 90. dag).",
            "Implementer historikkontroll (hindre gjenbruk av tidligere passord)."
          ]
        },
        {
          title: "Vurder passordadministrasjonsverktøy",
          description: "Implementer en bedriftsversjon av et passordadministrasjonsverktøy.",
          completed: false,
          details: [
            "Et passordadministrasjonsverktøy gjør det enklere for brukere å administrere komplekse, unike passord.",
            "Vurder løsninger som LastPass, 1Password eller Keeper for bedrifter."
          ]
        },
        {
          title: "Utarbeid brukerveiledning",
          description: "Informer brukere om den nye passordpolicyen og gi dem tips til sikker passordadministrasjon.",
          completed: false,
          details: [
            "Forklar hvorfor sterke passord er viktige.",
            "Gi eksempler på hvordan man lager sterke passord som er lette å huske."
          ]
        }
      ]
    },
    {
      id: "measure2",
      title: "Implementer totrinnsverifisering",
      description: "Sett opp totrinnsverifisering for alle brukere for å styrke påloggingssikkerheten.",
      reason: "Totrinnsverifisering beskytter kontoer selv om passord blir kompromittert.",
      priority: "Høy",
      category: "Identitets- og tilgangsstyring",
      eloPoints: 40,
      implementationSteps: [
        {
          title: "Velg en løsning for totrinnsverifisering",
          description: "Velg en løsning som passer for bedriftens størrelse og behov.",
          completed: false,
          details: [
            "For små bedrifter: Vurder Microsoft Authenticator, Google Authenticator eller Authy.",
            "For større bedrifter: Vurder en Enterprise-løsning som Duo Security eller RSA SecurID."
          ]
        },
        {
          title: "Konfigurer totrinnsverifisering for administrative kontoer",
          description: "Start med å aktivere for de mest kritiske kontoene i organisasjonen.",
          completed: false,
          details: [
            "Administrative kontoer bør prioriteres først.",
            "Sørg for at systemadministratorer er opplært i hvordan de skal bruke løsningen."
          ]
        },
        {
          title: "Utarbeid brukerveiledning",
          description: "Lag en enkel guide for sluttbrukere om hvordan de skal konfigurere og bruke totrinnsverifisering.",
          completed: false,
          details: [
            "Inkluder skjermbilder og trinnvise instruksjoner.",
            "Tilby støtte for brukere som har problemer med å konfigurere løsningen."
          ]
        },
        {
          title: "Implementer for alle brukere",
          description: "Rull ut løsningen til alle ansatte i organisasjonen.",
          completed: false,
          details: [
            "Vurder en gradvis utrulling for å minimere brukerstøtteproblemer.",
            "Følg opp for å sikre at alle har konfigurert løsningen korrekt."
          ]
        },
        {
          title: "Gjennomfør testing",
          description: "Test at løsningen fungerer som forventet for alle brukere og systemer.",
          completed: false,
          details: [
            "Verifiser at brukere kan logge på med totrinnsverifisering.",
            "Test gjenopprettingsprosessen hvis en bruker mister sin andre faktor."
          ]
        }
      ]
    },
    {
      id: "measure4",
      title: "Sikker passordpolicy",
      description: "Implementer en sikker passordpolicy som balanserer sikkerhet og brukervennlighet.",
      reason: "Sterke passord er førstelinjeforsvaret mot uautorisert tilgang til systemer og data.",
      priority: "Høy",
      category: "Identitets- og tilgangsstyring",
      eloPoints: 35,
      implementationSteps: [
        {
          title: "Definer passordkrav",
          description: "Utarbeid krav til passordkompleksitet og utløp som følger beste praksis.",
          completed: false,
          details: [
            "Anbefalt: Minst 12 tegn, kombinasjon av store og små bokstaver, tall og spesialtegn.",
            "Vurder å bruke passordfrase i stedet for komplekse passord (lettere å huske, vanskeligere å knekke)."
          ]
        },
        {
          title: "Konfigurer passordpolicy",
          description: "Implementer passordpolicyen i Active Directory eller tilsvarende system.",
          completed: false,
          details: [
            "Konfigurer utløpsdato (anbefalt: hver 90. dag).",
            "Implementer historikkontroll (hindre gjenbruk av tidligere passord)."
          ]
        },
        {
          title: "Vurder passordadministrasjonsverktøy",
          description: "Implementer en bedriftsversjon av et passordadministrasjonsverktøy.",
          completed: false,
          details: [
            "Et passordadministrasjonsverktøy gjør det enklere for brukere å administrere komplekse, unike passord.",
            "Vurder løsninger som LastPass, 1Password eller Keeper for bedrifter."
          ]
        },
        {
          title: "Utarbeid brukerveiledning",
          description: "Informer brukere om den nye passordpolicyen og gi dem tips til sikker passordadministrasjon.",
          completed: false,
          details: [
            "Forklar hvorfor sterke passord er viktige.",
            "Gi eksempler på hvordan man lager sterke passord som er lette å huske."
          ]
        }
      ]
    }
  ];
  
  export default exampleMeasures;