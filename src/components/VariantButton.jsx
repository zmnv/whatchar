import React, { useCallback }  from "react";
import classNames from "classnames";

export const OptionButton = ({
    char,
    value = " ",
    onClick,
    isAnswer = false,
    className,
}) => {
    const handleClick = useCallback(() => {
        if (onClick) {
            onClick(char);
        }
    }, [char, onClick]);

    const activeClass = isAnswer ? "" : "active:bg-red-500";

    return (
        <button onClick={handleClick} className={classNames(
            `w-full mb-2 outline-none justify-center items-center leading-4 text-center font-medium rounded-full text-white px-4 py-8 bg-white bg-opacity-5 text-2xl overflow-hidden`,
            activeClass,
            className,
        )}>
            {value.toUpperCase()}
        </button>
    )
}
