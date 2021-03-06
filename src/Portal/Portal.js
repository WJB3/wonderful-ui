import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import useForkRef from '../_utils/useForkRef';
import PropTypes from 'prop-types';

function getContainer(container){
    //容器
    const containerSelf=typeof container==='function'?container():container;
    return ReactDOM.findDOMNode(containerSelf);
}

const Portal=React.forwardRef((props,ref)=>{
    const {
        children,
        disablePortal=false,
        container,
    }=props;

    const [mountNode, setMountNode] = React.useState(null);

    const handleRef = useForkRef(React.isValidElement(children) ? children.ref : null, ref);

    useEffect(()=>{
        if(!disablePortal){
            setMountNode(getContainer(container) || document.body);
        }
    },[container,disablePortal]);
    
    if(disablePortal){
        if(React.isValidElement(children)){
            return React.cloneElement(children,{
                ref:handleRef
            });
        }
    }

    return mountNode ? ReactDOM.createPortal(children,mountNode):mountNode;
});

Portal.propTypes={
    //传送门
    children:PropTypes.node,
    //是否禁用传送门
    disablePortal:PropTypes.bool,
    //container
    container:PropTypes.oneOfType([
        PropTypes.func
    ])
}

export default Portal;