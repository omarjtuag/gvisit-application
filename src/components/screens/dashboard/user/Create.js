import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Breadcrumb, Row, Col, Layout, Card, Input, Button, Modal, notification, Spin, Divider, Space } from 'antd';
import { LoadingOutlined, EyeInvisibleOutlined, EyeTwoTone, } from '@ant-design/icons';
import { CreateUser } from '../../../../helpers/controllers/User';

const Create = () => {
    const history = useHistory();
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [repit, setRepit] = useState('');
    const [id, setId] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: 'Mensaje del sistema',
            description: message
        });
    };

    const create = async () => {
        if (user === '' || pass === '' || repit === '' || id === '' || fullname === '' || phone === '' || address === '' || email === '') {
            Modal.info({
                title: 'Mensaje del sistema',
                content: "Debe rellenar todos los campos"
            });
        } else {
            if (pass !== repit) {
                Modal.info({
                    title: 'Mensaje del sistema',
                    content: "Las contraseñas no coinciden"
                });
            } else {
                const obj = {
                    username: user,
                    password: pass,
                    confirm: repit,
                    dni: id,
                    fullname: fullname,
                    phone: phone,
                    address: address,
                    email: email
                };
                setIsLoading(true);
                const response = await CreateUser(JSON.stringify(obj));
                if (response !== false) {
                    openNotificationWithIcon('success', 'Usuario creado exitosamente');
                    history.push('/dashboard/users');
                } else {
                    setIsLoading(false);
                    openNotificationWithIcon('error', 'Error creando usuario');
                }
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
                            <Link to={'/dashboard/users'}>Usuarios</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={'/dashboard/users/create'}>Nuevo</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row style={{ padding: 20 }}>
                <Col span={24}>
                    <Card title="Nuevo usuario" headStyle={{ background: '#009600', color: 'white' }}>
                        <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center', height: '57vh' }}>
                            <Col span={12}>
                                <Space direction='vertical'>
                                    <Input onChange={(e) => { setUser(e.target.value) }} style={{ marginTop: 20 }} placeholder="Usuario" />
                                    <Input.Password onChange={(e) => { setPass(e.target.value) }} placeholder="Contraseña" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                                    <Input.Password onChange={(e) => { setRepit(e.target.value) }} placeholder="Confirmar contraseña" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                                    <Divider />
                                    <Input onChange={(e) => { setId(e.target.value) }} placeholder="Número de identificación" />
                                    <Input onChange={(e) => { setFullname(e.target.value) }} placeholder="Nombre completo" />
                                    <Input onChange={(e) => { setPhone(e.target.value) }} placeholder="Número teléfonico" />
                                    <Input onChange={(e) => { setAddress(e.target.value) }} placeholder="Dirección" />
                                    <Input onChange={(e) => { setEmail(e.target.value) }} placeholder="Correo electrónico" />
                                </Space>
                            </Col>
                        </Row>
                        <Row>
                            {isLoading ?
                                <Col span={8} offset={16} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                                    <Spin indicator={antIcon} />
                                </Col> :
                                <Col span={8} offset={16} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'center' }}>
                                    <Button type="primary" onClick={create}>Guardar</Button>
                                    <Link to={'/dashboard/users'}>
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

export default Create;