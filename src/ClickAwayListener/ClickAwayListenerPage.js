import React from 'react';
import Layout from '../Layout/index';
import Title from '../components/text/Title';
import Description from '../components/text/Description';
import SubTitle from '../components/text/SubTitle';
import ClickAwayListener from './index';
import TextLayout from '../components/text/TextLayout';
import DescriptionTable from '../components/text/DescriptionTable';
import Button from '../ButtonBase';
import Popover from '../Popover';
import Alert from '../Alert';
 
import Paper from '../Paper';

const Page = () => {

    const [visible,setVisible]=React.useState(false);

    return (
        <Layout >
            <Title>TimePicker</Title>
            <Description>返回页面顶部的操作按钮。</Description>
            <SubTitle>何时使用</SubTitle>
            <Description>当页面内容区域比较长时。</Description>
            <SubTitle>代码演示</SubTitle>

            <TextLayout
                componentClassName={"button-page-demo"}
                components={<React.Fragment>

                    <ClickAwayListener onClickAway={()=>{setVisible(false)}}>
                        <Paper style={{height:600,width:"100%",backgroundColor:'grey'}} center>
                            <div>
                            <Alert type="warning">在灰色区域点击弹框不会消失</Alert>
                            <Popover
                                title="prompt title"
                                content={<div>
                                    <p>Content</p>
                                    <p>Content</p>
                                </div>} 
                                visible={visible}
                            >   
                                <Button type="primary" onClick={()=>{setVisible(true)}}>Primary</Button>
                            </Popover>
                            </div>
                        </Paper>
                    </ClickAwayListener>

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