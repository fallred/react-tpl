import React from "react";
import { LeftOutlined } from "@ant-design/icons";
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import "./index.less";
export default function NavHeader(props) {
    const { navigator } = React.useContext(NavigationContext);
    return (
        <div className="nav-header">
            <LeftOutlined onClick={() => navigator.back()} />
            {props.children}
        </div>
    );
}