
export const loadGroups = async (apiToken) => {
  try {
    const response = await fetch(process.env.REACT_APP_API_ROOT_URL + 'expense-groups/', {
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
    return json
  } catch (error) {
    console.log(error)
    //Sentry.captureException(error);
    //ToastAlert("Desculpe, tivemos um problema ao carregar os favoritos. Tente novamente!")
    return []
  } finally {
  }
};

export const editGroup = async (apiToken, id, data) => {
  try {
    const response = await fetch(process.env.REACT_APP_API_ROOT_URL + `expense-groups/${id}/`, {
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
      return {flag:false, data:[]}
    }
    return {flag:true, data:json}
  } catch (error) {
    console.log(error)
    //Sentry.captureException(error);
    //ToastAlert("Desculpe, tivemos um problema ao carregar os favoritos. Tente novamente!")
    return {flag:false, data:[]}
  } finally {
  }
};

export const createGroup = async (apiToken, data) => {
  try {
    const response = await fetch(process.env.REACT_APP_API_ROOT_URL + 'expense-groups/', {
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
      return {flag:false, data:{}}
    }
    return {flag:true, data:json}
  } catch (error) {
    console.log(error)
    //Sentry.captureException(error);
    //ToastAlert("Desculpe, tivemos um problema ao carregar os favoritos. Tente novamente!")
    return {flag:false, data:{}}
  } finally {
  }
};

export const deleteGroup = async (apiToken, id) => {
  try {
    const response = await fetch(process.env.REACT_APP_API_ROOT_URL + `expense-groups/${id}/`, {
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

export const loadGroupById = async (apiToken, id) => {
  try {
    const response = await fetch(process.env.REACT_APP_API_ROOT_URL + `expense-groups/${id}/`,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Token ${apiToken}`,
      },
    });
    const json = await response.json();
    if (response.status == 200) {
      return json
    }
    else {
      throw new Error(response.text)
    }
  } catch (error) {
    //Sentry.captureException(error);
    console.log(error)
    //ToastAlert("Desculpe, tivemos um problema ao carregar os produtos. Tente novamente!")
    return { flag: false, product: {} }
  } finally {
  }
};