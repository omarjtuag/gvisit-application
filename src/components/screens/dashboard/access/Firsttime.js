import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Breadcrumb, Steps, Row, Col, Layout, Button, Typography, Space, Modal, Input, Select, Spin, notification, Checkbox, DatePicker } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';
import { GetPolicy, GetSetting, CreateVisitor } from '../../../../helpers/controllers/Access';
import { GetAll } from '../../../../helpers/controllers/Motive';

const steps = [
    {
        title: 'Política de ingreso',
        content: 'First-content',
    },
    {
        title: 'Tomar Fotografía',
        content: 'Second-content',
    },
    {
        title: 'Captura de huellas',
        content: 'Last-content',
    },
    {
        title: 'Ingresar información',
        content: 'Last-content',
    }
];

const Firsttime = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [current, setCurrent] = useState(0);
    const [settings, setSettings] = useState(null);
    const [policy, setPolicy] = useState('');
    const [motives, setMotives] = useState([]);
    const [motive, setMotive] = useState('');
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [isRfc, setIsRfc] = useState(false);
    const [rfc, setRfc] = useState('');
    const [company, setCompany] = useState('');
    const [badge, setBadge] = useState('');
    const [host, setHost] = useState('');
    const [setupDatetime, setSetupDatetime] = useState('');
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const { Title, Text } = Typography;
    const { Option } = Select;
    const { Step } = Steps;
    const { TextArea } = Input;

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: 'Mensaje del sistema',
            description: message
        });
    };

    useEffect(() => {
        const request = async () => {
            const response = await GetPolicy();
            setPolicy(response);
        };
        request();
    }, []);

    useEffect(() => {
        const request = async () => {
            const response = await GetSetting();
            const object = JSON.parse(response);
            setSettings(object);
        };
        request();
    }, []);

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

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const register = async () => {
        if (userId === '' || motive === '' || name === '' || lastname === '' || company === '' || host === '' || badge === '' || setupDatetime === '') {
            Modal.info({
                title: 'Mensaje del sistema',
                content: 'Debe rellenar todos los campos'
            });
        } else {
            setIsLoading(true);
            const obj = {
                userId: userId,
                name: name,
                lastname: lastname,
                company: company,
                isRfc: isRfc,
                rfc: rfc,
                dateBirth: setupDatetime,
                badge: badge,
                host: host,
                motive: motive
            };
            const response = await CreateVisitor(JSON.stringify(obj));
            if (response !== false) {
                openNotificationWithIcon('success', 'Entrada registrada exitosamente');
                history.push('/dashboard/access');
            } else {
                setIsLoading(false);
                openNotificationWithIcon('error', 'Error registrando entrada');
            }
        }
    };

    const makePicture = async () => {
        await window.FirstController.doCapture();
    };

    const registerFingerprint = async () => {
        await window.FirstController.doFingerprint();
    };

    const renderBody = (step) => {
        if (step === 0) {
            return (
                <Col span={24} style={{ width: '100%', padding: 20 }}>
                    <Title level={3}>Política de ingreso</Title>
                    <TextArea value={policy} rows={5} style={{ border: '0px solid white' }} />
                </Col>
            );
        };

        if (step === 1) {
            return (
                <Row style={{ width: '100%', padding: 50 }} align="middle" justify="center">
                    <Space direction="vertical">
                        <Title level={3}>Presiona para tomar fotografía</Title>
                        <Button type="primary" onClick={makePicture}>
                            Tomar fotografía
                        </Button>
                    </Space>
                </Row>
            );
        };

        if (step === 2) {
            return (
                <Row style={{ width: '100%', padding: 50 }} align="middle" justify="center">
                    <Space direction="vertical">
                        <Title level={3}>Presiona para ingresar huellas</Title>
                        <Button type="primary" onClick={registerFingerprint}>
                            Registrar huellas
                        </Button>
                    </Space>
                </Row>
            );
        };

        if (step === 3) {
            return (
                <Row style={{ padding: 20 }}>
                    <Col span={12}>
                        <Row style={{ width: '100%' }}>
                            <Space direction="vertical">
                                <Title level={3}>Ingresa la información solicitada</Title>
                                <Input onChange={(e) => { setCompany(e.target.value) }} value={company} style={{ marginTop: 10 }} placeholder="Empresa" />
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
                            </Space>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row style={{ width: '100%' }}>
                            <Space direction="vertical">
                                <Title level={3}>Ingresa la información de usuario</Title>
                                {
                                    settings.useDNI === true && <Input onChange={(e) => { setUserId(e.target.value) }} value={userId} style={{ marginTop: 10 }} placeholder="Número de identificación" />
                                }
                                <Input onChange={(e) => { setName(e.target.value) }} value={name} style={{ marginTop: 10 }} placeholder="Nombre" />
                                <Input onChange={(e) => { setLastname(e.target.value) }} value={lastname} style={{ marginTop: 10 }} placeholder="Apellido" />
                                <Checkbox onChange={() => { setIsRfc(!isRfc) }} checked={isRfc}>Cuenta con RFC</Checkbox>
                                {
                                    isRfc && <Input onChange={(e) => { setRfc(e.target.value) }} value={rfc} placeholder="Rfc" />
                                }
                                {
                                    settings.useDate === true && <DatePicker placeholder="Fecha de nacimiento" format="YYYY-MM-DD HH:mm:ss" showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }} onChange={(e) => { setSetupDatetime(e.format("YYYY-MM-DD HH:mm:ss").toString()) }} />
                                }
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
                            <Link to={'/dashboard/access/firsttime'}>Primer acceso</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row style={{ padding: 20 }}>
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
                            <Button type="primary" onClick={register}>
                                Registrar usuario y entrada
                            </Button>
                        )}
                        {current > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                Previo
                            </Button>
                        )}
                    </div>
                </Space>
            </Row>
        </Layout>
    );
}

export default Firsttime;