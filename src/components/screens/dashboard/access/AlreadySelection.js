import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Breadcrumb, Row, Col, Layout, Card, Button, Typography, Space } from 'antd';
import EntryLogo from '../../../../assets/entry_icon.png';
import ExitLogo from '../../../../assets/exit_icon.png';
import EditLogo from '../../../../assets/edit_icon.png';

const AlreadySelection = () => {
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
                        <Breadcrumb.Item>
                            <Link to={'/dashboard/access/already'}>Ya registrado</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row style={{ padding: 20 }}>
                <Col span={24}>
                    <Title level={3}>Bienvenido(a)</Title>
                    <Text>Selecciona una opción para comenzar</Text>                   
                    <Row align="middle" justify="center" style={{ marginTop: 40, width: '100%' }}>
                        <Col span={8}>
                            <Row align="middle" justify="center">
                                <Space direction="vertical">
                                    <img src={EntryLogo} style={{ width: 64, height: 64 }} />
                                    <Title level={5}>Registro de entrada</Title>
                                    <Button onClick={() => { history.push('/dashboard/access/entry') }} type="primary">Seleccionar</Button>
                                </Space>
                            </Row>
                        </Col>
                        <Col span={8}>
                            <Row align="middle" justify="center">
                                <Space direction="vertical">
                                    <img src={ExitLogo} style={{ width: 64, height: 64 }} />
                                    <Title level={5}>Registro de salida</Title>
                                    <Button type="primary" onClick={() => { history.push('/dashboard/access/exit') }}>Seleccionar</Button>
                                </Space>
                            </Row>
                        </Col>
                        <Col span={8}>
                            <Row align="middle" justify="center">
                                <Space direction="vertical">
                                    <img src={EditLogo} style={{ width: 64, height: 64 }} />
                                    <Title level={5}>Actualizar mi información</Title>
                                    <Button type="primary" onClick={() => { history.push('/dashboard/access/update') }}>Seleccionar</Button>
                                </Space>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Layout>
    );
}

export default AlreadySelection;