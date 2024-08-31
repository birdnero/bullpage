import React, { useRef } from "react";
import styles from "../index.module.scss"
//import logo from "../../assets/logo.png"
//import { Dropdown } from "antd";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import "./home.scss"
import Icon from "../../assets/modified_icons/icon";
import { useNavigate } from "react-router-dom";
import { create_post, home, saved } from "../../assets/modified_icons/ICONS"

gsap.registerPlugin(Flip)

type TypeItemFn = {
    name: string;
    onClick: () => any;
}

////////////////////////////////////////////////////////////
/*const DropDownItem: React.FC<TypeItemFn> = ({ name, onClick }) => {
    const DivRef = useRef<HTMLDivElement>(null)

    const state = Flip.getState(DivRef.current)
    return <div ref={DivRef} onMouseEnter={() => {
        Flip.to(state, {
            border: "2px solid #ff007b88"
        })
    }} className={styles.home_navbar_dropdown_item} onClick={() => onClick()}>{name}</div>
}*/
////////////////////////////////////////////////////////////



//const filterTL = gsap.timeline()
//let directChanger = true

const Navbar: React.FC = () => {
    //const filterRef = useRef(null)
    const navigate = useNavigate()

    return <div className={"navbar_container"}>
        <Icon path={home} className="home_icon" onClick={() => {navigate("/")}} />

        <Icon path={saved} className="home_icon" onClick={() => {navigate("/saved")}} />

        <Icon path={create_post} className="home_icon" onClick={()=>navigate("/create_post")} />


        {/*<Dropdown

            className={styles.home_navbar_filter_hover}
            trigger={["click"]}
            menu={{
                items: [{
                    label: <DropDownItem name="by rating" onClick={() => { }} />,
                    key: '1',
                    icon: <FallOutlined className={styles.home_navbar_dropdown_icon} />
                }, {
                    label: <>by date</>,
                    key: '1',
                    icon: <FallOutlined className={styles.home_navbar_dropdown_icon} />
                }, {
                    label: <>by name</>,
                    key: '1',
                    icon: <FallOutlined className={styles.home_navbar_dropdown_icon} />
                }, {
                    label: <>by rating</>,
                    key: '1',
                    icon: <RiseOutlined className={styles.home_navbar_dropdown_icon} />
                }, {
                    label: <>by date</>,
                    key: '1',
                    icon: <RiseOutlined className={styles.home_navbar_dropdown_icon} />
                }, {
                    label: <>by name</>,
                    key: '1',
                    icon: <RiseOutlined className={styles.home_navbar_dropdown_icon} />
                }]
            }}
            onOpenChange={() => {
                if (filterRef) {
                    filterTL.to(filterRef.current, { rotate: directChanger ? "+=180" : "-=180", duration: 0.4 })
                    directChanger = !directChanger
                }
            }}
        >
            <FilterOutlined
                ref={filterRef}
                className={styles.home_navbar_filter} />
        </Dropdown>*/}
    </div>
}
export default Navbar
