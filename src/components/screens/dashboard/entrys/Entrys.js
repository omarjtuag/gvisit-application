import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Layout, Row, Col, Button, Table, Tag, Space, Spin, Input, Modal } from 'antd';
import { PlusCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { GetAll } from '../../../../helpers/controllers/Guard';

const Entrys = () => {
    const [data, setData] = useState(null);
    const [staticData, setStaticData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [tmpId, setTmpId] = useState(null);
    const { Column } = Table;
    const { Search } = Input;
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    useEffect(() => {
        const request = async () => {
            const response = await GetAll();
            console.log(response);
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

    const filterByText = (value) => {
        if (value === '') {
            setData(staticData);
        } else {
            let tmp = staticData.filter((item) => item.motive.includes(value));
            setData(tmp);
        }
    }

    // const deleteMotive = async (id) => {
    //     setData(null);
    //     setStaticData(null);
    //     setModalVisible(false);
    //     const obj = {
    //         id: id
    //     };
    //     const response = await DeleteMotive(JSON.stringify(obj));
    //     if (response !== false) {
    //         const response = await GetAll();
    //         const object = JSON.parse(response);
    //         if (response !== false) {
    //             setData(object);
    //             setStaticData(object);
    //         } else {
    //             setData([]);
    //             setStaticData([]);
    //         }
    //     } else {
    //         const response = await GetAll();
    //         const object = JSON.parse(response);
    //         if (response !== false) {
    //             setData(object);
    //             setStaticData(object);
    //         } else {
    //             setData([]);
    //             setStaticData([]);
    //         }
    //     }
    // }

    return (
        <Layout style={{ background: 'white' }}>
            {/* <Modal
                title="Mensaje del sistema"
                visible={modalVisible}
                onOk={() => { deleteMotive(tmpId) }}
                onCancel={() => { setModalVisible(false) }}
                okText="Sí"
                cancelText="No">
                <p>¿Desea eliminar el motivo?</p>
            </Modal> */}
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
                            {/* <Column
                                title="Acción"
                                key="action"
                                render={(text, record) => (
                                    <>
                                        <Space size="small">
                                            <Link to={`/dashboard/motives/${record.id}`}>Editar</Link>
                                        </Space>
                                        <Space size="small" style={{ marginLeft: 10 }}>
                                            <Button onClick={() => {
                                                setTmpId(record.id);
                                                setModalVisible(true);
                                            }} type="text" style={{ color: 'red' }}>Eliminar</Button>
                                        </Space>
                                    </>
                                )}
                            /> */}
                        </Table>
                    </Col>}
            </Row>
        </Layout>
    );
}

export default Entrys;