import React, {useState} from 'react';
import {SwipeablePanel} from "rn-swipeable-panel";
import CitySelect from "../Selects/CitySelect";
import SexSelect from "../Selects/SexSelect";

function SexPanel({opened=false,closePanelAction, onSelect},props) {
    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: true,      onlySmall: true,

        showCloseButton: true,
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
    });
    const isPanelActive = opened

    const closePanel = () => {
        closePanelAction()
    };
    return (
        <SwipeablePanel {...panelProps} isActive={isPanelActive}>
            <SexSelect
                onSelect={(id,name)=>{
                    onSelect(id,name)
                }}
            />
        </SwipeablePanel>
    );
}

export default SexPanel;