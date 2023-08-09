export const loadExpenses = async (apiToken) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_API_ROOT_URL + "expenses/",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${apiToken}`,
        },
      }
    );
    const json = await response.json();
    if (response.status != 200) {
      return [];
    }
    return json;
  } catch (error) {
    console.log(error);
    //Sentry.captureException(error);
    //ToastAlert("Desculpe, tivemos um problema ao carregar os favoritos. Tente novamente!")
    return [];
  } finally {
  }
};

export const editExpense = async (apiToken, id, data) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_API_ROOT_URL + `expenses/${id}/`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${apiToken}`,
        },
        body: JSON.stringify(data),
      }
    );
    const json = await response.json();
    if (response.status != 200) {
      return { flag: false, data: [] };
    }
    return { flag: true, data: json };
  } catch (error) {
    console.log(error);
    //Sentry.captureException(error);
    //ToastAlert("Desculpe, tivemos um problema ao carregar os favoritos. Tente novamente!")
    return { flag: false, data: [] };
  } finally {
  }
};

export const createExpense = async (apiToken, data) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_API_ROOT_URL + "expenses/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${apiToken}`,
        },
        body: JSON.stringify(data),
      }
    );
    const json = await response.json();
    if (response.status != 201) {
      return { flag: false, data: [] };
    }
    return { flag: true, data: json };
  } catch (error) {
    console.log(error);
    //Sentry.captureException(error);
    //ToastAlert("Desculpe, tivemos um problema ao carregar os favoritos. Tente novamente!")
    return { flag: false, data: [] };
  } finally {
  }
};

export const deleteExpenses = async (apiToken, ids) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_API_ROOT_URL + `expenses/1/?ids=${ids.join(",")}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${apiToken}`,
        },
      }
    );
    if (response.status != 204) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    //Sentry.captureException(error);
    //ToastAlert("Desculpe, tivemos um problema ao carregar os favoritos. Tente novamente!")
    return false;
  } finally {
  }
};

export const deleteExpense = async (apiToken, id) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_API_ROOT_URL + `expenses/${id}/`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${apiToken}`,
        },
      }
    );
    if (response.status != 204) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    //Sentry.captureException(error);
    //ToastAlert("Desculpe, tivemos um problema ao carregar os favoritos. Tente novamente!")
    return false;
  } finally {
  }
};
