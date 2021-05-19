import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, FilePdfOutlined, FormOutlined, ToolOutlined, FileAddOutlined, PieChartOutlined, OrderedListOutlined } from '@ant-design/icons';

const Sidebar = () => {
    const { Sider } = Layout;

    return (
        <Sider width={200} className="site-layout-background" style={{ borderRight: '0.5px solid #474747' }}>
            <Menu
                theme="dark"
                mode="inline"
                style={{ height: '100%', background: '#222223' }}>
                <Menu.ItemGroup key="g1" title="Catálogos">
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Link to={'/dashboard/users'}>
                            Usuarios
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<FileAddOutlined />}>
                        <Link to={'/dashboard/motives'}>
                            Motivos
                        </Link>
                    </Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g2" title="Operaciones">
                    <Menu.Item key="3" icon={<FormOutlined />}>
                        <Link to={'/dashboard/access'}>
                            Accesos
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<OrderedListOutlined />}>
                        <Link to={'/dashboard/visits'}>
                            Entradas
                        </Link>
                    </Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g3" title="Reportes">
                    <Menu.Item key="5" icon={<PieChartOutlined />}>
                        <Link to={'/dashboard/access'}>
                            Gráficos
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="6" icon={<FilePdfOutlined />}>
                        <Link to={'/dashboard/access'}>
                            Reportes
                        </Link>
                    </Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g4" title="Configuración">
                    <Menu.Item key="7" icon={<ToolOutlined />}>
                        <Link to={'/dashboard/settings'}>
                            Configuración del sistema
                        </Link>
                    </Menu.Item>
                </Menu.ItemGroup>
            </Menu>
        </Sider>
    );
}

export default Sidebar;