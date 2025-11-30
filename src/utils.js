function generateID() {
  return `book-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function calculateProgress(readPages, totalPages) {
  if (!totalPages) return 0;
  return Math.round((readPages / totalPages) * 100);
}

export { generateID, calculateProgress };