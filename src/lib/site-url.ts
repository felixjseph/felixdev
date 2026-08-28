const localhostFallback = "http://localhost:3000";

function getSiteUrl(value = process.env.NEXT_PUBLIC_SITE_URL): URL {
  if (!value) return new URL(localhostFallback);

  try {
    const url = new URL(value);
    if (
      (url.protocol !== "http:" && url.protocol !== "https:") ||
      !url.hostname ||
      url.username ||
      url.password
    ) {
      return new URL(localhostFallback);
    }

    return url;
  } catch {
    return new URL(localhostFallback);
  }
}

export const siteUrl = getSiteUrl();
export const siteOrigin = siteUrl.origin;
