import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import Sidebar from '../../components/menu/Sidebar';
import Navbar from '../../components/menu/Navbar';
import DashboardRouter from './DashboardRouter';

const DashboardLayout = () => {
    const { Content, Footer } = Layout;
    const [image, setImage] = useState('');

    useEffect(() => {
        const request = async () => {
            const response = await window.SettingsController.listSetting();
            const object = JSON.parse(response);
            setImage(object.image);
        };
        request();
    }, [])

    return (
        <Layout style={{ height: '100vh' }}>
            <Navbar />
            <Layout>
                <Sidebar />
                <Content style={{ background: '#FFF' }}>
                    <DashboardRouter />
                </Content>
                <Footer style={{ background: 'white' }}>
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', alignContent: 'flex-end' }}>
                        <img style={{ height: 200, width: 200 }} src={`data:image/png;base64,${image}`} />
                    </div>
                </Footer>
            </Layout>
        </Layout>
    );
}

export default DashboardLayout;