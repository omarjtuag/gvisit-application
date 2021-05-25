import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Typography, Input, Button, Space, Modal, Spin, notification } from 'antd';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LoadingOutlined } from '@ant-design/icons';
import { Login as LoginAction, CleanUp } from '../../../actions/authActions';
import Logo from '../../../assets/logo.png';

const Login = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.auth.isLoading);
    const { Text, Title } = Typography;
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    useEffect(() => {
        dispatch(CleanUp());
    }, []);

    const signIn = () => {
        if (user === '' || pass === '') {
            Modal.info({
                title: 'Mensaje del sistema',
                content: 'Debe rellenar todos los campos'
            });
        } else {
            const obj = {
                user: user,
                pass: pass
            };
            dispatch(LoginAction(JSON.stringify(obj)));
        }
    }

    return (
        <Row>
            <Col span={24}>
                <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', height: '80vh' }}>
                    <Col span={12}>
                        <Space direction='vertical'>                            
                            <img src={Logo} style={{ height: 150, width: 250, alignSelf: 'center' }} />
                            <Text style={{ textAlign: 'center', alignSelf: 'center' }}>Introduce tus datos para iniciar sesión</Text>
                            <Input onPressEnter={signIn} onChange={(e) => { setUser(e.target.value) }} style={{ marginTop: 20 }} prefix={<UserOutlined />} placeholder="Usuario" />
                            <Input.Password onPressEnter={signIn} onChange={(e) => { setPass(e.target.value) }} placeholder="Contraseña" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                            <Link to="/auth/first"><Text>¿Primer acceso? Pulsa aquí </Text></Link>
                            {isLoading ?
                                <Spin indicator={antIcon} style={{ alignSelf: 'center', color: '#009600', marginTop: 10 }} /> :
                                <Button type="primary" style={{ marginTop: 10 }} block onClick={signIn}>
                                    Iniciar
                                </Button>}
                        </Space>
                    </Col>
                </Row>
                <Row style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text strong style={{ marginTop: 10 }}>GVisit © 2021. V2.0.15</Text>
                </Row>
            </Col>
        </Row>
    );
}

export default Login;