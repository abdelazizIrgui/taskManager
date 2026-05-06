import './App.css'
import TodoList from "./componenets/TodoList";
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { TodosContext } from './contexts/TodosContext';
import { v4 as uuidv4 } from "uuid";
import { useState } from 'react';

const theme = createTheme({
  typography:{
    fontFamily:"Mono"
  },

  palette:{
    primary:{
      main:"#e91e63"
    },
  },
});

const   Initialtodos=[
    {
        id:uuidv4(),
        title:"my task",
        desc:"details this task",
        isDone:false
    },
     {
        id:uuidv4(),
        title:"my task 2",
        desc:"details this task 2",
        isDone:false
    },
     {
        id:uuidv4(),
        title:"my task 3",
        desc:"details this task 3",
        isDone:false
    }
]


function App() {
       const [todos,setTodos]=useState(Initialtodos);

  return (
    
    <ThemeProvider theme={theme}>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",backgroundColor:"rgba(153, 190, 163, 0.47)"}}>
        <TodosContext.Provider value={[todos, setTodos]}>
          <TodoList />
        </TodosContext.Provider >
      </div>
    </ThemeProvider>
  )
}

export default App
