export const loadActions = async (apiToken) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_API_ROOT_URL + "actions-log/",
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
