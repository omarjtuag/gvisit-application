import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Breadcrumb, Row, Col, Layout, Button, Typography, Space, Modal, Input, Divider, Select, Spin, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { GetAll } from '../../../../helpers/controllers/Motive';
import { CreateEntry } from '../../../../helpers/controllers/Access';

const Entry = () => {
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
    const [motives, setMotives] = useState([]);  
    const [badge, setBadge] = useState('');
    const [host, setHost] = useState('');
    const [motive, setMotive] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const { Title, Text } = Typography;
    const { Option } = Select;

    useEffect(() => {
        const request = async () => {
            const response = await GetAll();
            const object = JSON.parse(response);
            if (response !== false) {
                setMotives(object);
                setMotive(object[0].motive);
            } else {
                setMotives([]);
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

    const next = async () => {
        const response = await window.EntryController.searchUser();
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

    const getFingerprint = async () => {
        await window.EntryController.getFingerprint();
    }

    const registerEntry = async () => {
        if (badge === '' || host === '' || motive === '') {
            Modal.info({
                title: 'Mensaje del sistema',
                content: 'Debe rellenar todos los campos'
            });
        } else {
            const obj = {
                host: host,
                motive: motive,
                badge: badge,
                id: id
            };
            setIsLoading(true);
            const response = await CreateEntry(JSON.stringify(obj));
            if (response !== false) {
                openNotificationWithIcon('success', 'Entrada registrada exitosamente');
                history.push('/dashboard/access');
            } else {
                setIsLoading(false);
                openNotificationWithIcon('error', 'Error registrando entrada');
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
                            <Link to={'/dashboard/access'}>Selección</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={'/dashboard/access/entry'}>Entrada</Link>
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
                                        <Title level={3}>Ingresa la información solicitada</Title>                                        
                                        <Input onChange={(e) => { setBadge(e.target.value) }} value={badge} style={{ marginTop: 10 }} placeholder="Nro de gafete" />
                                        <Input onChange={(e) => { setHost(e.target.value) }} value={host} style={{ marginTop: 10 }} placeholder="Nombre de la persona a visitar" />
                                        {
                                            motives.length > 0 &&
                                            <>
                                                <Text style={{ marginTop: 10 }}>Motivo</Text>
                                                <Select style={{ width: '100%' }} onChange={(value) => {
                                                    setMotive(value);
                                                }} defaultValue={motives[0].motive}>
                                                    {
                                                        motives.map((item, index) => {
                                                            return (
                                                                <Option key={index} value={item.motive}>{item.motive}</Option>
                                                            );
                                                        })
                                                    }
                                                </Select>
                                            </>
                                        }
                                        <Divider />
                                        <Title level={3}>Información de usuario</Title>
                                        <Title level={5}>{`${name} ${lastname}`}</Title>
                                        <Title level={5}>{`${birthday}`}</Title>
                                        {
                                            isRfc && <Title level={5}>{`${rfc}`}</Title>
                                        }
                                        {isLoading ?
                                            <Spin indicator={antIcon} />
                                            :
                                            <Button onClick={registerEntry} style={{ marginTop: 10, width: '100%' }} type="primary">Registrar entrada</Button>}
                                    </Space>
                                </Row>
                            </Col>
                        </>
                        :
                        <Row align="middle" justify="center" style={{ marginTop: 40, width: '100%' }}>
                            <Space direction="vertical">
                                <Title level={3}>Presiona iniciar para ingresar huella</Title>
                                <Button type="primary" onClick={getFingerprint}>Iniciar</Button>
                                <Button type="default" onClick={next}>Siguiente</Button>
                            </Space>
                        </Row>
                }
            </Row>
        </Layout>
    );
}

export default Entry;