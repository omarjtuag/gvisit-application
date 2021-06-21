import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Breadcrumb, Steps, Row, Col, Layout, Button, Typography, Space, Modal, Input, Spin, notification, Checkbox, DatePicker } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import InputMask from 'react-input-mask';
import moment from 'moment';
import { UpdateVisitor, GetSetting } from '../../../../helpers/controllers/Access';

const steps = [
    {
        title: 'Tomar Fotografía'
    },
    {
        title: 'Captura de huellas'
    },
    {
        title: 'Actualizar información'
    }
];

const Update = () => {
    const history = useHistory();
    const [settings, setSettings] = useState(null);
    const [current, setCurrent] = useState(0);
    const [fingerprint, setFingerprint] = useState(false);
    const [id, setId] = useState('');
    const [company, setCompany] = useState('');
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [isRfc, setIsRfc] = useState('');
    const [rfc, setRfc] = useState('');
    const [birthday, setBirthday] = useState('');
    const [image, setImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const { Title, Text } = Typography;
    const { Step } = Steps;

    useEffect(() => {
        const request = async () => {
            const response = await GetSetting();
            const object = JSON.parse(response);
            setSettings(object);
        };
        request();
    }, []);

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: 'Mensaje del sistema',
            description: message
        });
    };

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const getFingerprint = async () => {
        const response = await window.UpdateController.getFingerprint();
        const object = JSON.parse(response);
        if (object.success === false) {
            Modal.error({
                title: 'Mensaje del sistema',
                content: object.message
            });
        } else {
            setId(object.user.id);
            setUserId(object.user.userId);
            setCompany(object.user.company);
            setName(object.user.name);
            setLastname(object.user.lastname);
            setIsRfc(object.user.isRfc);
            setRfc(object.user.rfc);
            setBirthday(object.user.birthday);
            setImage(object.user.image);
            setFingerprint(true);
        }
    };

    const makePicture = async () => {
        await window.UpdateController.doCapture();
    };

    const registerFingerprint = async () => {
        await window.UpdateController.doFingerprint();
    };

    const updateVisitor = async () => {
        if (name === '' || lastname === '') {
            Modal.info({
                title: 'Mensaje del sistema',
                content: 'Debe rellenar todos los campos'
            });
        } else {
            setIsLoading(true);
            const obj = {
                userId: userId,
                company: company,
                name: name,
                lastname: lastname,
                isRfc: isRfc,
                rfc: rfc,
                dateBirth: birthday
            };
            const response = await UpdateVisitor(JSON.stringify(obj));
            if (response !== false) {
                openNotificationWithIcon('success', 'Usuario modificado exitosamente');
                history.push('/dashboard/access');
            } else {
                setIsLoading(false);
                openNotificationWithIcon('error', 'Error modificando usuario');
            }
        }
    };

    const renderBody = (step) => {
        if (step === 0) {
            return (
                <Row style={{ width: '100%', padding: 50 }} align="middle" justify="center">
                    <Space direction="vertical">
                        <img height={200} width={200} src={`data:image/png;base64,${image}`} />
                        <Text style={{ marginTop: 10 }}>Imagen actual</Text>
                        <Button type="primary" onClick={makePicture} style={{ marginTop: 10 }}>
                            Modificar fotografía
                        </Button>
                    </Space>
                </Row>
            );
        };

        if (step === 1) {
            return (
                <Row style={{ width: '100%', padding: 50 }} align="middle" justify="center">
                    <Space direction="vertical">
                        <Title level={3}>Presiona para modificar huellas</Title>
                        <Button type="primary" onClick={registerFingerprint}>
                            Modificar huellas
                        </Button>
                    </Space>
                </Row>
            );
        };

        if (step === 2) {
            return (
                <Row style={{ padding: 20 }}>
                    <Col span={24}>
                        <Row style={{ width: '100%' }}>
                            <Space direction="vertical">
                                <Title level={3}>Ingresa la información de usuario</Title>
                                <Input onFocus={() => { window.AuthController.openKeyboard(); }} onChange={(e) => { setCompany(e.target.value) }} value={company} style={{ marginTop: 10 }} placeholder="Empresa" />
                                {
                                    settings.useDNI === true && <Input onFocus={() => { window.AuthController.openKeyboard(); }} onChange={(e) => { setUserId(e.target.value) }} value={userId} style={{ marginTop: 10 }} placeholder="Número de identificación" />
                                }
                                <Input onFocus={() => { window.AuthController.openKeyboard(); }} onChange={(e) => { setName(e.target.value) }} value={name} style={{ marginTop: 10 }} placeholder="Nombre" />
                                <Input onFocus={() => { window.AuthController.openKeyboard(); }} onChange={(e) => { setLastname(e.target.value) }} value={lastname} style={{ marginTop: 10 }} placeholder="Apellido" />
                                <Checkbox onChange={() => { setIsRfc(!isRfc) }} checked={isRfc}>Cuenta con RFC</Checkbox>
                                {
                                    isRfc && <Input onFocus={() => { window.AuthController.openKeyboard(); }} onChange={(e) => { setRfc(e.target.value) }} value={rfc} placeholder="Rfc" />
                                }
                                {
                                    settings.useDate === true &&
                                    <InputMask mask="99/99/9999" value={birthday} onFocus={() => { window.AuthController.openKeyboard(); }} onChange={(e) => { setBirthday(e.target.value); }}>
                                        {(inputProps) => <Input {...inputProps} />}
                                    </InputMask>
                                }
                                {/* <DatePicker placeholder="Fecha de nacimiento" format="YYYY-MM-DD HH:mm:ss" value={birthday} showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }} onChange={(e) => { setBirthday(e.format("YYYY-MM-DD HH:mm:ss").toString()) }} /> */}
                                {isLoading &&
                                    <Spin indicator={antIcon} />
                                }
                            </Space>
                        </Row>
                    </Col>
                </Row>
            );
        };
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
                            <Link to={'/dashboard/access/update'}>Actualizar información</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row style={{ padding: 20 }}>
                {
                    fingerprint ?
                        <>
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Steps current={current}>
                                    {steps.map(item => (
                                        <Step key={item.title} title={item.title} />
                                    ))}
                                </Steps>
                                <div className="steps-content">
                                    {renderBody(current)}
                                </div>
                                <div className="steps-action" style={{ marginTop: 20 }}>
                                    {current < steps.length - 1 && (
                                        <Button type="primary" onClick={() => next()}>
                                            Siguiente
                                        </Button>
                                    )}
                                    {current === steps.length - 1 && (
                                        <Button type="primary" onClick={updateVisitor}>
                                            Actualizar información
                                        </Button>
                                    )}
                                    {current > 0 && (
                                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                            Previo
                                        </Button>
                                    )}
                                </div>
                            </Space>
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

export default Update;