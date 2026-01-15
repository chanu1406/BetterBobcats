/**
 * Email normalization and validation utilities
 * Used for club request forms to ensure clean, deduplicated email lists
 */

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

/**
 * Normalize a single email address
 * - Trims whitespace
 * - Converts to lowercase
 * - Returns empty string if invalid
 */
export function normalizeEmail(email: string): string {
  if (!email || typeof email !== "string") {
    return "";
  }
  const trimmed = email.trim();
  if (!trimmed || !EMAIL_REGEX.test(trimmed)) {
    return "";
  }
  return trimmed.toLowerCase();
}

/**
 * Normalize and deduplicate an array of emails
 * - Normalizes each email
 * - Removes empty/invalid emails
 * - Removes duplicates (case-insensitive)
 * - Removes contact_email from the list if provided
 * - Preserves original order (stable unique)
 */
export function normalizeEmailList(
  emails: string[],
  contactEmail?: string
): string[] {
  if (!Array.isArray(emails)) {
    return [];
  }

  const normalizedContact = contactEmail
    ? normalizeEmail(contactEmail)
    : null;

  const seen = new Set<string>();
  const result: string[] = [];

  for (const email of emails) {
    const normalized = normalizeEmail(email);
    if (!normalized) {
      continue; // Skip empty/invalid emails
    }
    if (normalizedContact && normalized === normalizedContact) {
      continue; // Skip if it matches contact email
    }
    if (!seen.has(normalized)) {
      seen.add(normalized);
      result.push(normalized);
    }
  }

  return result;
}

/**
 * Normalize contact email and officer emails together
 * Returns normalized contact_email and deduplicated officer_emails
 */
export function normalizeClubRequestEmails(
  contactEmail: string,
  officerEmails: string[]
): {
  contact_email: string;
  officer_emails: string[];
} {
  const normalizedContact = normalizeEmail(contactEmail);
  if (!normalizedContact) {
    throw new Error("Contact email is required and must be valid");
  }

  const normalizedOfficers = normalizeEmailList(
    officerEmails,
    normalizedContact
  );

  return {
    contact_email: normalizedContact,
    officer_emails: normalizedOfficers,
  };
}
