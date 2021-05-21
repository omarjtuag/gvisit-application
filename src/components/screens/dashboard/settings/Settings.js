import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Breadcrumb, Row, Col, Layout, Input, Button, Modal, notification, Spin, Collapse, Typography, Checkbox } from 'antd';
import { LoadingOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { GetOne, SaveSettings } from '../../../../helpers/controllers/Setting';

const Settings = () => {
    const history = useHistory();
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [policy, setPolicy] = useState('');
    const [age, setAge] = useState('');
    const [image, setImage] = useState('');
    const [useDni, setUseDni] = useState(false);
    const [useRfc, setUseRfc] = useState(false);
    const [useAge, setUseAge] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { Panel } = Collapse;
    const { Text, Title } = Typography;
    const { TextArea } = Input;
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: 'Mensaje del sistema',
            description: message
        });
    };

    useEffect(() => {
        const request = async () => {
            const response = await GetOne();           
            const object = JSON.parse(response);
            if (response !== false) {
                setImage(object.image);
                setUser(object.user);
                setPolicy(object.policy);
                setAge(object.age);
                setUseDni(object.useDni);
                setUseRfc(object.useRfc);
                setUseAge(object.useAge);
            }
        };
        request();
    }, []);

    const save = async () => {
        if (pass === '') {
            Modal.info({
                title: 'Mensaje del sistema',
                content: "Debe rellenar todos los campos"
            });
        } else {
            const obj = {
                useDni: useDni,
                useRfc: useRfc,
                useAge: useAge,
                age: age,
                policy: policy,
                mail: user,
                pass: pass
            };
            setIsLoading(true);
            const response = await SaveSettings(JSON.stringify(obj));
            if (response !== false) {
                openNotificationWithIcon('success', 'Configuración guardada exitosamente');
                history.push('/dashboard');
            } else {
                setIsLoading(false);
                openNotificationWithIcon('error', 'Error guardando configuración');
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
                            <Link to={'/dashboard/settings'}>Configuración del sistema</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row style={{ padding: 20 }}>
                <Collapse style={{ width: '100%' }}>
                    <Panel header="Permisos de la aplicación" key="1">
                        <Row justify='center' align="middle">
                            <Col span={16}>
                                <Title level={5}>Utiliza DNI</Title>
                                <Text>Marca la casilla si deseas ingresar DNI en formularios (no obligatorio)</Text>
                            </Col>
                            <Col span={4} offset={4}>
                                <Checkbox onChange={() => { setUseDni(!useDni) }} checked={useDni} />
                            </Col>
                        </Row>
                        <Row justify='center' align="middle" style={{ marginTop: 10 }}>
                            <Col span={16}>
                                <Title level={5}>Utiliza RFC</Title>
                                <Text>Marca la casilla si deseas ingresar RFC en formularios (no obligatorio)</Text>
                            </Col>
                            <Col span={4} offset={4}>
                                <Checkbox onChange={() => { setUseRfc(!useRfc) }} checked={useRfc} />
                            </Col>
                        </Row>
                        <Row justify='center' align="middle" style={{ marginTop: 10 }}>
                            <Col span={16}>
                                <Title level={5}>Utiliza fecha de nacimiento</Title>
                                <Text>Marca la casilla si deseas ingresar fecha en formularios (obligatorio)</Text>
                            </Col>
                            <Col span={4} offset={4}>
                                <Checkbox onChange={() => { setUseAge(!useAge) }} checked={useAge} />
                            </Col>
                        </Row>
                        <Row justify='center' align="middle" style={{ marginTop: 10 }}>
                            <Col span={16}>
                                <Title level={5}>Mayoría de edad</Title>
                                <Text>Ingresa en número, la edad en la cual el sistema detectará mayoría de edad</Text>
                            </Col>
                            <Col span={4} offset={4}>
                                <Input placeholder="Edad" value={age} onChange={(text) => { setAge(text.target.value) }} />
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="Información de la aplicación" key="2">
                        <Row justify="start" align="middle">
                            <Title level={5}>Indica el correo electrónico de donde se informará al anfitrión</Title>
                            <Input placeholder="Correo electrónico de envío" value={user} onChange={(text) => { setUser(text.target.value) }} />
                            <Input.Password value={pass} onChange={(text) => { setPass(text.target.value) }} style={{ marginTop: 10 }} placeholder="Contraseña" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                        </Row>
                    </Panel>
                    <Panel header="Logo de la aplicación" key="3">
                        <Row justify="center" align="middle">
                            {/* <img style={{ width: 66, height: 58 }} src={`data:image/png;base64,${image}`} /> */}
                            <Button onClick={() => { window.SettingsController.selectPicture() }}>Selecciona logo empresarial</Button>
                        </Row>
                    </Panel>
                    <Panel header="Política de ingreso" key="4">
                        <Row justify="center" align="middle">
                            <TextArea value={policy} onChange={(text) => { setPolicy(text.target.value) }} rows={5} placeholder="Introduzca política de ingreso" />
                        </Row>
                    </Panel>
                </Collapse>
            </Row>
            <Row style={{ padding: 20 }}>
                {isLoading ?
                    <Col span={8} offset={16} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                        <Spin indicator={antIcon} />
                    </Col> :
                    <Col span={8} offset={16} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center' }}>
                        <Button type="primary" onClick={save}>Guardar</Button>
                    </Col>}
            </Row>
        </Layout>
    );
}

export default Settings;