import * as React from 'react';
import Layout from './../Layout/index';
import Title from './../components/text/Title';
import Description from './../components/text/Description';
import SubTitle from './../components/text/SubTitle';
import TextLayout from './../components/text/TextLayout';
import Typography from '../Typography';


class Page extends React.Component {
    render() {
        return (
            <Layout >
                <Title>Typography排版</Title>
                <Description>协助进行页面级整体排版。</Description>
                <SubTitle>何时使用</SubTitle>

                <TextLayout
                    components={<React.Fragment>
                        <Typography.Text isBr>default type</Typography.Text>
                        <Typography.Text color="primary" isBr>primary type</Typography.Text>
                        <Typography.Text color="secondary" isBr>secondary type</Typography.Text>
                        <Typography.Text color="warning" isBr>warning type</Typography.Text>
                        <Typography.Text color="danger" isBr >danger Level5</Typography.Text>
                        <Typography.Text color="green" isBr >danger Level5</Typography.Text>
                        <Typography.Text isBr disabled >danger Level5</Typography.Text>
                        <Typography.Text mark isBr>danger Level5</Typography.Text>
                        <Typography.Text code isBr>danger Level5</Typography.Text>
                        <Typography.Text underline isBr>danger Level5</Typography.Text>
                        <Typography.Text delete isBr>danger Level5</Typography.Text>
                        <Typography.Text strong isBr>danger Level5</Typography.Text>
                        <Typography.Text style={{ fontSize: 30 }}>danger Level5</Typography.Text>

                    </React.Fragment>}
                    title={"基本使用。"}
                    description={"默认未选中，radio的选中状态可以通过onChange进行回调"}
                ></TextLayout>

                <TextLayout
                    components={<React.Fragment>
                        <Typography.Title>默认文字</Typography.Title>

                        <Typography.Title level={2}>Induction Level2</Typography.Title>
                        <Typography.Title level={3}>Induction Level3</Typography.Title>
                        <Typography.Title level={4}>Induction Level4</Typography.Title>
                        <Typography.Title level={5}>Induction Level5</Typography.Title>
                        <Typography.Title level={6}>Induction Level6</Typography.Title>
                    </React.Fragment>}
                    title={"基本使用。"}
                    description={"默认未选中，radio的选中状态可以通过onChange进行回调"}
                ></TextLayout>

                <TextLayout
                    components={<React.Fragment>
                        <Typography.Paragraph ellipsis>
                            Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
                            Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
                            a design language for background applications, is refined by Ant UED Team. Ant Design, a
                            design language for background applications, is refined by Ant UED Team. Ant Design, a design
                            language for background applications, is refined by Ant UED Team. Ant Design, a design
                            language for background applications, is refined by Ant UED Team.
                        </Typography.Paragraph>

                        <Typography.Paragraph mark ellipsis={{rows:3}} color="danger">
                            Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
                            Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
                            a design language for background applications, is refined by Ant UED Team. Ant Design, a
                            design language for background applications, is refined by Ant UED Team. Ant Design, a design
                            language for background applications, is refined by Ant UED Team. Ant Design, a design
                            language for background applications, is refined by Ant UED Team.
                        </Typography.Paragraph>
                    </React.Fragment>}
                    title={"省略号。"}
                    description={"多行文本省略。"}
                ></TextLayout>
            </Layout>
        )
    }
}

export default Page;