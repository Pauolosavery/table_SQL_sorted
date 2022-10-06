/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState, useRef } from 'react';

import {
  CssBaseline,
  Box,
  Container,
  TextField,
  Button,
  Alert,
  Stack,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Pagination,
} from '@mui/material';
import dayjs from 'dayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { fetchCreateItem, fetchGetItems } from '../redux/thunk/thunk';
import List from '../List/List.jsx';
import style from './App.module.css';

function App() {
  const { items, pageCount } = useSelector((state) => state.items);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [date, setDate] = useState(dayjs('2014-08-18T21:11:54'));
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [distance, setDistance] = useState('');
  const [error, setError] = useState(false);
  const inputTitle = useRef(null);
  const inputAmount = useRef(null);
  const inputDistance = useRef(null);
  const inputOPT = useRef(null);
  const [sorted, setSorted] = useState('');
  const [inputOption, setInputOption] = useState('');
  const [sortedOption, setSortedOption] = useState('');

  const handleChangeSelect = (event) => {
    setSorted(event.target.value);
  };
  const handleChangeSelectOption = (event) => {
    setSortedOption(event.target.value);
  };
  const handleChange = (newDate) => {
    setDate(newDate?.$d);
  };
  useEffect(() => {
    if (inputOption && sorted && sortedOption) {
      const query = `?sorted=${sorted}&inputOption=${inputOption}&sortedOption=${sortedOption}&page=${page}`;
      dispatch(fetchGetItems(query));
    } else {
      const query = `?&page=${page}`;
      dispatch(fetchGetItems(query));
    }
  }, [inputOption, sorted, sortedOption, page]);
  const addNewItem = async () => {
    const body = {
      date,
      title,
      amount,
      distance,
    };
    if (title && amount && distance) {
      setError(() => false);
      dispatch(fetchCreateItem(body));
      inputTitle.current.querySelector('input').value = '';
      inputAmount.current.querySelector('input').value = '';
      inputDistance.current.querySelector('input').value = '';
      // inputDate.current.querySelector('input').value = '';
      setTitle('');
      setAmount('');
      setDistance('');
    } else {
      setError(() => 'Все поля должны быть заполнены');
    }
  };
  return (
    <div className={style.App}>
      <Box className={style.box} sx={{ width: '100%', maxWidth: 500 }}>
        <Typography className={style.typography} variant="h2" gutterBottom>
          Раздел событий
        </Typography>
      </Box>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              '& .MuiTextField-root': { width: '100%' },
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  required
                  label="Введите дату"
                  inputFormat="MM/DD/YYYY"
                  value={date}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
            <TextField
              className={style.TextField}
              onChange={(e) => setTitle(() => e.target.value)}
              onFocus={() => setError(() => false)}
              margin="normal"
              required
              label="Название"
              ref={inputTitle}
            />
            <TextField
              className={style.TextField}
              onFocus={() => setError(() => false)}
              onChange={(e) => setAmount(() => e.target.value)}
              margin="normal"
              required
              id="outlined-required"
              label="Количество"
              ref={inputAmount}
            />
            <TextField
              className={style.TextField}
              onFocus={() => setError(() => false)}
              onChange={(e) => setDistance(() => e.target.value)}
              margin="normal"
              required
              id="outlined-required"
              label="Расстояние"
              ref={inputDistance}
            />
            <Button
              variant="contained"
              color="success"
              onClick={addNewItem}
            >
              Добавить событие
            </Button>
            {error
              ? <Stack
                className={style.error}
                sx={{ width: '100%' }}
                spacing={2}
              >
                <Alert severity="error">{error}</Alert>
              </Stack>
              : <div className={style.error}></div>
            }
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Поле сортировки</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sorted}
                  label="SelectSort"
                  onChange={handleChangeSelect}
                >
                  <MenuItem value={'title'}>Название</MenuItem>
                  <MenuItem value={'amount'}>Количество</MenuItem>
                  <MenuItem value={'distance'}>Расстояние</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {sorted === 'title'
              ? <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Опции</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sortedOption}
                    label="Options"
                    onChange={handleChangeSelectOption}
                  >
                    <MenuItem value={'iRegexp'}>содержить</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              : <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Опции</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sortedOption}
                    label="Options"
                    onChange={handleChangeSelectOption}
                  >
                    <MenuItem value={'eq'}>равно</MenuItem>
                    <MenuItem value={'gt'}>больше</MenuItem>
                    <MenuItem value={'lt'}>меньше</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            }
            <TextField
              className={style.TextField}
              onFocus={() => setError(() => false)}
              onChange={(e) => setInputOption(() => e.target.value)}
              margin="normal"
              required
              id="outlined-required"
              label="Опции"
              ref={inputOPT}
            />
          </Box>
          <Pagination
          count={pageCount}
          page={page}
          onChange={(e, num) => setPage(num)}/>
          <List />
        </Container>
      </React.Fragment>
    </div>
  );
}

export default App;
