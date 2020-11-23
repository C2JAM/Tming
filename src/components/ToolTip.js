import React, { useState } from "react";
import { Tooltip } from "reactstrap";
import { LangProvider } from "../components/Languages/languages";

const TooltipItem = (props) => {
    const { icon, id, onClickFunction, LangKey } = props;
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <span>
            <button
                className="tool-tip"
                color="secondary"
                id={"Tooltip-" + id}
                onClick={onClickFunction}
            >
                <i className={icon} />
            </button>
            <Tooltip
                placement={"top"}
                isOpen={tooltipOpen}
                target={"Tooltip-" + id}
                toggle={toggle}
                style={{ fontSize: "13px" }}
            >
                <LangProvider LangKey={LangKey} />
            </Tooltip>
        </span>
    );
};

export default TooltipItem;
