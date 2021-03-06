import React,{useState } from 'react';
import Layout from '../Layout/index';
import Title from '../components/text/Title';
import Description from '../components/text/Description';
import SubTitle from '../components/text/SubTitle';
import Loading from './index';
import TextLayout from '../components/text/TextLayout';
import DescriptionTable from '../components/text/DescriptionTable';
import Space from '../Space';
import Button from '../ButtonBase';
import Pager from '../components/pager';
import Popper from '../Popper'; 

const Page = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isFullLoading, setIsFullLoading] = useState(false);
 


    return (
        <Layout >
            <Title>Spin加载中</Title>
            <Description>页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。</Description>
            <SubTitle>何时使用</SubTitle>

            <SubTitle>代码演示</SubTitle>

            <TextLayout
                componentClassName={"button-page-demo"}
                components={<React.Fragment>
                    <Space size={"large"}>
                        <Loading />
                        <Loading color="second" />
                        <Loading color="danger" />
                        <Loading color="warning" />
                        <Loading color="green" />
                    </Space>
                </React.Fragment>}
                title={"基本用法"}
                description={"一个简单的 loading 状态。"}
            ></TextLayout>

            <TextLayout
                componentClassName={"button-page-demo"}
                components={<React.Fragment>
                    <Space size={"large"}>
                        <Loading size={20} />
                        <Loading />
                        <Loading size={60} />
                    </Space>
                </React.Fragment>}
                title={"各种大小"}
                description={"小的用于文本加载，默认用于卡片容器级加载，大的用于页面级加载。"}
            ></TextLayout>

            <TextLayout
                componentClassName={"button-page-demo"}
                components={<React.Fragment>
                    <Space size={"large"}>
                        <Loading size={20} isLoading={isLoading}>
                            <Button type="primary">Primary</Button>
                        </Loading>
                        <Loading size={40} overlayColor={"rgba(0,0,0,0.5)"} isLoading={isLoading} tip={"加载中..."} tipColor={{ fontSize: "14px", color: "#fff" }}>
                            <Pager deep={10} style={{ width: "100px", height: "100px" }} />
                        </Loading>
                        <Button type="primary" onClick={()=>setIsLoading(!isLoading)}>Toggle loading</Button>

                    </Space>
                </React.Fragment>}
                title={"各种大小"}
                description={"小的用于文本加载，默认用于卡片容器级加载，大的用于页面级加载。"}
            ></TextLayout>

            <TextLayout
                componentClassName={"button-page-demo"}
                components={<React.Fragment>
                    <Space size={"large"}>

                        <Loading fullScreen isLoading={isFullLoading} overlayColor={"rgba(0,0,0,0.7)"} size={80} />


                        <Button type="primary" onClick={() => {

                            setIsFullLoading(!isFullLoading);

                            setTimeout(() => {

                                setIsFullLoading(true);

                            }, 1000);
                        }}>全屏加载</Button>
                    </Space>
                </React.Fragment>}
                title={"各种大小"}
                description={"小的用于文本加载，默认用于卡片容器级加载，大的用于页面级加载。"}
            ></TextLayout>

            <SubTitle>API</SubTitle>
            <Description>通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：type -> shape -> size -> loading -> disabled。</Description>
            <Description>按钮的属性说明如下：</Description>
            <DescriptionTable
                columns={[
                    { title: "属性", dataIndex: "attr" },
                    { title: "说明", dataIndex: "description" },
                    { title: "类型", dataIndex: "type", render: (text, record) => { return (<div style={{ color: "rgba(242,49,127,1)" }}>{text}</div>) } },
                    { title: "默认值", dataIndex: "default" }
                ]}
                dataSource={[
                    { attr: "disabled", description: "按钮失效状态", type: "boolean", default: "false" },
                    { attr: "type", description: "设置按钮类型，可选值为 primary dashed danger link或者不设", type: "string", default: "-" },
                    { attr: "size", description: "设置按钮大小，可选值为 small large 或者不设", type: "string", default: "default" },
                    { attr: "shape", description: "设置按钮形状，可选值为 circle 或者不设", type: "string", default: "-" },
                    { attr: "float", description: "设置按钮是否悬浮", type: "boolean", default: "false" },
                    { attr: "flat", description: "设置按钮的扁平状态", type: "boolean", default: "false" },
                ]}
            />

        </Layout>
    )

}

export default Page;