/* eslint-disable no-unused-vars */
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpdateItem, fetchItemDel } from '../redux/thunk/thunk';

export default function ItemComp({ id }) {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.items);
  const item = items.filter((u) => u.id === id)[0];
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [distance, setDistance] = useState('');
  const [errorFN, setErrorFN] = useState(false);
  const [errorJT, setErrorJT] = useState(false);

  useEffect(() => {
    if (!title && !amount && !distance) {
      setErrorFN('поле Название должно быть заполнено');
    } else {
      setErrorFN(false);
    }
  }, [title, amount, distance]);
  const handleClickOpen = () => {
    setDate(() => item.date);
    setTitle(() => item.title);
    setAmount(() => item.amount);
    setDistance(() => item.distance);
    setOpen(true);
  };

  const handleSaveClose = () => {
    setOpen(false);
    setTitle(() => '');
    setAmount(() => '');
    setDate(() => '');
    setDistance(() => '');
    const body = {
      id, date, title, distance, amount,
    };
    dispatch(fetchUpdateItem(body));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDel = () => {
    setOpenDel(true);
  };

  const handleCloseDelYes = () => {
    setOpenDel(false);
    const body = {
      id,
    };
    dispatch(fetchItemDel(body));
  };

  const handleCloseDel = () => {
    setOpenDel(false);
  };
  return (
    <>
      <IconButton
        onClick={handleClickOpen}
        aria-label="edit" component="label"
      >
        <EditOutlinedIcon />
      </IconButton>
      <IconButton
        onClick={handleClickOpenDel}
        aria-label="delete" component="delete"
      >
        <DeleteForeverOutlinedIcon />
      </IconButton>
      {openDel
        ? <Dialog open={openDel} onClose={handleCloseDel}>
          <DialogTitle>Удаление</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Вы действитeльно хотите удалить событие #{id} из списка?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelYes}>Да</Button>
            <Button onClick={handleCloseDel}>Отмена</Button>
          </DialogActions>
        </Dialog>
        : <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Редактирование</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Вы действитeльно хотите изменить данные события #{id}?
            </DialogContentText>
            <TextField
              margin="dense"
              id="name"
              label="Дата"
              type="text"
              defaultValue={item.date}
              onChange={(e) => { setDate(() => e.target.value); }}
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Наименование"
              type="text"
              defaultValue={item.title}
              onChange={(e) => { setTitle(() => e.target.value); }}
              fullWidth
              variant="standard"
            />
            {errorFN
              ? <label style={{ color: 'red' }}>{errorFN}</label>
              : <></>
            }
            <TextField
              margin="dense"
              id="name"
              label="Количество"
              type="text"
              defaultValue={item.amount}
              onChange={(e) => { setTitle(() => e.target.value); }}
              fullWidth
              variant="standard"
            />
            {errorJT
              ? <label style={{ color: 'red' }}>Поле Количество не может быть пустым</label>
              : <></>
            }
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Расстояние"
              type="text"
              defaultValue={item.distance}
              onChange={(e) => { setDistance(() => e.target.value); }}
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            {errorFN
              ? <Button disabled>Записать</Button>
              : <Button onClick={handleSaveClose}>Записать</Button>
            }
            <Button onClick={handleClose}>Проверю</Button>
          </DialogActions>
        </Dialog>
      }

    </>
  );
}
