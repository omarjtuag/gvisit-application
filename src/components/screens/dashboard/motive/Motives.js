import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Layout, Row, Col, Button, Table, Tag, Space, Spin, Input, Modal } from 'antd';
import { PlusCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { GetAll, DeleteMotive } from '../../../../helpers/controllers/Motive';

const Motives = () => {
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

    const deleteMotive = async (id) => {
        setData(null);
        setStaticData(null);
        setModalVisible(false);
        const obj = {
            id: id
        };
        const response = await DeleteMotive(JSON.stringify(obj));
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
                visible={modalVisible}
                onOk={() => { deleteMotive(tmpId) }}
                onCancel={() => { setModalVisible(false) }}
                okText="Sí"
                cancelText="No">
                <p>¿Desea eliminar el motivo?</p>
            </Modal>
            <Row style={{ margin: 20 }}>
                <Col span={8}>
                    <Breadcrumb>
                        <Breadcrumb.Item>Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={'/dashboard/motives'}>Motivos</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Col span={8} offset={8} style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Link to={'/dashboard/motives/create'}>
                        <Button type="primary" icon={<PlusCircleOutlined />} size='middle'>
                            Nuevo
                        </Button>
                    </Link>
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
                            <Column title="ID" dataIndex="id" key="id" />
                            <Column title="Descripción" dataIndex="motive" key="motive" />                          
                            <Column
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
                            />
                        </Table>
                    </Col>}
            </Row>
        </Layout>
    );
}

export default Motives;