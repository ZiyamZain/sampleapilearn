import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function BasicTable() {
  const [data, setData] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleAdd = () => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        const randomIndex = Math.floor(Math.random() * response.data.length);
        setData([...data, response.data[randomIndex]]);
      })
      .catch(error => {
        console.error('Error adding data: ', error);
      });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((row) => row.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <TextField value={searchTerm} onChange={handleSearch} placeholder="Search" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Body</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.body}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={handleAdd}>Add</Button>
    </div>
  );
}