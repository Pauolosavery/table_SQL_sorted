/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useDispatch, useSelector } from 'react-redux';
import style from './List.module.css';

import { fetchGetItems } from '../redux/thunk/thunk';
import ItemComp from '../Item/Item.jsx';

export default function List() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.items);
  const [titleSort, setTitleSort] = useState('');
  const [amountSort, setAmountSort] = useState('');
  const [distanceSort, setDistanceSort] = useState('');

  const rows = items.sort((a, b) => a.id - b.id);
  useEffect(() => {
    dispatch(fetchGetItems());
  }, [dispatch]);
  const columns = [
    {
      field: 'date', headerName: 'Дата', width: 70, sortable: true,
    },
    {
      field: 'title',
      headerName: 'Название',
      description: 'Описание события',
      width: 160,
    },
    {
      field: 'amount', headerName: 'Количество', width: 160,
    },
    {
      field: 'distance',
      headerName: 'Дистанция',
      width: 100,
    },
    {
      field: 'edit',
      headerName: 'Редактировать',
      width: 100,
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Дата</TableCell>
            <TableCell align="center">Название</TableCell>
            <TableCell align="center">Количество</TableCell>
            <TableCell align="center">Расстояние</TableCell>
            <TableCell align="center">Редактировать</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.date}</TableCell>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">{row.amount}</TableCell>
              <TableCell align="center">{row.distance}</TableCell>
              <TableCell align="center"><ItemComp id={row.id}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
}
