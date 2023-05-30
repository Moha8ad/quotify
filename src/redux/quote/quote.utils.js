export const toggleQuote = (QuotesDataBase, quoteToToggle) => {
  const existingQuote = QuotesDataBase.find(
    (quote) => quote.quoteId === quoteToToggle.quoteId
  );

  if (existingQuote) {
    return QuotesDataBase.filter(
      (quote) => quote.liked === quoteToToggle.quoteId
    );
  }

  return [...QuotesDataBase, quoteToToggle];
};
