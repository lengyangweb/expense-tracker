import React, { useState } from 'react'
import { TabMenu } from 'primereact/tabmenu';

const LoginTabMenu = ({ items, activeIndex, setActiveIndex }) => {
    return (
        <TabMenu
            model={ items }
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
        />
    )
}

export default LoginTabMenu