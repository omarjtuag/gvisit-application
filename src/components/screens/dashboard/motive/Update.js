import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Breadcrumb, Row, Col, Layout, Card, Input, Button, Modal, notification, Spin, Space } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { GetOne, UpdateMotive } from '../../../../helpers/controllers/Motive';

const Update = ({ search }) => {
    const history = useHistory();
    const [descrip, setDescrip] = useState('');
    const [id, setId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    useEffect(() => {
        const request = async () => {
            const obj = {
                id: search
            };
            const response = await GetOne(JSON.stringify(obj));
            const object = JSON.parse(response);
            if (response !== false) {
                setDescrip(object.motive);
            }
        };
        request();
    }, []);

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: 'Mensaje del sistema',
            description: message
        });
    };

    const update = async () => {
        if (descrip === '') {
            Modal.info({
                title: 'Mensaje del sistema',
                content: "Debe rellenar todos los campos"
            });
        } else {
            const obj = {
                id: search,
                motive: descrip
            };
            setIsLoading(true);
            const response = await UpdateMotive(JSON.stringify(obj));
            if (response !== false) {
                openNotificationWithIcon('success', 'Motivo actualizado exitosamente');
                history.push('/dashboard/motives');
            } else {
                setIsLoading(false);
                openNotificationWithIcon('error', 'Error actualizando motivo');
            }
        }
    }

    return (
        <Layout style={{ background: 'white' }}>
            <Row style={{ margin: 20 }}>
                <Col span={8}>
                    <Breadcrumb>
                        <Breadcrumb.Item>Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={'/dashboard/motives'}>Motivos</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={`/dashboard/motives/${search}`}>Editar</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row style={{ padding: 20 }}>
                <Col span={24}>
                    <Card title="Editar motivo" headStyle={{ background: '#009600', color: 'white' }}>
                        <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center', height: '57vh' }}>
                            <Col span={12}>
                                <Space direction='vertical'>
                                    <Input value={descrip} onChange={(e) => { setDescrip(e.target.value) }} style={{ marginTop: 20 }} placeholder="Motivo" />
                                </Space>
                            </Col>
                        </Row>
                        <Row>
                            {isLoading ?
                                <Col span={8} offset={16} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                                    <Spin indicator={antIcon} />
                                </Col> :
                                <Col span={8} offset={16} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center' }}>
                                    <Button type="primary" onClick={update}>Guardar</Button>
                                    <Link to={'/dashboard/motives'}>
                                        <Button style={{ marginLeft: 5, marginRight: 10 }}>Volver</Button>
                                    </Link>
                                </Col>}
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
}

export default Update;