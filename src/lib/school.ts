export const SCHOOL_NAME = "Escola Profissional Raul Dória";
export const SCHOOL_SHORT = "EPRD";
export const SCHOOL_CITY = "Porto";
export const SCHOOL_URL = "https://rauldoria.pt";
export const SCHOOL_SITE_LABEL = "rauldoria.pt";

export function schoolLabel(name: string): string {
  const trimmed = name.trim();
  return trimmed.length > 0 ? trimmed : SCHOOL_NAME;
}
