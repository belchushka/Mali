import React, {useState} from 'react';
import {SwipeablePanel} from "rn-swipeable-panel";
import CitySelect from "../CitySelect";

function CityPanel({opened=false,closePanelAction, onSelect},props) {
    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: true,
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
            <CitySelect
                onSelect={(id,name)=>{
                    onSelect(id,name)
                }}
            />
        </SwipeablePanel>
    );
}

export default CityPanel;