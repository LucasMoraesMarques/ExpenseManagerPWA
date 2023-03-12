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
import Account from './screens/Account';
import GroupList from './screens/GroupList';
import GroupDetail from './screens/GroupDetail';
import PaymentMethodList from './screens/PaymentMethodList';


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
        <Route path="/grupos" element={<GroupList/>}/>
        <Route path="/grupo/:id" element={<GroupDetail/>}/>
        <Route path="/notificacoes" element={<Notifications/>}/>
        <Route path="/conta" element={<Account/>}/>
        <Route path="/metodos-de-pagamento" element={<PaymentMethodList/>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
