import React from 'react';
import Layout from '../Layout/index';
import Title from '../components/text/Title';
import Description from '../components/text/Description';
import SubTitle from '../components/text/SubTitle';
import Message from './index';
import TextLayout from '../components/text/TextLayout';
import DescriptionTable from '../components/text/DescriptionTable';
import Button from '../ButtonBase';
import Space from '../Space';
import nprogress from '../Progress/nprogress';

let index = 0;

const Page = () => {

    const showMessage = (e) => { 
        Message.open({
            message: `我是男神${index++}`,
            duration:500
        })
    }

    const showMessage2 = (status) => { 
        Message[status]({
            message: `我是男神${index++}`,
            filled:true
        })
    }

    return (
        <Layout >
            <Title>Message</Title>
            <Description>返回页面顶部的操作按钮。</Description>
            <SubTitle>何时使用</SubTitle>
            <Description>当页面内容区域比较长时。</Description>
            <SubTitle>代码演示</SubTitle>

            <TextLayout
                componentClassName={"button-page-demo"}
                components={<React.Fragment>
                    <Button onClick={showMessage}>展示message</Button>
                    <Button onClick={()=>Message.close()}>关闭message</Button>
                </React.Fragment>}
                title={"基本"}
                description={"最简单的用法。"}
            ></TextLayout>

            <TextLayout
                componentClassName={"button-page-demo"}
                components={<React.Fragment>
                    <Space>
                        <Button onClick={()=>showMessage2("success")} type={"primary"}>Success</Button>
                        <Button onClick={()=>showMessage2("info")} type={"info"}>info</Button>
                        <Button onClick={()=>showMessage2("error")} type={"danger"}>error</Button>
                        <Button onClick={()=>showMessage2("warning")} type={"warning"}>warning</Button>
                        <Button onClick={()=>nprogress.done()} type={"warning"}>关闭</Button>
                    </Space>
                </React.Fragment>}
                title={"基本"}
                description={"最简单的用法。"}
            ></TextLayout>


            <SubTitle>API</SubTitle>
            <Description>属性说明如下：</Description>
            <DescriptionTable
                columns={[
                    { title: "属性", dataIndex: "attr" },
                    { title: "说明", dataIndex: "description" },
                    { title: "类型", dataIndex: "type", render: (text, record) => { return (<div style={{ color: "rgba(242,49,127,1)" }}>{text}</div>) } },
                    { title: "默认值", dataIndex: "default" }
                ]}
                dataSource={[
                    { attr: "prefixCls", description: "自定义类名前缀", type: "string", default: "" },
                    { attr: "className", description: "额外添加的类名", type: "string", default: "false" },
                    { attr: "style", description: "样式", type: "object", default: "{}" },

                ]}
            />

        </Layout>
    )
}

export default Page;