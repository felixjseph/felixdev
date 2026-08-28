export const INTRO_VERSION = "1";
export const INTRO_STORAGE_KEY = "felixdev-intro-v1";

export function shouldPlayIntro(
  seenVersion: string | null,
  reducedMotion: boolean,
): boolean {
  return !reducedMotion && seenVersion !== INTRO_VERSION;
}
