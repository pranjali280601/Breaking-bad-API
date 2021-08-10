import React, {useState, useEffect} from "react"
import {useHistory, useLocation} from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles'
import { Paper } from "@material-ui/core"
import { Button } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { Table } from '@material-ui/core'
import { TableBody } from '@material-ui/core'
import { TableCell } from '@material-ui/core'
import { TableRow } from '@material-ui/core'

import axios from "../axios"
import "./Info.css"


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: "20%",
        marginTop:"8%",
        marginBottom:"5%", 
        padding:"20px",
        color: "white",
        height:"350px",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        overflowY:"scroll"
      },
      table: {
        "& .MuiTableCell-body" :{
            color: "#fff",
            borderBottom:"none"
        },
        "& .MuiTypography-colorInherit": {
            color: "#fff",
            borderBottom:"none"
              },
        "& .MuiTableCell-root": {
            borderBottom: "none",
            color:"white"
        }
      },
    },
  }))

const Info = () =>{

    const history = useHistory()
    const classes = useStyles();
    const { data } = useLocation()

    const [quotes, setQuotes] = useState([])

    const arr = data.name.split(" ")
    var str = arr[0]
    for(var i = 1; i < arr.length ; i++){
        str+="+"+arr[i]
    }

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(`/api/quote?author=${str}`)
            setQuotes(request.data)
            return request
        }
        fetchData()
      }, [])


    return(
        <div className = {classes.root}>
            <Paper elevation = {3} >
                <Grid container spacing = {1}>
                    <Grid item xs={12} sm={6} style={{textAlign:"center"}}>
                        <img className="photo" src = {data.img} alt="" />
                        <br></br>
                        <Button variant="contained" style={{backgroundColor:"rgb(86, 252, 141)", height:"30px", width:"100px"}}
                        onClick={()=>{history.push('/')}}>
                        Back
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <h1>{data.name}</h1>
                        <Table>
                            <TableBody>
                                <TableRow key={data.name}>
                                <TableCell align="left" style={{color:"white", borderBottom:"none"}}><b>Birthday :</b></TableCell>
                                <TableCell align="left" style={{color:"white", borderBottom:"none"}}>{data.birthday}</TableCell>
                                </TableRow>
                                <TableRow key={data.name}>
                                <TableCell align="left" style={{color:"white", borderBottom:"none"}}><b>Status :</b></TableCell>
                                <TableCell align="left" style={{color:"white", borderBottom:"none"}}>{data.status}</TableCell>
                                </TableRow>
                                <TableRow key={data.name}>
                                <TableCell align="left" style={{color:"white", borderBottom:"none"}}><b>Nickname :</b></TableCell>
                                <TableCell align="left" style={{color:"white", borderBottom:"none"}}>{data.nickname}</TableCell>
                                </TableRow>
                                <TableRow key={data.name}>
                                <TableCell align="left" style={{color:"white", borderBottom:"none"}}><b>Portrayed :</b></TableCell>
                                <TableCell align="left" style={{color:"white", borderBottom:"none"}}>{data.portrayed}</TableCell>
                                </TableRow>
                                <TableRow key={data.name}>
                                <TableCell align="left" style={{color:"white", borderBottom:"none"}}><b>Occupation:</b></TableCell>
                                <TableCell align="left" style={{color:"white", borderBottom:"none"}}>{data.occupation.map(item=>{
                                    return (
                                        <span style={{color:"white"}}>{item}, </span>)
                                    })}
                                </TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell align="left" style={{color:"white", borderBottom:"none"}}><b>Seasons Appeared:</b></TableCell>
                                <TableCell align="left" style={{color:"white", borderBottom:"none"}}>{data.appearance.map(item=>{
                                    return (
                                        <span style={{color:"white"}}>{item}, </span>)
                                    })}
                                </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        <h2>Quotes :</h2>
                        {   
                            quotes && quotes.length!=0 ? quotes.map(quote=>{
                                console.log(quote.quote) 
                                return(
                                <p style={{color:"white"}}> &#11088; {quote.quote}</p>
                                )
                            }) : <p>-None-</p>
                        }
                    </Grid>
                </Grid>
                

            </Paper>
        </div>
        
    )

}

export default Info