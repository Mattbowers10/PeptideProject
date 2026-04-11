const BASE_STYLE = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  max-width: 600px;
  margin: 0 auto;
  background: #ffffff;
`

const FOOTER_HTML = `
  <div style="border-top: 1px solid #f0f0f0; margin-top: 40px; padding-top: 24px; color: #999; font-size: 12px; line-height: 1.6;">
    <p style="margin: 0;">Peptide Wiki · Research-first peptide encyclopedia</p>
    <p style="margin: 4px 0 0;">You're receiving this because you subscribed at peptidewiki.com.</p>
    <p style="margin: 4px 0 0;"><a href="{{UNSUBSCRIBE_URL}}" style="color: #999;">Unsubscribe</a></p>
  </div>
`

export function welcomeEmail(opts: { name?: string; downloadUrl?: string }): { subject: string; html: string } {
  const greeting = opts.name ? `Hi ${opts.name}` : 'Welcome'
  return {
    subject: 'Your free research guide is ready — Peptide Wiki',
    html: `
<div style="${BASE_STYLE}">
  <div style="padding: 40px 40px 0;">
    <p style="font-size: 12px; letter-spacing: 0.08em; color: #9d96ff; text-transform: uppercase; margin: 0 0 24px;">PEPTIDE WIKI</p>
    <h1 style="font-size: 28px; font-weight: 600; color: #010120; letter-spacing: -0.02em; line-height: 1.2; margin: 0 0 16px;">${greeting} — your guide is ready.</h1>
    <p style="font-size: 15px; line-height: 1.7; color: #555; margin: 0 0 24px;">
      Thanks for joining Peptide Wiki. Your free research guide — <strong>10 Most Researched Peptides</strong> — is ready to read.
    </p>
    <a href="${opts.downloadUrl ?? 'https://peptidewiki.com/guide'}"
       style="display: inline-block; background: #010120; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 14px; font-weight: 500; margin-bottom: 32px;">
      Read the Guide →
    </a>
    <div style="background: #f8f9ff; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
      <p style="font-size: 13px; color: #666; margin: 0 0 12px; font-weight: 500;">What you get with a free account:</p>
      <ul style="font-size: 13px; color: #666; margin: 0; padding-left: 20px; line-height: 1.8;">
        <li>Summaries for 100+ peptide compounds</li>
        <li>Research status badges (preclinical → approved)</li>
        <li>Category browsing and Cmd+K search</li>
        <li>Weekly research digest (when you're ready)</li>
      </ul>
    </div>
    <p style="font-size: 14px; color: #666; line-height: 1.7;">
      When you're ready to go deeper, the <strong>Researcher plan ($12/mo)</strong> unlocks full mechanism profiles, pharmacokinetics, PubMed study links, and evidence ratings.
    </p>
    <a href="https://peptidewiki.com/upgrade"
       style="display: inline-block; border: 1px solid #e0e0e0; color: #333; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-size: 13px; margin-top: 12px;">
      See plans →
    </a>
  </div>
  <div style="padding: 0 40px 40px;">
    ${FOOTER_HTML.replace('{{UNSUBSCRIBE_URL}}', 'https://peptidewiki.com/unsubscribe')}
  </div>
</div>
    `.trim(),
  }
}

export function weeklyDigestEmail(opts: {
  articles: { title: string; url: string; excerpt?: string; category: string }[]
  peptides: { name: string; url: string; status?: string }[]
  weekOf: string
}): { subject: string; html: string } {
  const articleItems = opts.articles.map(a => `
    <div style="border-bottom: 1px solid #f5f5f5; padding: 16px 0;">
      <p style="margin: 0 0 4px; font-size: 11px; color: #9d96ff; letter-spacing: 0.06em; text-transform: uppercase;">${a.category}</p>
      <a href="${a.url}" style="font-size: 15px; font-weight: 500; color: #010120; text-decoration: none;">${a.title}</a>
      ${a.excerpt ? `<p style="margin: 6px 0 0; font-size: 13px; color: #777; line-height: 1.6;">${a.excerpt}</p>` : ''}
    </div>
  `).join('')

  const peptideItems = opts.peptides.map(p => `
    <a href="${p.url}" style="display: inline-block; border: 1px solid #eee; border-radius: 4px; padding: 6px 12px; margin: 4px; font-size: 13px; color: #444; text-decoration: none;">
      ${p.name}${p.status ? ` <span style="color: #999; font-size: 11px;">(${p.status})</span>` : ''}
    </a>
  `).join('')

  return {
    subject: `Peptide Wiki Weekly — ${opts.weekOf}`,
    html: `
<div style="${BASE_STYLE}">
  <div style="padding: 40px 40px 0;">
    <p style="font-size: 12px; letter-spacing: 0.08em; color: #9d96ff; text-transform: uppercase; margin: 0 0 8px;">PEPTIDE WIKI</p>
    <h1 style="font-size: 24px; font-weight: 600; color: #010120; letter-spacing: -0.02em; margin: 0 0 4px;">Weekly Research Digest</h1>
    <p style="font-size: 13px; color: #999; margin: 0 0 32px;">${opts.weekOf}</p>

    ${opts.articles.length > 0 ? `
    <h2 style="font-size: 14px; font-weight: 600; color: #333; letter-spacing: 0.04em; text-transform: uppercase; margin: 0 0 8px;">Research Articles</h2>
    ${articleItems}
    ` : ''}

    ${opts.peptides.length > 0 ? `
    <div style="margin-top: 28px;">
      <h2 style="font-size: 14px; font-weight: 600; color: #333; letter-spacing: 0.04em; text-transform: uppercase; margin: 0 0 12px;">Compounds to Explore</h2>
      <div>${peptideItems}</div>
    </div>
    ` : ''}

    <div style="margin-top: 32px; background: #f8f9ff; border-radius: 8px; padding: 20px;">
      <p style="font-size: 13px; color: #555; margin: 0 0 12px;">Unlock deeper profiles with Researcher ($12/mo)</p>
      <a href="https://peptidewiki.com/upgrade" style="display: inline-block; background: #010120; color: white; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-size: 13px;">View plans →</a>
    </div>
  </div>
  <div style="padding: 0 40px 40px;">
    ${FOOTER_HTML.replace('{{UNSUBSCRIBE_URL}}', 'https://peptidewiki.com/unsubscribe')}
  </div>
</div>
    `.trim(),
  }
}
