import React, { useState } from 'react';
import { Button, Tooltip } from 'reactstrap';
import { LangProvider } from './Languages/languages';

function TooltipItem({ props }) {
  const { icon, id, onClickFunction, LangKey } = props;
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <span>
      <Button
        className="tool-tip"
        color="secondary"
        id={'Tooltip-' + id}
        onClick={onClickFunction}
      >
        <i className={icon} />
      </Button>
      <Tooltip
        placement="top"
        isOpen={tooltipOpen}
        target={'Tooltip-' + id}
        toggle={toggle}
        style={{ fontSize: '13px' }}
      >
        <LangProvider LangKey={LangKey} />
      </Tooltip>
    </span>
  );
}

export default TooltipItem;
