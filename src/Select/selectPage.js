import React from 'react';
import Layout from '../Layout/index';
import Title from '../components/text/Title';
import Description from '../components/text/Description';
import SubTitle from '../components/text/SubTitle';
import Select from './index';
import DescriptionTable from '../components/text/DescriptionTable';
import TextLayout from '../components/text/TextLayout';
import Space from '../Space';
import Input from '../Input/index';

const { Option } = Select;
//import  Notification from 'rc-notification';

class Page extends React.Component {

    state = {

    }

    render() {

        const { isLoading, isFullLoading, poperRef } = this.state;

        return (
            <Layout >
                <Title>Select</Title>
                <Description>页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。</Description>
                <SubTitle>何时使用</SubTitle>

                <SubTitle>代码演示</SubTitle>
                <TextLayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <Space>

                            <Select defaultValue="lucy"  onChange={(value) => console.log(`selected:${value}`)}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled" disabled>
                                    Disabled
                                </Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                            

                            <Input size="small" />
                            <Input />
                            <Input size="large" />
{/* 
                            <Select defaultValue="lucy" style={{ width: 120 }} disabled border>
                                <Option value="lucy">Lucy</Option>
                            </Select>

                            <Select defaultValue="lucy" style={{ width: 120 }} loading border>
                                <Option value="lucy">Lucy</Option>
                            </Select> */}

                            {/* <Select style={{ width: 120 }} allowClear>
                                <Option value="lucy">Lucy</Option>
                            </Select> */}
                        </Space>


                    </React.Fragment>}
                    title={"基本用法"}
                    description={"一个简单的 loading 状态。"}
                ></TextLayout>

                {/* <TextLayout
                    componentClassName={"button-page-demo"}
                    components={<React.Fragment>
                        <Space>

                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select a person"
                                optionFilterProp="children"
                                onChange={()=>console.log("onchange")}
                                onFocus={()=>console.log("onFocus")}
                                onBlur={()=>console.log("onBlur")}
                                onSearch={()=>console.log("onSearch")}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                        </Space>


                    </React.Fragment>}
                    title={"带搜索框"}
                    description={"展开后可对选项进行搜索。"}
                ></TextLayout> */}



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
}

export default Page;