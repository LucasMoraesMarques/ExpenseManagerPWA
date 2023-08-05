
export const editInvitation = async (apiToken, id, data) => {
    try {
      const response = await fetch(process.env.REACT_APP_API_ROOT_URL + `invitations/${id}/`, {
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