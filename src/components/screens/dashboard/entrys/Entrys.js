import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Layout, Row, Col, Button, Table, Tag, Space, Spin, Input, Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { GetAll, UpdateEntry, UpdateEvac } from '../../../../helpers/controllers/Guard';

const Entrys = () => {
    const [data, setData] = useState(null);
    const [staticData, setStaticData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibles, setModalVisibles] = useState(false);
    const [tmpId, setTmpId] = useState(null);
    const { Column } = Table;
    const { Search } = Input;
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    useEffect(() => {
        const request = async () => {
            const response = await GetAll();
            const object = JSON.parse(response);
            if (response !== false) {
                setData(object);
                setStaticData(object);
            } else {
                setData([]);
                setStaticData([]);
            }
        };
        request();
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            const response = await GetAll();
            const object = JSON.parse(response);
            if (response !== false) {
                setData(object);
                setStaticData(object);
            } else {
                setData([]);
                setStaticData([]);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const filterByText = (value) => {
        if (value === '') {
            setData(staticData);
        } else {
            let tmp = staticData.filter((item) => item.empresa.includes(value) || item.nombre.includes(value) || item.apellido.includes(value) || item.edad.includes(value) || item.motivo.includes(value) || item.anfitrion.includes(value) || item.gafete.includes(value));
            setData(tmp);
        }
    }

    const updateEntry = async (id) => {
        setData(null);
        setStaticData(null);
        setModalVisible(false);
        const response = await UpdateEntry(id);
        if (response !== false) {
            const response = await GetAll();
            const object = JSON.parse(response);
            if (response !== false) {
                setData(object);
                setStaticData(object);
            } else {
                setData([]);
                setStaticData([]);
            }
        } else {
            const response = await GetAll();
            const object = JSON.parse(response);
            if (response !== false) {
                setData(object);
                setStaticData(object);
            } else {
                setData([]);
                setStaticData([]);
            }
        }
    }

    const updateExit = async () => {
        setData(null);
        setStaticData(null);
        setModalVisible(false);
        const response = await UpdateEvac();
        if (response !== false) {
            const response = await GetAll();
            const object = JSON.parse(response);
            if (response !== false) {
                setData(object);
                setStaticData(object);
            } else {
                setData([]);
                setStaticData([]);
            }
        } else {
            const response = await GetAll();
            const object = JSON.parse(response);
            if (response !== false) {
                setData(object);
                setStaticData(object);
            } else {
                setData([]);
                setStaticData([]);
            }
        }
    }

    return (
        <Layout style={{ background: 'white' }}>
            <Modal
                title="Mensaje del sistema"
                visible={modalVisibles}
                onOk={() => { updateExit() }}
                onCancel={() => { setModalVisibles(false) }}
                okText="Sí"
                cancelText="No">
                <p>¿Desea evacuar a todos los vistantes?</p>
            </Modal>
            <Modal
                title="Mensaje del sistema"
                visible={modalVisible}
                onOk={() => { updateEntry(tmpId) }}
                onCancel={() => { setModalVisible(false) }}
                okText="Sí"
                cancelText="No">
                <p>¿Desea dar salida al visitante seleccionado?</p>
            </Modal>
            <Row style={{ margin: 20 }}>
                <Col span={8}>
                    <Breadcrumb>
                        <Breadcrumb.Item>Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={'/dashboard/entrys'}>Entradas</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row style={{ marginVertical: 20 }}>
                <Col span={5}>
                    <Search
                        placeholder="Buscar"
                        allowClear
                        style={{ width: 200, marginLeft: 20 }}
                        onChange={(e) => { filterByText(e.target.value) }}
                    />
                    <Button onClick={() => { setModalVisibles(true) }} type="text" style={{ color: 'red', marginLeft: 10 }}>Evacuar</Button>
                </Col>
            </Row>
            <Row style={{ padding: 20 }}>
                {data === null ?
                    <Col span={24} style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                        <Spin indicator={antIcon} size='large' />
                    </Col> :
                    <Col span={24}>
                        <Table dataSource={data}>
                            <Column title="Nro Transacción" dataIndex="nroTransaccion" key="nroTransaccion" />
                            <Column title="Empresa" dataIndex="empresa" key="empresa" />
                            <Column title="Nombre" dataIndex="nombre" key="nombre" />
                            <Column title="Apellido" dataIndex="apellido" key="apellido" />
                            <Column title="Edad" dataIndex="edad" key="edad" />
                            <Column title="Motivo" dataIndex="motivo" key="motivo" />
                            <Column title="Anfitrión" dataIndex="anfitrion" key="anfitrion" />
                            <Column title="Gafete" dataIndex="gafete" key="gafete" />
                            <Column title="Motivo salida" dataIndex="motivoSalida" key="motivoSalida" />
                            <Column title="Fecha ingreso" dataIndex="fechaIngreso" key="fechaIngreso" />
                            <Column title="Fecha salida" dataIndex="fechaSalida" key="fechaSalida" />
                            <Column
                                title="Acción"
                                key="action"
                                render={(text, record) => (
                                    <>
                                        <Space size="small" style={{ marginLeft: 10 }}>
                                            <Button onClick={() => {
                                                setTmpId(record.nroTransaccion);
                                                setModalVisible(true);
                                            }} type="text" style={{ color: 'red' }}>Dar salida</Button>
                                        </Space>
                                    </>
                                )}
                            />
                        </Table>
                    </Col>}
            </Row>
        </Layout>
    );
}

export default Entrys;