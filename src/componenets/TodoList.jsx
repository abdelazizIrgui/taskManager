import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Todo from './Todo';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useState } from 'react';
import { TodosContext } from '../contexts/TodosContext';
import { useContext,useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {


   const value=useContext(TodosContext);
    const [todos,setTodos]=value;

   const [title,setTitle]=useState("");
   
    const todoJSX=todos.map((t)=>{
        return <Todo todo={t} key={t.id}/>
    })

    useEffect(()=>{
      const storedTodos=localStorage.getItem("todos");
      if(storedTodos){
        setTodos(JSON.parse(storedTodos));
      }
    }, []);

    function handleAddClick(){
         const newTodo={
            id:uuidv4(),
            title:title,
            desc:"",
            isDone:false
         }
         setTodos([...todos,newTodo]);
         localStorage.setItem("todos",JSON.stringify([...todos,newTodo]));
         setTitle("");
    }
  return (
    
      <Container maxWidth="sm">
          <Card sx={{ minWidth: 275 }}
          style={{
            maxHeight:"80vh",
            overflow:"scroll"
          }}>
      <CardContent>
        <Typography gutterBottom variant='h3' sx={{fontWeight:"bold"}}>
            My Tasks
            <Divider/>
            {/* filter button */}
            <ToggleButtonGroup style={{marginTop:"10px"}}
    //   value={alignment}
      exclusive
     // onChange={handleAlignment}
      aria-label="text alignment"
      color="primary"
    >
      <ToggleButton value="left" aria-label="left aligned">
        All
      </ToggleButton>
      <ToggleButton onClick={()=>{
           const newTodos=todos.filter((t)=>t.isDone);
           setTodos(newTodos);
      }} value="center" aria-label="centered">
        Done
      </ToggleButton>
      <ToggleButton onClick={()=>{
           const newTodos=todos.filter((t)=>!t.isDone);
           setTodos(newTodos);
      }} value="right" aria-label="right aligned">
        Not Done
      </ToggleButton>
      
    </ToggleButtonGroup>
        </Typography>
        {/* All todos */}
        {todoJSX}
         
        {/* all todos */}
        
        {/* input values task */}
        
         <Grid container spacing={2} style={{marginTop:"20px"}}>
            <Grid size={4} display="flex" justifyContent="space-between" alignItems="center">
              <Button style={{width:"100%",height:"100%"}} 
              variant="contained" 
              color="primary"
              onClick={()=>{
                handleAddClick(); 

              }}
              disabled={title.length<=0?true:false}
              >
                 Add
             </Button>
            </Grid>

             <Grid size={8} display="flex" justifyContent="space-between" alignItems="center">
                <TextField  style={{width:"100%"}} id="outlined-basic" 
                label="Title" variant="outlined" 
                value={title}
                onChange={(e)=>{
                   setTitle(e.target.value)
                }}
                />

            </Grid>
         </Grid>

        {/* input values task */}
        
      </CardContent>
     
          </Card>
      </Container>
    
  );
}
