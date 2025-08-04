
import { LoginComponent } from './pages/login/login.component';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { EntregaComponent } from './pages/entrega/entrega.component';
import { FornecedorComponent } from './pages/fornecedor/fornecedor.component';
import { FuncionarioComponent } from './pages/funcionario/funcionario.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { PedidoComponent } from './pages/pedido/pedido.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardapioComponent } from './pages/cardapio/cardapio.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "",
    component: DefaultLayoutComponent,
    children: [
      { path: "home", component: HomeComponent },
      { path: "cliente", component: ClienteComponent },
      { path: "entrega", component: EntregaComponent },
      { path: "fornecedor", component: FornecedorComponent },
      { path: "funcionario", component: FuncionarioComponent },
      { path: "pedido", component: PedidoComponent },
      { path: "cardapio", component: CardapioComponent},
      { path: "produto", component: ProdutoComponent }]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
