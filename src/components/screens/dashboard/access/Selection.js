import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Breadcrumb, Row, Col, Layout, Card, Button, Typography, Space } from 'antd';
import FirstLogo from '../../../../assets/users_icon.png';
import AlreadyLogo from '../../../../assets/fingerprint_icon.png';

const Selection = () => {
    const history = useHistory();
    const { Text, Title } = Typography;

    return (
        <Layout style={{ background: 'white' }}>
            <Row style={{ margin: 20 }}>
                <Col span={8}>
                    <Breadcrumb>
                        <Breadcrumb.Item>Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={'/dashboard/access'}>Selección</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row style={{ padding: 20 }}>
                <Col span={24}>
                    <Title level={3}>Selecciona la opción correspondiente</Title>
                    <Text>* Si aún no estan registrado, pulsa "Registro primera visita"</Text>
                    <br />
                    <Text>* Si ya estas registrado, pulsa "Ya estoy registrado"</Text>
                    <Row align="middle" justify="center" style={{ marginTop: 40, width: '100%' }}>
                        <Col span={12}>
                            <Row align="middle" justify="center">
                                <Space direction="vertical">
                                    <img src={FirstLogo} style={{ width: 64, height: 64 }} />
                                    <Title level={5}>Registro primera visita</Title>
                                    <Button type="primary" onClick={() => { history.push('/dashboard/access/firsttime') }}>Seleccionar</Button>
                                </Space>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row align="middle" justify="center">
                                <Space direction="vertical">
                                    <img src={AlreadyLogo} style={{ width: 64, height: 64 }} />
                                    <Title level={5}>Ya estoy registrado</Title>
                                    <Button type="primary" onClick={() => { history.push('/dashboard/access/already') }}>Seleccionar</Button>
                                </Space>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Layout>
    );
}

export default Selection;