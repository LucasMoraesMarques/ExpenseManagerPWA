
export const loadExpenses = async (apiToken) => {
  try {
    const response = await fetch(process.env.REACT_APP_API_ROOT_URL + 'expenses/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${apiToken}`,
      },
    });
    const json = await response.json();
    if (response.status != 200) {
      return []
    }
    return json.results
  } catch (error) {
    console.log(error)
    //Sentry.captureException(error);
    //ToastAlert("Desculpe, tivemos um problema ao carregar os favoritos. Tente novamente!")
    return []
  } finally {
  }
};

export const editExpense = async (apiToken, id, data) => {
  try {
    const response = await fetch(process.env.REACT_APP_API_ROOT_URL + `expenses/${id}/`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${apiToken}`,
      },
      body: JSON.stringify(data)
    }
    )
    const json = await response.json();
    if (response.status != 200) {
      return []
    }
    return json
  } catch (error) {
    console.log(error)
    //Sentry.captureException(error);
    //ToastAlert("Desculpe, tivemos um problema ao carregar os favoritos. Tente novamente!")
    return []
  } finally {
  }
};

export const createExpense = async (apiToken, data) => {
  try {
    const response = await fetch(process.env.REACT_APP_API_ROOT_URL + 'expenses/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${apiToken}`,
      },
      body: JSON.stringify(data)
    }
    )
    const json = await response.json();
    if (response.status != 201) {
      return []
    }
    return json
  } catch (error) {
    console.log(error)
    //Sentry.captureException(error);
    //ToastAlert("Desculpe, tivemos um problema ao carregar os favoritos. Tente novamente!")
    return []
  } finally {
  }
};

export const deleteExpenses = async (apiToken, id) => {
  try {
    const response = await fetch(process.env.REACT_APP_API_ROOT_URL + `expenses/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${apiToken}`,
      },
    })
    const json = await response.json();
    if (response.status != 201) {
      return []
    }
    return json
  } catch (error) {
    console.log(error)
    //Sentry.captureException(error);
    //ToastAlert("Desculpe, tivemos um problema ao carregar os favoritos. Tente novamente!")
    return []
  } finally {
  }
};


