import React, { useCallback,useState,cloneElement,useRef,forwardRef, useEffect } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import ReactDOM from 'react-dom';
import Button from '../ButtonBase';

import "./index.scss"; 

const Carousel = forwardRef((props,ref) => {

    const {
        prefixCls:customizePrefixCls,
        className,
        children:childrenProps,
        style,
        autoPlay
    } = props;

    const { getPrefixCls } =React.useContext(ConfigContext);
    //获取当前可视区容器宽度
    const prefixCls=getPrefixCls("carousel",customizePrefixCls);
     
    const classes = classNames(prefixCls,className);

    const frameRef=useRef(null);
    const containerRef=useRef(null);
    const currentRef=useRef(1);
    const childrenNum=useRef(React.Children.count(childrenProps));

    const [itemWidth,setItemWidth]=useState(0);
    const [itemHeight,setItemHeight]=useState(0);
    const [current,setCurrent]=useState(1);

    useEffect(()=>{
        setDimensions();
    },[])

    useEffect(()=>{
        let timer=null;
        if(autoPlay){
            timer=setInterval(handleNext,3000);
        }
        return () => clearInterval(timer)
    },[current])
    

 

    const setDimensions=React.useCallback(()=>{
        var firstSlide = containerRef.current.childNodes[0];
        setTimeout(()=>{
            setItemWidth(frameRef.current.offsetWidth);
            setItemHeight(firstSlide.offsetHeight);
        },0)
    },[]);

    const setTransition=()=>{
         
        function transitionend(){
            console.log("transitionend");

            //动画结束就关闭动画
            containerRef.current.style.transitionProperty="none";

            setCurrent(1); 

            containerRef.current.removeEventListener('transitionend', transitionend, false);
        }
        containerRef.current.addEventListener('transitionend', transitionend, false);
        
    }

    const setPrevTransition=(lastSlide)=>{
        
        function transitionend(){
            //动画结束就关闭动画
            containerRef.current.style.transitionProperty="none";

            containerRef.current.style.transform=`translate3d(-${(childrenNum.current-1)*itemWidth}px,0,0)`;

            lastSlide.style.left=`${((childrenNum.current-1)*itemWidth)}px`;

            setCurrent(childrenNum.current);
            
            containerRef.current.removeEventListener('transitionend', transitionend, false);
        }

        containerRef.current.addEventListener('transitionend', transitionend, false);
        
    }


    const handleNext=()=>{  
        containerRef.current.style.transitionProperty="transform";
        setCurrent(current+1);
    }

    const handlePrev=()=>{
        containerRef.current.style.transitionProperty="transform";

        if(current===1){//当是第一个时，应该要跳转到第三个
            containerRef.current.style.transform =`translate3d(${itemWidth}px,0,0)`;
        }else{
            containerRef.current.style.transform =`translate3d(-${(current-2)*itemWidth}px,0,0)`;
        }

        setCurrent(current-1);
    }

    const handleClickDotItem=React.useCallback((item)=>{
        setCurrent(item);
    },[childrenProps,itemWidth]);

    useEffect(()=>{
 
        var firstSlide = containerRef.current.childNodes[0];
        var lastSlide = containerRef.current.childNodes[childrenNum.current-1];

        if(current===childrenNum.current-1){
            firstSlide.style.left=`${((current+1)*itemWidth)}px`;
            lastSlide.style.left=`${itemWidth*current}px`;
        }

        if(current===childrenNum.current){
            firstSlide.style.left=`${(current*itemWidth)}px`;
        }

        if(current===childrenNum.current+1){
            setTransition();
        }

        if(current===0){
            setPrevTransition(lastSlide);
        }
        
        if(current===1){
            firstSlide.style.left=`0px`;
            lastSlide.style.left=`-${itemWidth}px`;
            containerRef.current.style.transform =`translate3d(0,0,0)`;  
        }
 
        containerRef.current.style.transform =`translate3d(-${(current-1)*itemWidth}px,0,0)`;
    },[current,itemWidth]);

    return (
        <div className={classes} style={style} ref={ref}>
             <div className={classNames(`${prefixCls}-frame`)} ref={frameRef} >
                <ul className={classNames(`${prefixCls}-list`)} style={{
                        width:itemWidth*childrenNum.current,    
                        height:itemHeight
                    }} ref={containerRef}>
                    {
                        React.Children.map(childrenProps,(child,index)=>{
                            return <li key={index} style={{width:itemWidth,left:index*itemWidth}}>
                                {
                                    React.cloneElement(
                                        child,
                                        {
                                            style:{
                                                ...child.props.style,
                                            }
                                        }
                                    )
                                }
                            </li>
                        })
                    }
                </ul>

                <ul className={classNames(`${prefixCls}-dots`)}>
                    {
                        Array.from({length:childrenNum.current},(item,i)=>i+1).map((item)=>{
                            return <li key={item} className={classNames({
                                ['dot_active']:item===current
                            })}>
                             <button onClick={()=>handleClickDotItem(item)}>{item}</button>
                        </li>
                        })
                    }
                </ul>

                <Button 
                    shape="circle" 
                    icon="arrow-back" 
                    flat 
                    className="arrow-left"
                    style={{color:"white"}}
                    onClick={handlePrev}    
                ></Button>
                <Button 
                    shape="circle" 
                    icon="arrow-forward" 
                    flat 
                    style={{color:"white"}}
                    className="arrow-right"
                    onClick={handleNext}    
                ></Button>

            </div>
            
           
        </div>
    )
});

export default Carousel;