import { islands, profile, projects } from '../content/portfolio.ts';
import { escapeHtml as escape, safeLink } from '../core/navigation.ts';
import type { Project } from '../core/types.ts';

function profileLink(label: string, className = ''): string {
  const url = safeLink(profile.github);
  return url
    ? `<a class="${className}" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(label)}</a>`
    : '<span class="small-note">GitHub profile unavailable</span>';
}

export function projectCard(project: Project): string {
  const island = islands.find((entry) => entry.id === project.island)!;
  return `<article class="project-card" style="--island-color:${escape(island.color)}"><div class="project-card-top"><span class="eyebrow">${escape(island.number)} / ${escape(island.name)}</span><span class="status-tag">${escape(project.status)}</span></div><h3>${escape(project.title)}</h3><p>${escape(project.summary)}</p><ul class="tags" aria-label="Technologies">${project.tags.map((tag) => `<li>${escape(tag)}</li>`).join('')}</ul><button class="project-open" data-project="${escape(project.id)}">${project.demo ? 'Open case study & demo' : 'Read concept study'} <span aria-hidden="true">↗</span></button></article>`;
}

export function renderShell(): string {
  return `
    <a class="skip-link" href="#collection">Skip to projects</a>
    <header class="site-header">
      <a class="wordmark" href="#view=explore" aria-label="Archipelago home"><svg viewBox="0 0 36 36" aria-hidden="true"><path d="m3 27 12-22 10 16 6-5 4 15H1Z" fill="currentColor"/></svg><span>ARCHIPELAGO<small>A SMALL WORLD BY DLIFE</small></span></a>
      <nav aria-label="Portfolio views" class="view-switch"><button data-view="explore" aria-pressed="true">Explore <span aria-hidden="true">↗</span></button><button data-view="quick" aria-pressed="false">Quick View <span aria-hidden="true">☷</span></button></nav>
      <div class="header-links"><button class="text-button" data-about>About</button>${profileLink('GitHub ↗')}</div>
    </header>
    <main id="main-content">
      <section class="explore-hero" aria-labelledby="hero-title">
        <div class="hero-copy"><p class="eyebrow"><span class="live-dot"></span> PERSONAL WORLD / VOL. 001</p><h1 id="hero-title">A small world.<br />A <em>curious</em> mind.</h1><p class="hero-description">Systems that connect. Ideas you can play with. Places worth remembering.</p><p class="hero-note">Welcome to my little corner of the internet.<br />Pick an island. See what I've been making.</p><div class="hero-actions"><button class="button button-primary" data-start>Start exploring <span aria-hidden="true">↗</span></button><button class="text-button" data-view="quick">Just the projects →</button></div><div class="hero-footnote"><span class="coordinate-icon" aria-hidden="true">✳</span><span>Four islands. A few experiments.<br />Always a work in progress.</span></div></div>
        <div class="world-wrap"><div class="world-meta"><span class="eyebrow">THE EXPLORER'S ATLAS</span><span class="eyebrow">01 — 04</span></div><div class="world-stage is-map" id="world-stage"><canvas id="world-canvas" aria-hidden="true"></canvas><div class="fallback-sea" aria-hidden="true"></div>${islands.map((island) => `<button class="island-label label-${island.id}" data-island="${island.id}" aria-pressed="false" style="--island-color:${escape(island.color)}"><span class="fallback-miniature" aria-hidden="true"><span></span></span><span class="label-caption"><span class="label-dot"></span>${escape(island.name)}<small>${escape(island.number)} ↗</small></span></button>`).join('')}<span class="map-compass" aria-hidden="true">N<br /><span>↟</span></span><p class="map-note" id="map-note">CLICK AN ISLAND TO TRAVEL</p></div><div class="world-footer"><span><span class="live-dot"></span> NO PASSPORT REQUIRED</span><button class="text-button" data-overview>Reset view ↺</button></div></div>
      </section>
      <section class="quick-intro" hidden><p class="eyebrow">THE DIRECT ROUTE / PROJECT INDEX</p><h1>Curiosity, <em>collected.</em></h1><p>Projects, playable ideas, and the thinking behind them. All in one place.</p></section>
      <section class="island-directory" aria-label="Choose an island">${islands.map((island) => `<button class="island-card" data-island="${island.id}" aria-pressed="false" style="--island-color:${escape(island.color)}"><span class="island-card-top"><span>${escape(island.number)} / ISLAND</span><span aria-hidden="true">↗</span></span><strong>${escape(island.name)}</strong><span>${escape(island.subtitle)}</span><i aria-hidden="true"></i></button>`).join('')}</section>
      <section class="collection" id="collection" aria-labelledby="collection-title"><div class="section-header"><div><p class="eyebrow" id="collection-eyebrow">A FEW THINGS FROM MY WORLD</p><h2 id="collection-title">Choose your next stop.</h2><p id="collection-description">A little engineering, a little play, a little life.</p></div><button class="text-button" data-all>View all projects <span aria-hidden="true">↗</span></button></div><div class="project-grid" id="project-grid">${projects.map(projectCard).join('')}</div><p class="content-disclosure">Portfolio prototype · Working demos and labelled sample concepts. Real project evidence and personal photographs can be added as the collection grows.</p></section>
      <section class="closing-note"><span class="eyebrow">BUILT WITH INTENTION</span><p>The interesting things happen<br />where disciplines <em>meet.</em></p>${profileLink('Follow the work on GitHub ↗', 'text-button')}</section>
    </main>
    <footer class="site-footer"><span>© ${new Date().getFullYear()} ${escape(profile.name)} / ARCHIPELAGO</span><span>A personal world, forever in progress.</span><button class="text-button" id="motion-toggle" aria-pressed="true">Motion on</button></footer>
    <p class="sr-only" id="announcer" role="status" aria-live="polite"></p>
    <dialog id="project-dialog" aria-labelledby="project-title"><div class="dialog-top"><span class="eyebrow">FIELD NOTES / PROJECT DETAIL</span><button class="close-button" data-close aria-label="Close project">✕</button></div><div id="project-content"></div></dialog>
    <dialog id="about-dialog" aria-labelledby="about-title"><div class="dialog-top"><span class="eyebrow">ABOUT THIS LITTLE WORLD</span><button class="close-button" data-close aria-label="Close about">✕</button></div><div class="about-content"><h2 id="about-title">Hi, I'm ${escape(profile.name)}.</h2><p>${escape(profile.introduction)}</p><p>Archipelago brings those interests together in a miniature world. Systems, Playground, Memory, and Experiment are different doors into the same curiosity.</p><p>You can jump between islands or use Quick View to get straight to the work. Everything is reachable by keyboard. On smaller screens, the atlas becomes a simple illustrated map.</p><p class="small-note">This first edition contains local working demos and clearly marked concept content. The layered landscape is original illustration, awaiting personal photography.</p>${profileLink('Find me on GitHub ↗', 'button')}</div></dialog>
  `;
}
