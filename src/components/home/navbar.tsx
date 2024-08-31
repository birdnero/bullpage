import React, { useRef } from "react";
import styles from "../index.module.scss"
import logo from "../../assets/logo.png"
import { FallOutlined, FilterOutlined, RiseOutlined, SearchOutlined } from "@ant-design/icons";
import { Dropdown, Input } from "antd";
import { Colors } from "../../STANDARTS";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip)

type TypeItemFn = {
    name: string;
    onClick: ()=>any;
}

////////////////////////////////////////////////////////////
const DropDownItem: React.FC<TypeItemFn> = ({name, onClick}) => {
    const DivRef = useRef<HTMLDivElement>(null)

    const state = Flip.getState(DivRef.current)
    return <div ref={DivRef} onMouseEnter={()=>{
        Flip.to(state, {
            border: "2px solid #ff007b88"
        })
    }} className={styles.home_navbar_dropdown_item} onClick={()=>onClick()}>{name}</div>
}
////////////////////////////////////////////////////////////



const filterTL = gsap.timeline()
let directChanger = true

const Navbar: React.FC = () => {
    const filterRef = useRef(null)
    const navigate = useNavigate()

    return <div className={styles.home_navbar_container}>
        <a href="/profile">
            <img className={styles.home_navbar_logo} src={logo} alt="logo" />
        </a>
      

        <Dropdown

            className={styles.home_navbar_filter_hover}
            trigger={["click"]}
            menu={{
                items: [{
                    label: <DropDownItem name="by rating" onClick={()=>{}} />,
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
        </Dropdown>
    </div>
}
export default Navbar