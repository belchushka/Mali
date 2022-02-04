import React, {useState} from 'react';
import {SwipeablePanel} from "rn-swipeable-panel";
import PriceFilter from "./PriceFilter";
import AnimalBreeds from "./AnimalBreeds";

function AnimalBreedPanel({opened=false,closePanelAction, onSelect},props) {
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
            <AnimalBreeds
                onSelect={(id,name)=>{
                    onSelect(id,name)
                }}
            />
        </SwipeablePanel>
    );
}

export default AnimalBreedPanel;