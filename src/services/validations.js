export const loadValidations = async (apiToken) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_API_ROOT_URL + "validations/",
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

export const editValidation = async (apiToken, id, data) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_API_ROOT_URL + `validations/${id}/`,
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
