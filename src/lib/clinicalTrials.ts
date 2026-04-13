export interface ClinicalTrial {
  nctId: string
  title: string
  status: string
  phases: string[]
  conditions: string[]
  sponsor: string
  startDate: string | null
  completionDate: string | null
  url: string
}

const SEARCH_TERMS = [
  '"semaglutide"', '"tirzepatide"', '"retatrutide"',
  '"BPC-157"', '"ipamorelin"', '"CJC-1295"', '"tesamorelin"',
  '"bremelanotide"', '"thymosin alpha"', '"thymosin beta"',
  '"epithalon"', '"MOTS-c"', '"elamipretide"', '"SS-31"',
]

export async function fetchActiveClinicalTrials(limit = 8): Promise<ClinicalTrial[]> {
  try {
    const params = new URLSearchParams({
      'query.term': SEARCH_TERMS.join(' OR '),
      'filter.overallStatus': 'RECRUITING,ACTIVE_NOT_RECRUITING,NOT_YET_RECRUITING',
      'pageSize': String(limit),
      'sort': '@relevance',
    })

    const res = await fetch(
      `https://clinicaltrials.gov/api/v2/studies?${params}`,
      { next: { revalidate: 3600 } },
    )
    if (!res.ok) return []

    const data = await res.json()
    return (data.studies ?? []).map((s: Record<string, unknown>) => {
      const p = s.protocolSection as Record<string, any>
      return {
        nctId:           p.identificationModule?.nctId ?? '',
        title:           p.identificationModule?.briefTitle ?? '',
        status:          p.statusModule?.overallStatus ?? '',
        phases:          p.designModule?.phases ?? [],
        conditions:      p.conditionsModule?.conditions ?? [],
        sponsor:         p.sponsorCollaboratorsModule?.leadSponsor?.name ?? '',
        startDate:       p.statusModule?.startDateStruct?.date ?? null,
        completionDate:  p.statusModule?.primaryCompletionDateStruct?.date ?? null,
        url:             `https://clinicaltrials.gov/study/${p.identificationModule?.nctId ?? ''}`,
      }
    })
  } catch {
    return []
  }
}
