import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../../components/menu/Sidebar';
import Navbar from '../../components/menu/Navbar';
import DashboardRouter from './DashboardRouter';

const DashboardLayout = () => {
    const { Content } = Layout;

    return (
        <Layout style={{ height: '100vh' }}>
            <Navbar />
            <Layout>
                <Sidebar />
                <Content style={{ background: '#FFF' }}>
                    <DashboardRouter />
                </Content>
            </Layout>
        </Layout>
    );
}

export default DashboardLayout;