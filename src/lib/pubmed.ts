/**
 * PubMed E-Utilities API client
 * Docs: https://www.ncbi.nlm.nih.gov/books/NBK25499/
 *
 * Rate limits: 3 req/sec without API key, 10 req/sec with NCBI_API_KEY
 */

const BASE_URL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils'
const API_KEY = process.env.NCBI_API_KEY ? `&api_key=${process.env.NCBI_API_KEY}` : ''

export interface PubMedArticle {
  pubmedId: string
  title: string
  abstract: string
  authors: { name: string }[]
  journal: string
  publishedDate: string
  doi: string | null
  url: string
}

/** Search PubMed for a query, return up to maxResults PMIDs */
export async function searchPubMed(query: string, maxResults = 20): Promise<string[]> {
  const encoded = encodeURIComponent(query)
  const url = `${BASE_URL}/esearch.fcgi?db=pubmed&term=${encoded}&retmax=${maxResults}&retmode=json${API_KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`PubMed search failed: ${res.status}`)
  const data = await res.json()
  return data.esearchresult?.idlist ?? []
}

/** Fetch article details for a list of PMIDs */
export async function fetchArticles(pmids: string[]): Promise<PubMedArticle[]> {
  if (pmids.length === 0) return []
  const ids = pmids.join(',')
  const url = `${BASE_URL}/efetch.fcgi?db=pubmed&id=${ids}&rettype=abstract&retmode=xml${API_KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`PubMed fetch failed: ${res.status}`)

  const xml = await res.text()
  return parseArticlesXml(xml)
}

/** Minimal XML parser for PubMed efetch response */
function parseArticlesXml(xml: string): PubMedArticle[] {
  const articles: PubMedArticle[] = []

  // Split into individual PubmedArticle blocks
  const articleBlocks = xml.match(/<PubmedArticle>[\s\S]*?<\/PubmedArticle>/g) ?? []

  for (const block of articleBlocks) {
    const pmid = extractFirst(block, 'PMID')
    const title = extractFirst(block, 'ArticleTitle')
    const abstract = extractFirst(block, 'AbstractText')
    const journal = extractFirst(block, 'ISOAbbreviation') ?? extractFirst(block, 'Title')
    const doi = extractDoi(block)

    // Authors
    const authorNames = block.match(/<LastName>([^<]+)<\/LastName>/g) ?? []
    const firstNames = block.match(/<ForeName>([^<]+)<\/ForeName>/g) ?? []
    const authors = authorNames.map((ln, i) => ({
      name: `${firstNames[i]?.replace(/<\/?ForeName>/g, '') ?? ''} ${ln.replace(/<\/?LastName>/g, '')}`.trim(),
    }))

    // Date
    const year = extractFirst(block, 'Year') ?? ''
    const month = extractFirst(block, 'Month') ?? '01'
    const day = extractFirst(block, 'Day') ?? '01'
    const publishedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`

    if (pmid) {
      articles.push({
        pubmedId: pmid,
        title: stripTags(title ?? ''),
        abstract: stripTags(abstract ?? ''),
        authors,
        journal: stripTags(journal ?? ''),
        publishedDate,
        doi,
        url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
      })
    }
  }

  return articles
}

function extractFirst(xml: string, tag: string): string | null {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`))
  return match ? match[1] : null
}

function extractDoi(xml: string): string | null {
  const match = xml.match(/<ArticleId IdType="doi">([^<]+)<\/ArticleId>/)
  return match ? match[1] : null
}

function stripTags(str: string): string {
  return str.replace(/<[^>]+>/g, '').trim()
}
