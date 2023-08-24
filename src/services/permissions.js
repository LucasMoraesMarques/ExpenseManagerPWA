export const askForPermissionToReceiveNotifications = async () => {
  if (Notification.permission !== "granted") {
    return Notification.requestPermission();
  }
};

export const getMedia = async (constraints) => {
  let stream = null;

  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    /* use the stream */
  } catch (err) {
    /* handle the error */
  }
};
