import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Typography, Input, Button, Space, Modal, Spin, Divider, notification } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LoadingOutlined } from '@ant-design/icons';

const FirstTime = () => {
    const history = useHistory();
    const { Title, Text } = Typography;
    const { TextArea } = Input;
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const [isLoading, setIsLoading] = useState(false);
    const [licence, setLicence] = useState('');
    const [host, setHost] = useState('');
    const [db, setDb] = useState('');
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [policy, setPolicy] = useState('');

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: 'Mensaje del sistema',
            description: message,
        });
    };

    const selectPicture = () => {
        window.InitialController.selectPicture();
    }

    const register = async () => {
        if (user === '' || pass === '' || host === '' || db === '' || policy === '' || licence === '') {
            Modal.info({
                title: 'Mensaje del sistema',
                content: "Debe rellenar todos los campos"
            });
        } else {
            setIsLoading(true);
            const obj = {
                licence: licence,
                host: host,
                db: db,
                user: user,
                pass: pass,
                policy: policy
            };
            window.InitialController.saveConfigurationAsync(JSON.stringify(obj)).
                then((response) => {
                    if (response) {
                        openNotificationWithIcon('success', 'Configuración registrada exitosamente');
                        history.push('/auth/login');
                    } else {
                        setIsLoading(false);
                        openNotificationWithIcon('error', 'Error registrando configuración');
                    }
                });
        }
    }

    return (
        <Row>
            <Col span={24}>
                <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', height: '20vh' }}>
                    <Col span={12}>
                        <Space direction='vertical'>
                            <Title>Registra la configuración inicial</Title>
                        </Space>
                    </Col>
                </Row>
                {
                    isLoading ?
                        <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', height: '70vh' }}>
                            <Col span={24}>
                                <Spin indicator={antIcon} style={{ alignSelf: 'center', color: '#009600' }} />
                            </Col>
                        </Row>
                        :
                        <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center', height: '70vh' }}>
                            <Col span={24}>
                                <Space direction='vertical'>
                                    <Text>Licenciamiento</Text>
                                    <Input onChange={(e) => { setLicence(e.target.value) }} value={licence} style={{ marginTop: 20 }} placeholder="Introduce tu licencia" />
                                    <Divider />
                                    <Text>Datos del servidor</Text>
                                    <Input onChange={(e) => { setHost(e.target.value) }} value={host} placeholder="Nombre o ip del servidor" />
                                    <Input onChange={(e) => { setDb(e.target.value) }} value={db} placeholder="Nombre de la base de datos" />
                                    <Input onChange={(e) => { setUser(e.target.value) }} value={user} placeholder="Usuario de la base de datos" />
                                    <Input.Password onChange={(e) => { setPass(e.target.value) }} value={pass} placeholder="Contraseña de la base de datos" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                                    <Divider />
                                    <Text>Información de la aplicación</Text>
                                    <Button onClick={selectPicture}>Seleccionar imagen</Button>
                                    <Divider />
                                    <Text>Política de ingreso</Text>
                                    <TextArea rows={5} placeholder="Introduzca política de ingreso" onChange={(e) => { setPolicy(e.target.value) }} />
                                    <Divider />
                                    <Button type="primary" block onClick={register} style={{ marginBottom: 10 }}>
                                        Guardar
                                    </Button>
                                    <Button type="default" block onClick={() => { history.push('/auth/login'); }} style={{ marginBottom: 10 }}>
                                        Volver
                                    </Button>
                                </Space>
                            </Col>
                        </Row>
                }
            </Col>
        </Row>
    );
}

export default FirstTime;