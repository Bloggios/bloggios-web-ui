import React from 'react';
import {Button} from "@nextui-org/react";

const FollowButton = ({size, variant, ...props}: {props?: any, size?: any, variant?: any}) => {
    return (
        <Button {...props} size={size} variant={"solid"} color={"warning"} >
            Follow
        </Button>
    );
};

export default FollowButton;