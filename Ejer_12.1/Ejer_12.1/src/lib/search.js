export function normalizeTerm(term) {
  return term
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function parseSearchTerms(value) {
  return [
    ...new Set(
      String(value || "")
        .split(",")
        .map(normalizeTerm)
        .filter(Boolean)
    )
  ].slice(0, 10);
}
