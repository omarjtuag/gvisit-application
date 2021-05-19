import React, { useState, useEffect, useContext } from 'react';
import { Spin, PageHeader, Button, Tooltip, Switch, Badge, Typography } from 'antd';
import { LoadingOutlined, BellOutlined, LogoutOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
    const isLoading = useSelector(state => state.auth.isLoading);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const { Text } = Typography;

    const singOut = () => {
        window.AuthController.signout();
    }

    return (
        <PageHeader style={{ borderBottom: '1px solid #474747', background: '#222223', alignContent: 'center', paddingTop: 10, paddingBottom: 10, paddingLeft: 30, paddingRight: 30, }} title={<Text style={{ color: 'white' }}>GVisit</Text>} extra={[
            <Text style={{ color: 'white' }}>Lector iniciado</Text>,
            isLoading ?
                <Spin indicator={antIcon} style={{ marginLeft: 5, color: '#009600' }} /> :
                <Tooltip title="Cerrar sesión">
                    <Button onClick={singOut} shape="circle" type="text" icon={<LogoutOutlined />} style={{ color: 'white' }} />
                </Tooltip>
        ]} />
    );
}

export default Navbar;