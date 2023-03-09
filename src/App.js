import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseScreen from './screens/BaseScreen';
import ExpenseEdit from './screens/ExpenseEdit';
import RegardingEdit from './screens/RegardingEdit';
import AddMember from './screens/AddMember';
import GroupEdit from './screens/GroupEdit';
import RegardingDetail from './screens/RegardingDetail';
import ExpenseDetail from './screens/ExpenseDetail';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<BaseScreen/>}/>
        <Route path="/criar-despesa" element={<ExpenseEdit/>}/>
        <Route path="/criar-referencia" element={<RegardingEdit/>}/>
        <Route path="/adicionar-membro" element={<AddMember/>}/>
        <Route path="/adicionar-grupo" element={<GroupEdit/>}/>
        <Route path="/referencia/:id" element={<RegardingDetail/>}/>
        <Route path="/despesa/:id" element={<ExpenseDetail/>}/>

      </Routes>
      </BrowserRouter>
  );
}

export default App;
