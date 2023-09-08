import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';

import * as api from "../../../../api";
import * as actions from "../../../../redux/actions";
import { usersState$ } from '../../../../redux/selectors';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 }, // Thêm cột ID
    { field: 'USER_NAME', headerName: 'UserName', width: 150 },
    { field: 'EMAIL', headerName: 'Email', width: 200 },
    { field: 'ROLE', headerName: 'Role', width: 150 },
];

export default function Users() {
    const dispatch = useDispatch();
    const users = useSelector(usersState$);
    let user = users?.data || [];

    user = user.map((userData, index) => ({
        ...userData,
        id: index + 1,
    }));

    useLayoutEffect(() => {
        const fetchData = async () => {
            await Promise.all([
                dispatch(actions.getUsers.getUsersRequest()),
            ]);
        };

        fetchData();
    }, [dispatch]);

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={user}
                columns={columns}
                pageSize={5}
                checkboxSelection
            />
        </div>
    );
}
