import QuoteActionTypes from "./quote.types";

import { db } from "../../firebase/firebase.utils";

export const fetchQuotesLoading = () => ({
  type: QuoteActionTypes.FETCH_QUOTES_LOADING,
});

export const fetchQuotesSuccess = (fsLikedQuotes) => ({
  type: QuoteActionTypes.FETCH_QUOTES_SUCCESS,
  payload: fsLikedQuotes,
});

export const fetchQuotesError = (errorMessage) => ({
  type: QuoteActionTypes.FETCH_QUOTES_FAILURE,
  payload: errorMessage,
});

export const fetchQuotesLoadingAsync = (userAuth) => {
  return (dispatch) => {
    dispatch(fetchQuotesLoading());

    const fsLikedQuotes = db.collection(`users/${userAuth.uid}/liked`);

    fsLikedQuotes
      .get()
      .then((snapshot) => {
        const quotesDataBase = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch(fetchQuotesSuccess(quotesDataBase));
      })
      .catch((error) => dispatch(fetchQuotesError(error.message)));
  };
};

export const setQuotesDataBase = (quotesDB) => ({
  type: QuoteActionTypes.SET_QUOTES_DATA_BASE,
  payload: quotesDB,
});

export const setLikedQuote = (likedQuote) => ({
  type: QuoteActionTypes.SET_LIKED_QUOTE,
  payload: likedQuote,
});

export const setLikedQuoteAsync = (userId) => {
  return (dispatch) => {
    dispatch(fetchQuotesLoading());

    const fsLikedQuotes = db.collection(`users/${userId}/liked`);

    fsLikedQuotes
      .get()
      .then((snapshot) => {
        const quotesDataBase = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch(setLikedQuote(quotesDataBase));
      })
      .catch((error) => dispatch(fetchQuotesError(error.message)));
  };
};

export const setInspirationalQuote = (inspirationalQuote) => ({
  type: QuoteActionTypes.SET_INSPIRATIONAL_QUOTE,
  payload: inspirationalQuote,
});

export const setInsightfulQuote = (insightfulQuote) => ({
  type: QuoteActionTypes.SET_INSIGHTFUL_QUOTE,
  payload: insightfulQuote,
});

export const addQuoteCard = (author, quote, quoteId, authorId) => ({
  type: QuoteActionTypes.ADD_QUOTE_CARD,
  author: author,
  quote: quote,
  quoteId: quoteId,
  authorId: authorId,
});
