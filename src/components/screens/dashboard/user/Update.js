import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Breadcrumb, Row, Col, Layout, Card, Input, Button, Modal, notification, Spin, Divider, Space } from 'antd';
import { LoadingOutlined, EyeInvisibleOutlined, EyeTwoTone, } from '@ant-design/icons';
import { GetOne, UpdateUser } from '../../../../helpers/controllers/User';

const Update = ({ search }) => {
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

    useEffect(() => {
        const request = async () => {
            const obj = {
                nroId: search
            };
            const response = await GetOne(JSON.stringify(obj));
            const object = JSON.parse(response);
            if (response !== false) {
                setUser(object.username);             
                setFullname(object.fullName);
                setId(object.nroId);
                setEmail(object.email);
                setPhone(object.phone);
                setAddress(object.direction);                              
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
                    nroId: search,
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
                const response = await UpdateUser(JSON.stringify(obj));
                if (response !== false) {
                    openNotificationWithIcon('success', 'Usuario actualizado exitosamente');
                    history.push('/dashboard/users');
                } else {
                    setIsLoading(false);
                    openNotificationWithIcon('error', 'Error actualizando usuario');
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
                            <Link to={`/dashboard/users/${search}`}>Editar</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row style={{ padding: 20 }}>
                <Col span={24}>
                    <Card title="Editar usuario" headStyle={{ background: '#009600', color: 'white' }}>
                        <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center', height: '57vh' }}>
                            <Col span={12}>
                                <Space direction='vertical'>
                                    <Input value={user} onChange={(e) => { setUser(e.target.value) }} style={{ marginTop: 20 }} placeholder="Usuario" />
                                    <Input.Password value={pass} onChange={(e) => { setPass(e.target.value) }} placeholder="Contraseña" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                                    <Input.Password onChange={(e) => { setRepit(e.target.value) }} placeholder="Confirmar contraseña" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                                    <Divider />
                                    <Input value={id} onChange={(e) => { setId(e.target.value) }} placeholder="Número de identificación" />
                                    <Input value={fullname} onChange={(e) => { setFullname(e.target.value) }} placeholder="Nombre completo" />
                                    <Input value={phone} onChange={(e) => { setPhone(e.target.value) }} placeholder="Número teléfonico" />
                                    <Input value={address} onChange={(e) => { setAddress(e.target.value) }} placeholder="Dirección" />
                                    <Input value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Correo electrónico" />
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

export default Update;