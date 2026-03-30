import { supabase } from '../utils/supabaseClient'

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
  })

  if (error) throw error
}

