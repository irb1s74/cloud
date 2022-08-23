import React, {FC, memo} from 'react';
import {useGoogleLogout} from "react-google-login";
import {googleSetting} from "../../../helpers/googleSetting";
import {BiLogOut} from "react-icons/bi";

interface LogoutProps {
    handleLogout: () => void
}

const Logout: FC<LogoutProps> = ({handleLogout}) => {

    const onLogoutSuccess = () => {
        handleLogout()
    };

    const {signOut} = useGoogleLogout({
        clientId: googleSetting.clientId,
        onLogoutSuccess,
    });
    return (
        <button onClick={signOut} className="absolute top-3 right-3 text-indigo-500">
            <BiLogOut size={28}/>
        </button>
    );
};

export default memo(Logout);