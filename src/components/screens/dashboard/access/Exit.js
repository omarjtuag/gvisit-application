import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Breadcrumb, Row, Col, Layout, Button, Typography, Space, Modal, Spin, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { CreateExit } from '../../../../helpers/controllers/Access';

const Exit = () => {
    const history = useHistory();
    const [fingerprint, setFingerprint] = useState(false);
    const [id, setId] = useState('');
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [isRfc, setIsRfc] = useState('');
    const [rfc, setRfc] = useState('');
    const [birthday, setBirthday] = useState('');
    const [image, setImage] = useState('');    
    const [badge, setBadge] = useState('');
    const [host, setHost] = useState('');
    const [motive, setMotive] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const { Title } = Typography;   

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: 'Mensaje del sistema',
            description: message
        });
    };

    const getFingerprint = async () => {
        const response = await window.ExitController.getFingerprint();
        const object = JSON.parse(response);
        if (object.success === false) {
            Modal.error({
                title: 'Mensaje del sistema',
                content: object.message
            });
        } else {
            setId(object.user.id);
            setUserId(object.user.userId);
            setName(object.user.name);
            setLastname(object.user.lastname);
            setIsRfc(object.user.isRfc);
            setRfc(object.user.rfc);
            setBirthday(object.user.birthday);
            setImage(object.user.image);
            setFingerprint(true);
        }
    };

    const registerExit = async () => {
        const obj = {
            host: host,
            motive: motive,
            badge: badge,
            id: id
        };
        setIsLoading(true);
        const response = await CreateExit(JSON.stringify(obj));
        if (response !== false) {
            openNotificationWithIcon('success', 'Salida registrada exitosamente');
            history.push('/dashboard/access');
        } else {
            setIsLoading(false);
            openNotificationWithIcon('error', 'Error registrando salida');
        }
    };

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
                            <Link to={'/dashboard/access/exit'}>Salida</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row style={{ padding: 20 }}>
                {
                    fingerprint ?
                        <>
                            <Col span={8}>
                                <img height={200} width={200} src={`data:image/png;base64,${image}`} />
                            </Col>
                            <Col span={16}>
                                <Row style={{ width: '100%' }}>
                                    <Space direction="vertical">
                                        <Title level={3}>Información de usuario</Title>
                                        <Title level={5}>{`${name} ${lastname}`}</Title>
                                        <Title level={5}>{`${birthday}`}</Title>
                                        {
                                            isRfc && <Title level={5}>{`${rfc}`}</Title>
                                        }
                                        {isLoading ?
                                            <Spin indicator={antIcon} />
                                            :
                                            <Button onClick={registerExit} style={{ marginTop: 10, width: '100%' }} type="primary">Registrar salida</Button>}
                                    </Space>
                                </Row>
                            </Col>
                        </>
                        :
                        <Row align="middle" justify="center" style={{ marginTop: 40, width: '100%' }}>
                            <Space direction="vertical">
                                <Title level={3}>Presiona para iniciar la busqueda</Title>
                                <Button type="primary" onClick={getFingerprint}>Iniciar</Button>
                            </Space>
                        </Row>
                }
            </Row>
        </Layout>
    );
}

export default Exit;