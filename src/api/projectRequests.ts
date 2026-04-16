import { supabase } from '../utils/supabaseClient'

export type TemplateQuestionnaireAnswers = {
  contactNumber: string
  existingWebsite: string | null
  domainSetup: 'already-have' | 'need-provided'
  hostingSetup: 'own-hosting' | 'included-hosting'
  businessEmailSetup: 'need-veltrix' | 'will-provide' | 'not-needed'
  updatesPreference: 'managed-by-veltrix' | 'self-managed'
  packageInterest: 'professional' | 'starter' | 'standard' | 'ultimate'
  logoBrandingReady: 'ready' | 'need-help'
  brandAssetsNote: string | null
  briefBusinessDescription: string
  referenceWebsites: string | null
  additionalRequests: string
}

export type ProjectRequestInsert = {
  categoryId: string
  categoryName: string
  templateId: string
  templateName: string
  clientName: string
  clientEmail: string
  businessType: string
  budgetRange: string | null
  timeline: string | null
  projectDescription: string
  questionnaireAnswers: TemplateQuestionnaireAnswers
}

export async function insertProjectRequest(input: ProjectRequestInsert) {
  const { error } = await supabase.from('template_project_requests').insert({
    category_id: input.categoryId,
    category_name: input.categoryName,
    template_id: input.templateId,
    template_name: input.templateName,
    client_name: input.clientName,
    client_email: input.clientEmail,
    business_type: input.businessType,
    budget_range: input.budgetRange,
    timeline: input.timeline,
    project_description: input.projectDescription,
    questionnaire_answers: input.questionnaireAnswers,
  })

  if (error) throw error
}

export type ProjectRequestRow = {
  id: string
  client_name: string
  client_email: string
  business_type: string
  budget_range: string | null
  timeline: string | null
  project_description: string
  category_name: string
  template_name: string
  created_at: string
  questionnaire_answers: TemplateQuestionnaireAnswers | null
}

export async function listProjectRequests(limit = 100) {
  const { data, error } = await supabase
    .from('template_project_requests')
    .select(
      [
        'id',
        'client_name',
        'client_email',
        'business_type',
        'budget_range',
        'timeline',
        'project_description',
        'template_name',
        'category_name',
        'created_at',
        'questionnaire_answers',
      ].join(',')
    )
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return (data ?? []) as unknown as ProjectRequestRow[]
}
