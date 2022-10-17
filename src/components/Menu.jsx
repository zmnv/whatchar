import { Fragment, useEffect, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet"
import 'react-spring-bottom-sheet/dist/style.css'

const VERSION = "0.2.0 (beta)";

export const Menu = ({
    children,
    renderButton,
}) => {
    const [isOpened, setOpen] = useState(false);
    const open = () => setOpen(true);
    const close = () => setOpen(false);

    useEffect(() => {
    }, [])

    return (
        <Fragment>
            {renderButton({
                open,
                close,
            })}
            <BottomSheet
                open={isOpened}
                expandOnContentDrag
                initialFocusRef={false}
                // scrollLocking={false}
                onDismiss={close}
                // maxHeight={320}
                // header={(
                //     <Fragment>
                //         <h1 className="text-lg">Settings</h1>
                //     </Fragment>
                // )}
            >
                {typeof children === "function" ? children({open,close}) : children}
                <div className="p-4 mt-2">
                    <p className="text-xs text-white text-opacity-30">What<span className="font-bold">chart</span> {VERSION}<br/>by Sorption</p>
                </div>
            </BottomSheet>
        </Fragment>
    )
}