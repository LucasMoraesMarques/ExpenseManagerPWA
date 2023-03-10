import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseScreen from './screens/BaseScreen';
import ExpenseEdit from './screens/ExpenseEdit';
import RegardingEdit from './screens/RegardingEdit';
import AddMember from './screens/AddMember';
import GroupEdit from './screens/GroupEdit';
import RegardingDetail from './screens/RegardingDetail';
import ExpenseDetail from './screens/ExpenseDetail';
import Notifications from './screens/Notifications';
import Profile from './screens/Profile';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<BaseScreen/>}/>
        <Route path="/criar-despesa" element={<ExpenseEdit/>}/>
        <Route path="/editar-despesa/:id" element={<ExpenseEdit/>}/>
        <Route path="/despesa/:id" element={<ExpenseDetail/>}/>
        <Route path="/criar-referencia" element={<RegardingEdit/>}/>
        <Route path="/editar-referencia/:id" element={<RegardingEdit/>}/>
        <Route path="/referencia/:id" element={<RegardingDetail/>}/>
        <Route path="/adicionar-membro" element={<AddMember/>}/>
        <Route path="/criar-grupo" element={<GroupEdit/>}/>
        <Route path="/editar-grupo/:id" element={<GroupEdit/>}/>
        <Route path="/notificacoes" element={<Notifications/>}/>
        <Route path="/perfil" element={<Profile/>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
