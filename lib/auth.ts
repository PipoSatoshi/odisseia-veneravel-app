import { SupabaseClient, User } from '@supabase/supabase-js';

export const ERROR_PROFILE_NOT_FOUND = 'PROFILE_NOT_FOUND';
export const ERROR_PROFILE_FETCH = 'PROFILE_FETCH_ERROR';
export const ERROR_INVALID_PHONE = 'INVALID_PHONE';

// Função para obter o perfil do utilizador atual com tratamento de erros explícito
export async function getCurrentRole(supabase: SupabaseClient): Promise<'driver' | 'admin'> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error(ERROR_PROFILE_FETCH);
  }
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (error || !profile) {
    console.error('Error fetching profile or profile not found for user:', user.id);
    throw new Error(ERROR_PROFILE_NOT_FOUND);
  }

  if (profile.role !== 'admin' && profile.role !== 'driver') {
    throw new Error(ERROR_PROFILE_NOT_FOUND);
  }
  
  return profile.role;
}

// Normaliza o número de telemóvel para o formato E.164
export function normalizePhone(phone: string): string {
  let normalized = phone.replace(/\s+/g, ''); // Remove espaços

  if (normalized.startsWith('00')) {
    normalized = '+' + normalized.substring(2);
  }

  // Converte número PT de 9 dígitos para +351
  if (normalized.length === 9 && /^[9][1236]\d{7}$/.test(normalized)) {
    return '+351' + normalized;
  }
  
  // Validação básica E.164
  if (!/^\+[1-9]\d{1,14}$/.test(normalized)) {
    throw new Error(ERROR_INVALID_PHONE);
  }
  
  return normalized;
}