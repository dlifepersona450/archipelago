import { islands } from '../content/portfolio.ts';
import { escapeHtml as escape, safeLink } from '../core/navigation.ts';
import type { Project } from '../core/types.ts';

export function renderProjectDetail(project: Project): string {
  const island = islands.find((entry) => entry.id === project.island)!;
  const source = project.source ? safeLink(project.source) : null;
  return `<header class="project-heading"><p class="eyebrow">${island.number} / ${escape(island.name)} Island · ${escape(project.status)}</p><h2 id="project-title">${escape(project.title)}</h2><p>${escape(project.summary)}</p><ul class="tags">${project.tags.map((tag) => `<li>${escape(tag)}</li>`).join('')}</ul></header>${project.demo ? '<section class="demo-container" id="demo-container" aria-label="Interactive project demo"><p role="status">Preparing the experiment…</p></section>' : ''}<div class="case-study"><section><h3>The question</h3><p>${escape(project.problem)}</p></section><section><h3>The approach</h3><p>${escape(project.approach)}</p></section><section><h3>What exists today</h3><p>${escape(project.outcome)}</p></section></div>${source ? `<a class="button" href="${escape(source)}" target="_blank" rel="noopener noreferrer">View project source ↗</a>` : '<p class="small-note source-note">A dedicated public source link has not been added for this item.</p>'}`;
}
