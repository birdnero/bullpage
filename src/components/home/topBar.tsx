import React from "react";
import Icon from "../../../public/assets/modified_icons/icon";
import { search, settings } from "../../../public/assets/modified_icons/ICONS";
import { useNavigate } from "react-router-dom";

const TopBar: React.FC = () => {
    const navigate = useNavigate()

    return <div className="topbar_container">

        <p className="logo_text">Anime Pear</p>
        <div>
            <Icon path={search} style={{margin: 0}} className="home_icon" onClick={() => { navigate("/search") }} />
            <Icon path={settings} className="home_icon" onClick={() => { navigate("/settings") }} />
        </div>
    </div>
}
export default TopBar