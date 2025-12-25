/**
 * Utility functions
 * TODO: Implement utility functions as needed
 */

export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}
