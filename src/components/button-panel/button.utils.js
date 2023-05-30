export const removeQuote = ( quotesDataBase, setQuotesDataBase, quoteToRemove ) => {
    
    const existingQuote = quotesDataBase.find(
        quote => quote.quoteId === quoteToRemove.quoteId
    );
  
    if (existingQuote) {
        setQuotesDataBase(quoteToRemove)
    } 
        
  };