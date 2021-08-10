import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import {
  DataGrid,
  GridToolbarFilterButton,
} from '@material-ui/data-grid';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import { createTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import axios from "../axios"
import "./List.css"


function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}


const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: theme.spacing(0.5, 0.5, 0),
      justifyContent: 'space-between',
      display: 'flex',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
    },
    textField: {
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
      margin: theme.spacing(1, 0.5, 1.5),
      '& .MuiSvgIcon-root': {
        marginRight: theme.spacing(0.5),
      },
      '& .MuiInput-underline:before': {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
    setup: {
      "& .MuiTypography-colorInherit": {
        color: "white",
        cursor:"pointer"
          },
       "& .MuiSelect-select.MuiSelect-select": {
            color: "white"
        },
      "& .MuiIconButton-colorInherit": {
          color: "white",
         
      },
      "& .MuiDataGrid-root .MuiDataGrid-cell--textLeft": {
        cursor: "pointer"
    }

    } 
  }),
  { defaultTheme },
);

function QuickSearchToolbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <GridToolbarFilterButton style={{backgroundColor:"white", color:"black"}} />
      </div>
      <h1 style={{fontSize:"30px", color:"rgb(130, 214, 81)"}}>Breaking Bad Characters</h1>
      <TextField
        variant="standard"
        value={props.value}
        style={{backgroundColor:"white"}}
        onChange={props.onChange}
        placeholder="Search…"
        className={classes.textField}
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? 'visible' : 'hidden' }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
      />
    </div>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};


const columns = [
  { field: 'char_id',
    headerName: 'ID',
     width: 100,
     sortable: true
   },
  { field: 'name',
    headerName: 'NAME',
     width: 150,
     sortable: true
   },
 
  {
    field: 'occupation',
    headerName: 'OCCUPATION',
    width: 190,
    sortable: false,
  },
  {
    field: 'birthday',
    headerName: 'BIRTHDAY',
    type: 'number',
    width: 150,
    sortable: false,
  },
  {
    field: 'status',
    headerName: 'STATUS',
    sortable: false,
    width: 130,
  },
];




export default function List() {

    const [characters, setCharacters] = useState([])
    const classes = useStyles()
    const history = useHistory()
    
  useEffect(() => {
    async function fetchData(){
        const request = await axios.get("/api/characters")
        setCharacters(request.data)
        
        return request
    }
    fetchData()
  }, [])

  
  
  const [searchText, setSearchText] = React.useState('')
  const [rows, setRows] = React.useState(characters)

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = rows.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
    console.log("New",rows)
  };

  React.useEffect(() => {
    setRows(characters); 
  }, [characters]);

  return (
    <div style={{ height: 500, width: '70%', marginLeft:"15%", marginTop:"3%" }} className={classes.setup}>
      <DataGrid
        components={{ Toolbar: QuickSearchToolbar}}
        style={{backgroundColor:"rgba(0,0,0,0.8)", color:"white", padding:"30px"}}
        rows={rows}
        className={classes.setup}
        getRowId={(row) => row.char_id}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        onRowClick={(rowData) =>
            history.push({
              pathname: '/info',
              data: rowData.row
            })}
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: (event) => requestSearch(event.target.value),
            clearSearch: () => {
              requestSearch('') 
              setRows(characters)},
            },

        }}
      />
    </div>
  );
}
