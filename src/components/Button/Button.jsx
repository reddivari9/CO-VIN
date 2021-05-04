/**
 * @author Praveen Reddy
 * @email pr250210@ncr.com
 * @create date 2021-05-04 14:44:02
 * @modify date 2021-05-04 14:44:02
 * @desc [description]
 */
import React from 'react';

import './Button.css';

function Button({
    className = '',
    varient = 'regular',
    children,
    label,
    ...rest
}) {
    return (
        <button class={`button -${varient} center ${className}`} {...rest}>
            {children || label}
        </button>
    );
}

export default Button;
