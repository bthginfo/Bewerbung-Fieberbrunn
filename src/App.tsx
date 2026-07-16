import { useEffect, useRef, useState } from 'react'

type Film = { title: string; category: string; poster: string; embed?: string; local?: string }

const films: Film[] = [
  { title: 'The Honourables · Golf & Business Cup', category: 'Outdoor · Community · Event', poster: '/media/films/the-honourables.jpg', embed: 'https://drive.google.com/file/d/1LH989Q6MOTSidqQZzisju0qqdQDrAwig/preview' },
  { title: 'Padle City · Imagefilm', category: 'Sport · Tempo · Community', poster: '/media/films/padle-city.jpg', embed: 'https://drive.google.com/file/d/1Nyh60q_YWGj521iGavPeOPj7iGZ5OSS1/preview' },
  { title: 'GRUBER.HAUS · Jungle Hut', category: 'Natur · Architektur · Geschichte', poster: '/media/films/gruber-jungle-hut.jpg', embed: 'https://www.youtube-nocookie.com/embed/rszFtLr1_GI' },
  { title: 'Griesmüller Stadtbrauerei', category: 'Ort · Menschen · Handwerk', poster: '/media/films/griesmueller.jpg', local: '/media/films/griesmueller.mp4' },
  { title: 'Shi Heng Yi · Shaolin Spirit', category: 'Sport · Gesundheit · Gespräch', poster: '/media/films/shaolin-spirit.jpg', embed: 'https://www.youtube-nocookie.com/embed/vLoTyZ7CVRw' },
  { title: 'Aston Martin × Hollfelder', category: 'Event · Detail · Lifestyle', poster: '/media/films/aston-hollfelder.jpg', embed: 'https://www.youtube-nocookie.com/embed/dhZtdIx6FDY' },
  { title: 'Dreissigacker · NFT Q&A', category: 'Interview · Editorial · Erklärung', poster: '/media/films/dreissigacker.jpg', embed: 'https://drive.google.com/file/d/1V71MyGOv4QmpbhjhJvD5v4rl_Lf6mhxN/preview' },
]

const experience = [
  ['03/2023—heute', 'Selbstständig · WYLDWORKS / marioschub.com', 'Content-Strategie sowie Foto- und Videoproduktion für 30+ Unternehmen: Idee, Planung, Kamera, Licht, Ton, Schnitt, Postproduktion und Ausspielung.'],
  ['seit 2023', 'Lehrbeauftragter · TH Ingolstadt', 'UX und Digital Photography; drei Semester und rund 100 Studierende.'],
  ['06/2023—02/2024', 'PMO Coordinator · in-tech', 'Prozesse, KPIs, Zeitpläne und Stakeholder-Abstimmung in einem Automotive-Projekt.'],
  ['04/2022—05/2023', 'Management Consultant · Achtzig20', 'Strategie, Workshops, digitale Produkte und Kundenberatung.'],
  ['02/2020—04/2022', 'Junior Consultant & Co-Lead Media · Achtzig20', 'Kreativteam von 2 auf 10+ mit aufgebaut; visuelle Konzepte, Produktionen, Rollouts und Co-Lead.'],
]

function Header() {
  return <header className="topbar">
    <a className="brand" href="/#top" aria-label="Zur Bewerbung von Mario Schubert"><span className="mountain-mark">▲</span><strong>Mario Schubert</strong><small>× Fieberbrunn</small></a>
    <nav aria-label="Hauptnavigation"><a href="/#arbeiten">Arbeiten</a><a href="/#erste-spur">Erste Spur</a><a href="/#profil">Profil</a></nav>
    <a className="mail-link" href="mailto:servus@marioschub.com">Kontakt <span>↗</span></a>
  </header>
}

function FilmLibrary() {
  const [active, setActive] = useState<Film | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (active && !dialog.open) {
      dialog.showModal()
      document.body.classList.add('dialog-open')
      requestAnimationFrame(() => closeRef.current?.focus())
    }
    if (!active && dialog.open) dialog.close()
  }, [active])

  const open = (film: Film, trigger: HTMLButtonElement) => { triggerRef.current = trigger; setActive(film) }
  const close = () => {
    setActive(null)
    document.body.classList.remove('dialog-open')
    setTimeout(() => triggerRef.current?.focus(), 0)
  }

  return <section className="films dark-section" id="arbeiten">
    <div className="section-cap"><span>01 / Arbeitsproben</span><p>Von Menschen, Orten und Momenten</p><i>1.645 m</i></div>
    <div className="film-feature">
      <button type="button" onClick={(e) => open(films[0], e.currentTarget)} aria-label={`${films[0].title} abspielen`}>
        <img src={films[0].poster} alt="Golfspieler auf einem Platz beim Honourables Golf & Business Cup" />
        <span className="film-play"><b>▶</b><small>Film ansehen</small></span>
      </button>
      <div><span>01 / Outdoor & Community</span><h2>Geschichten<br />brauchen <em>Nähe.</em></h2><p>Die Kamera ist nur der Anfang. Entscheidend ist, Situationen zu erkennen, Menschen Raum zu geben und aus dem Material eine Erzählung zu bauen, die im richtigen Kanal funktioniert.</p></div>
    </div>
    <div className="film-list">
      {films.slice(1).map((film, index) => <button type="button" key={film.title} onClick={(e) => open(film, e.currentTarget)} aria-label={`${film.title} abspielen`}>
        <span className="film-num">0{index + 2}</span><img src={film.poster} alt="" loading="lazy" /><span className="film-info"><strong>{film.title}</strong><small>{film.category}</small></span><span className="film-open">↗</span>
      </button>)}
    </div>
    <dialog ref={dialogRef} className="film-dialog" aria-label={active ? `Film: ${active.title}` : 'Filmplayer'} onCancel={(e) => { e.preventDefault(); close() }} onClick={(e) => { if (e.target === e.currentTarget) close() }}>
      {active && <div className="dialog-panel"><header><div><small>{active.category}</small><strong>{active.title}</strong></div><button ref={closeRef} type="button" onClick={close}>Schließen ×</button></header><div className="player">{active.local ? <video src={active.local} poster={active.poster} controls autoPlay playsInline /> : <iframe src={active.embed} title={active.title} allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />}</div></div>}
    </dialog>
  </section>
}

function Home() {
  return <>
    <a className="skip" href="#main">Zum Inhalt springen</a>
    <Header />
    <main id="main">
      <section className="hero" id="top">
        <figure className="hero-image"><img src="/media/sport/ski-05.jpg" alt="Skifahrer im Pulverschnee, fotografiert von Mario Schubert" /><figcaption>Powder & Progress · Foto: Mario Schubert / WYLDWORKS</figcaption></figure>
        <div className="topo" aria-hidden="true" />
        <div className="hero-ticket"><span>Persönliche Bewerbung</span><b>Content & Digital Marketing</b><small>Bergbahnen Fieberbrunn · 07/2026</small></div>
        <div className="hero-copy"><span className="coordinate">47° 28′ N / Söll in Tirol</span><h1>Vom Berg.<br /><em>In den Kopf.</em></h1><p>Der Berg liefert jeden Tag eine Geschichte. Ich sorge dafür, dass sie zur richtigen Zeit im richtigen Kanal ankommt.</p></div>
        <div className="altitude-rail" aria-hidden="true"><span>800</span><i /><span>2.118</span></div>
      </section>

      <section className="opening">
        <div className="section-cap"><span>00 / Ankommen</span><p>Warum Fieberbrunn</p><i>790 m</i></div>
        <div className="opening-grid"><h2>Liebes Team der<br />Bergbahnen Fieberbrunn,</h2><div><p>guter Content entsteht für mich nicht zwischen zwei Tabs. Er beginnt dort, wo etwas passiert: früh am Lift, auf der ersten Line, beim Gespräch mit dem Team oder mitten in einem Sommertag am Berg.</p><p>Ich möchte diese Momente eigenständig produzieren und danach in ein verlässliches digitales System übersetzen – für Website, Social Media und Kampagnen. Mein Hintergrund verbindet genau diese beiden Seiten: Bild und Bewegung aus eigener Hand, UX-Denken, Kampagnenstruktur und ein Blick für die Menschen hinter einer Marke.</p><a href="#arbeiten">Ausgewählte Arbeiten <span>↓</span></a></div></div>
      </section>

      <FilmLibrary />

      <section className="field-proof">
        <div className="section-cap"><span>02 / Im Feld</span><p>Winter und Sommer aus eigener Produktion</p><i>1.705 m</i></div>
        <div className="field-title"><h2>Mittendrin<br />statt nur<br /><em>daneben.</em></h2><p>Sport verlangt Aufmerksamkeit, Timing und schnelle Entscheidungen. Genau das reizt mich – bei einem Shoot ebenso wie bei der späteren Auswahl und Ausspielung.</p></div>
        <div className="season-collage">
          <figure className="ski-portrait"><img src="/media/sport/ski-02.jpg" alt="Porträt eines Skilehrers mit verspiegelter Skibrille" loading="lazy" /><figcaption>Powder & Progress · Winter</figcaption></figure>
          <figure className="paddle-wide"><img src="/media/sport/paddle-03.jpg" alt="Zwei Padelspieler nach einem Ballwechsel" loading="lazy" /><figcaption>Padle City · Sommer</figcaption></figure>
          <figure className="ski-motion"><img src="/media/sport/ski-03.jpg" alt="Skilehrer im Schnee mit Funkgerät" loading="lazy" /><figcaption>Menschen im Mittelpunkt</figcaption></figure>
          <figure className="paddle-detail"><img src="/media/sport/paddle-07.jpg" alt="Padelschläger und Ball als dynamische Detailaufnahme" loading="lazy" /><figcaption>Tempo im Detail</figcaption></figure>
          <p className="photo-credit">Fotografie: Mario Schubert / WYLDWORKS</p>
        </div>
      </section>

      <section className="fit dark-section">
        <div className="section-cap"><span>03 / Arbeitsweise</span><p>Draußen produzieren. Drinnen weiterdenken.</p><i>1.830 m</i></div>
        <div className="fit-head"><h2>Vier Perspektiven.<br /><em>Ein roter Faden.</em></h2><p>Ich arbeite gern eigenständig – und noch lieber mit Menschen, die ihr Wissen früh einbringen. So wird aus vielen Anforderungen eine klare Richtung.</p></div>
        <div className="fit-lines">
          <article><span>01</span><h3>Content im Gelände</h3><p>Von Idee und Drehplanung über Kamera, Licht und Ton bis zu Auswahl, Schnitt und Postproduktion.</p></article>
          <article><span>02</span><h3>Website mit Nutzwert</h3><p>Mein UX-Studium schärft den Blick für Wege, Inhalte und Funktionen, die beim Relaunch wirklich gebraucht werden.</p></article>
          <article><span>03</span><h3>Kampagnen im System</h3><p>Ein Kern, mehrere Kanäle: passende Einstiege, Formate und Rhythmen statt identischer Zuschnitte.</p></article>
          <article><span>04</span><h3>Partner an einem Tisch</h3><p>25+ Workshops und PMO-Erfahrung helfen, Timing, Abhängigkeiten und Qualitätsanspruch gemeinsam zu halten.</p></article>
        </div>
      </section>

      <section className="concept" id="erste-spur">
        <div className="section-cap"><span>04 / Formatidee</span><p>Eine Serie für Fieberbrunn</p><i>2.021 m</i></div>
        <div className="concept-head"><span>Content Franchise / Sommer + Winter</span><h2>ERSTE<br /><em>SPUR.</em></h2><p>Jeder Tag am Berg hat eine erste Geschichte. Ein Mensch, ein Moment und genau der Kontext, der Gästen wirklich etwas bringt.</p></div>
        <div className="concept-image"><figure><img src="/media/sport/ski-05.jpg" alt="Skifahrer zieht eine erste Spur durch frischen Schnee" loading="lazy" /><figcaption>Foto: Mario Schubert / WYLDWORKS</figcaption></figure><blockquote>„Noch ist die Bahn leer. Gleich wird aus Vorbereitung ein Bergerlebnis.“</blockquote></div>
        <div className="concept-body"><p>ERSTE SPUR. begleitet die Menschen, die einen Tag am Berg möglich machen: das Liftteam beim ersten Check, das Bike-Team vor der ersten Line, den Pistenretter vor Dienstbeginn oder eine Familie am Start ihres ersten gemeinsamen Wandertags. Nah, nützlich und ohne austauschbare Panorama-Routine.</p><p>Für den Website-Relaunch kann daraus ein aktuelles „Heute am Berg“-Fenster entstehen: kurze Geschichten, konkrete Hinweise und starke Bilder, die Social Media, Website und Kampagne miteinander verbinden.</p></div>
        <div className="content-route" aria-label="Ausspielungen des Formats Erste Spur">
          {[
            ['01', 'Hero Short', 'Der komplette Moment in 45–90 Sekunden.'],
            ['02', 'Verticals', 'Hook, Person und Detail als eigene Kapitel.'],
            ['03', 'Heute am Berg', 'Aktuelle Story und nützlicher Kontext auf der Website.'],
            ['04', 'Stills & Grafik', 'Bildset für Feed, Stories, Screens und Partner.'],
            ['05', 'Newsletter & Paid', 'Saisonaler Einstieg mit einem echten Gesicht.'],
            ['06', 'Archiv', 'Verschlagwortete Motive für den nächsten Winter und Sommer.'],
          ].map(([no, title, text]) => <article key={no}><span>{no}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="seasons">
        <figure><img src="/media/sport/paddle-02.jpg" alt="Dynamischer Ballwechsel auf dem Padel-Court, fotografiert von Mario Schubert" loading="lazy" /><figcaption>Padle City · Foto: Mario Schubert / WYLDWORKS</figcaption></figure>
        <div className="season-copy"><span>05 / Jahreslauf</span><h2>Ein Berg.<br />Zwei Saisons.<br /><em>Viele Anlässe.</em></h2><p>Das System bleibt stabil, die Geschichten wechseln. Im Winter geht es um Bedingungen, Menschen und Timing. Im Sommer um Wege, Bewegung und das Draußensein. Website, Social und Partnerkommunikation bekommen jeweils die Perspektive, die sie brauchen.</p><div className="season-axis"><span>Winter</span><i /><span>Sommer</span></div></div>
      </section>

      <section className="proof" id="profil">
        <div className="section-cap"><span>06 / Profil</span><p>Erfahrung mit Bodenhaftung</p><i>1.283 m</i></div>
        <div className="proof-head"><h2>Ideen machen.<br />Menschen mitnehmen.<br /><em>Qualität halten.</em></h2><div><p>Seit 2023 verantworte ich Produktionen für mehr als 30 Unternehmen. Zuvor habe ich bei Achtzig20 ein Kreativteam von zwei auf über zehn Mitarbeitende mit aufgebaut und im Co-Lead begleitet.</p><a href="/cv">Lebenslauf ansehen <span>↗</span></a></div></div>
        <div className="numbers"><article><strong>30+</strong><p>Unternehmen seit 2023</p></article><article><strong>2→10+</strong><p>Kreativteam mit aufgebaut</p></article><article><strong>25+</strong><p>Workshops moderiert</p></article><article><strong>≈100</strong><p>UX-Studierende begleitet</p></article></div>
        <div className="portrait"><figure><img src="/media/mario-contact.jpg" alt="Porträt von Mario Schubert" loading="lazy" /></figure><div><span>Mario Schubert · Söll in Tirol</span><blockquote>„Ich mag Arbeit, bei der man am Ende nicht nur etwas veröffentlicht, sondern vorher wirklich etwas erlebt und verstanden hat.“</blockquote><p>Konzept · Foto · Kamera · Schnitt · Postproduktion · UX · Grafik · Kampagnen · Workshop</p></div></div>
      </section>

      <section className="contact">
        <span>Nächste Station / Gespräch</span><h2>Dann sehen wir uns<br /><em>am Berg.</em></h2><div className="contact-grid"><a href="mailto:servus@marioschub.com"><small>Mail</small><strong>servus@marioschub.com</strong><span>↗</span></a><a href="tel:+4915155338029"><small>Telefon</small><strong>+49 1515 5338029</strong><span>↗</span></a><a href="/cv"><small>Dokument</small><strong>Lebenslauf</strong><span>↗</span></a><a href="/anschreiben"><small>Dokument</small><strong>Anschreiben</strong><span>↗</span></a></div>
      </section>
    </main>
    <footer className="footer"><span>Persönliche Bewerbung von Mario Schubert</span><span>Söll in Tirol · 07/2026</span></footer>
  </>
}

function DocControls({ current }: { current: 'cv' | 'letter' }) {
  return <nav className="doc-controls" aria-label="Dokumentnavigation"><a href="/">← Zur Bewerbung</a>{current === 'cv' ? <a href="/anschreiben">Anschreiben</a> : <a href="/cv">Lebenslauf</a>}<a className="doc-download" href={current === 'cv' ? '/documents/Mario_Schubert_CV_Fieberbrunn.pdf' : '/documents/Mario_Schubert_Anschreiben_Fieberbrunn.pdf'} download>PDF laden ↓</a><button type="button" onClick={() => window.print()}>Drucken</button></nav>
}

function CV() {
  return <main className="document-page"><DocControls current="cv" /><article className="cv-sheet">
    <header className="cv-header"><div><span>Curriculum Vitae · 07/2026</span><h1>Mario<br />Schubert</h1><p>Content · Digital · Foto & Film</p></div><img src="/media/mario-contact.jpg" alt="Mario Schubert" /></header>
    <a className="online-cta" href="https://mario-schubert-fieberbrunn.vercel.app"><span><small>Die Arbeit hinter den Stationen</small><strong>Filme, Formatidee und Arbeitsweise in der digitalen Bewerbung</strong></span><span className="online-url">mario-schubert-fieberbrunn.vercel.app <b>↗</b></span></a>
    <section className="cv-summary"><p>Ich verbinde eigenständige Content-Produktion mit UX-Denken und der Struktur, die Website, Social Media und Kampagnen zusammenhält.</p><dl><div><dt>Basis</dt><dd>Söll in Tirol</dd></div><div><dt>Geboren</dt><dd>31.12.1995</dd></div><div><dt>Kontakt</dt><dd><a href="mailto:servus@marioschub.com">servus@marioschub.com</a><br /><a href="tel:+4915155338029">+49 1515 5338029</a></dd></div></dl></section>
    <section className="cv-block"><h2>Berufserfahrung</h2><div className="timeline">{experience.map(([date, role, text]) => <article key={role}><span>{date}</span><div><h3>{role}</h3><p>{text}</p></div></article>)}</div></section>
    <div className="cv-columns">
      <section className="cv-block"><h2>Ausbildung</h2><article className="plain"><span>10/2018—2023</span><h3>B.Sc. User Experience Design</h3><p>Technische Hochschule Ingolstadt</p></article></section>
      <section className="cv-block"><h2>Schwerpunkte & Tools</h2><p>Content-Konzept · Foto · Kamera · Licht · Ton · Schnitt · Postproduktion · Storytelling · UX · Grafik · Kampagnen · Moderation</p><p>Final Cut Pro · After Effects · Adobe Premiere Pro · Lightroom · Photoshop</p></section>
      <section className="cv-block"><h2>Sprachen</h2><dl className="languages"><div><dt>Deutsch</dt><dd>Muttersprache</dd></div><div><dt>Englisch</dt><dd>C1</dd></div><div><dt>Französisch</dt><dd>B1</dd></div></dl></section>
    </div>
    <footer className="document-footer"><a href="mailto:servus@marioschub.com">servus@marioschub.com</a><a href="tel:+4915155338029">+49 1515 5338029</a><span>Söll in Tirol · 07/2026</span></footer>
  </article></main>
}

function CoverLetter() {
  return <main className="document-page letter-page"><DocControls current="letter" /><article className="letter-sheet">
    <header className="letter-header"><div><span>Mario Schubert × Bergbahnen Fieberbrunn</span><strong>Bewerbung · 07/2026</strong></div><aside><a href="mailto:servus@marioschub.com">servus@marioschub.com</a><a href="tel:+4915155338029">+49 1515 5338029</a><span>Söll in Tirol</span></aside></header>
    <div className="letter-heading"><span>Content & Digital<br />Marketing</span><h1>Vom Berg in<br /><em>die richtigen Kanäle.</em></h1></div>
    <div className="letter-body">
      <p>Sehr geehrter Herr Heistracher,</p>
      <p>die ausgeschriebene Position verbindet genau die Arbeit, die mich reizt: draußen Inhalte selbst zu produzieren und daraus ein verlässliches System für Website, Social Media und Kampagnen zu entwickeln. Diese Verbindung aus Bild, Bewegung, digitalem Denken und guter Koordination möchte ich bei den Bergbahnen Fieberbrunn einbringen.</p>
      <p>Seit 2023 begleite ich mit WYLDWORKS Produktionen für mehr als 30 Unternehmen – von der Idee und Drehplanung über Foto, Kamera, Licht und Ton bis zu Schnitt, Postproduktion und Ausspielung. Ich arbeite eigenständig, treffe gestalterische Entscheidungen früh und denke schon bei der Aufnahme mit, was ein Motiv später im Feed, auf einer Website oder in einer Kampagne leisten muss.</p>
      <p>Zuvor habe ich bei Achtzig20 ein Kreativteam von zwei auf mehr als zehn Mitarbeitende mit aufgebaut und im Co-Lead begleitet. Workshops, Kundenprojekte und meine PMO-Erfahrung haben mir gezeigt, wie man unterschiedliche Perspektiven zusammenführt, Timings hält und Qualität auch in wiederkehrenden Produktionen sichert.</p>
      <p>Mein Studium in User Experience Design ist für den anstehenden Website-Relaunch ein zusätzlicher Blickwinkel: Inhalte sollen nicht nur gut aussehen, sondern Orientierung geben, Fragen beantworten und Menschen zum nächsten sinnvollen Schritt führen. Genau das möchte ich gemeinsam mit dem Team und den Partnern im Skicircus, bei ALPIN CARD und im Tourismus weiterentwickeln.</p>
      <p>Dass die Arbeit zwischen Büro und Berg, zwischen Winter und Sommer wechselt, passt sehr gut zu mir. Mit Basis in Söll bin ich nah dran; ein Einstieg ist ab sofort möglich.</p>
      <p>Filme, eine konkrete Formatidee für Fieberbrunn und meinen Lebenslauf finden Sie in meiner digitalen Bewerbung:<br /><a href="https://mario-schubert-fieberbrunn.vercel.app">mario-schubert-fieberbrunn.vercel.app</a></p>
      <p>Ich freue mich darauf, Ihnen meine Arbeitsweise persönlich vorzustellen.</p>
      <p className="signoff">Mit freundlichen Grüßen<br /><strong>Mario Schubert</strong></p>
    </div>
    <footer className="letter-footer"><a href="https://mario-schubert-fieberbrunn.vercel.app">Digitale Bewerbung ↗</a><a href="mailto:servus@marioschub.com">servus@marioschub.com</a><a href="tel:+4915155338029">+49 1515 5338029</a></footer>
  </article></main>
}

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '')
  if (path === '/cv') return <CV />
  if (path === '/anschreiben') return <CoverLetter />
  return <Home />
}
