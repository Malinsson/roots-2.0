export const isValidPostalCode = (code: string): boolean => {
  return /^\d{5}$/.test(code);
};

export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const containsUnsafeInput = (text: string): boolean => {
  return /<\/?[a-z][^>]*>|(?:java|vb)script\s*:|data\s*:\s*text\/html|on[a-z]+\s*=|[\u0000-\u0008\u000B\u000C\u000E-\u001F]/i.test(
    text,
  );
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const formatCredits = (credits: number): string => {
  if (credits >= 1000) {
    return `${(credits / 1000).toFixed(1)}k`;
  }
  return credits.toString();
};
