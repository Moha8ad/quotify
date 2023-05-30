import QuoteActionTypes from "./quote.types";

import { toggleQuote } from "./quote.utils";

const INITIAL_STATE = {
  isFetching: false,
  errorMessage: undefined,
  quotesDB: [],
  likedQuotesDB: [],
  inspirationalList: [],
  insightfulList: [],
  addedQuoteCard: [],
};

const quoteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QuoteActionTypes.FETCH_QUOTES_LOADING:
      return {
        ...state,
        isFetching: true,
      };
    case QuoteActionTypes.FETCH_QUOTES_SUCCESS:
      return {
        ...state,
        isFetching: true,
      };
    case QuoteActionTypes.FETCH_QUOTES_FAILURE:
      return {
        ...state,
        isFetching: true,
        errorMessage: action.payload,
      };

    case QuoteActionTypes.SET_QUOTES_DATA_BASE:
      return {
        ...state,
        quotesDB: action.payload,
      };
    case QuoteActionTypes.SET_LIKED_QUOTE:
      return {
        ...state,
        likedQuotesDB: action.payload,
      };
    case QuoteActionTypes.SET_INSPIRATIONAL_QUOTE:
      return {
        ...state,
        inspirationalList: toggleQuote(state.inspirationalList, action.payload),
      };
    case QuoteActionTypes.SET_INSIGHTFUL_QUOTE:
      return {
        ...state,
        insightfulList: toggleQuote(state.insightfulList, action.payload),
      };
    case QuoteActionTypes.ADD_QUOTE_CARD:
      return {
        ...state,
        addedQuoteCard: toggleQuote(state.addedQuoteCard, {
          author: action.author,
          quote: action.quote,
          quoteId: action.quoteId,
          authorId: action.authorId,
        }),
      };
    default:
      return state;
  }
};

export default quoteReducer;
