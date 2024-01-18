// actions.js

// Action creator for userName
export const setUserName = (userName) => ({
    type: 'SET_USERNAME',
    payload: userName,
  });
  
  // Action creator for owes
  export const setOwes = (owes) => ({
    type: 'SET_OWES',
    payload: owes,
  });
   // Action creator for Individual
   export const setIndividual = (individual) => ({
    type: 'SET_INDIVIDUAL',
    payload: individual,
  });

    // Action creator for Individual
    export const setHistory = (history) => ({
        type: 'SET_HISTORY',
        payload: history,
      });

     // Action creator for Individual
     export const setDetail = (detail) => ({
        type: 'SET_DETAIL',
        payload: detail,
      });  
  