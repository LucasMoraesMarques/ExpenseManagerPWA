import React, { useState } from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { askForPermissionToReceiveNotifications } from "../services/permissions";
import { getMessagingToken } from "../services/firebase";
import { editUser } from "../services/user";
import { useSelector } from "react-redux";

function AskNotificationPermission() {
  const [dismiss, setDismiss] = useState(false);
  const userState = useSelector((state) => state.user);

  const handleEnableNotifications = async () => {
    let permission = await askForPermissionToReceiveNotifications();
    console.log(permission);
    if (permission === "granted") {
      setDismiss(true);
      getMessagingToken().then((token) => {
        if (token) {
          editUser(userState.currentUser.api_token, userState.currentUser.id, {
            fcm_token: `${token}`,
          });
        }
      });
    }
  };
  return !dismiss ? (
    <Alert severity="info">
      <div className="flex flex-col items-end">
        <div>
          Habilite as notificações para te avisarmos de qualquer modificação em
          tempo real.
        </div>
        <div className="flex mt-2">
          {/*<Button
            variant="outlined"
            onClick={() => setDismiss(true)}
            size="small"
            sx={{fontSize:"10px", padding:"2px 2px", marginRight:"5px"}}
          >
            Depois
  </Button>*/}

          <Button
            variant="contained"
            size="small"
            sx={{ fontSize: "10px", padding: "2px 2px" }}
            onClick={handleEnableNotifications}
          >
            Habilitar
          </Button>
        </div>
      </div>
    </Alert>
  ) : (
    <></>
  );
}

export default AskNotificationPermission;
