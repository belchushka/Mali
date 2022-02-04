import React, {useState} from 'react';
import {SwipeablePanel} from "rn-swipeable-panel";
import PriceFilter from "../Filters/PriceFilter";

function PricePanel({opened=false,closePanelAction, onDone, priceRange},props) {
    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: false,
        onlySmall: true,
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
            <PriceFilter fromPrice={priceRange[0]} toPrice={priceRange[1]} onSubmit={(from,to)=>{
                onDone(from,to)
            }}/>
        </SwipeablePanel>
    );
}

export default PricePanel;