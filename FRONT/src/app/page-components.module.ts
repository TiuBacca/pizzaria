import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { EntregaComponent } from './pages/entrega/entrega.component';
import { FornecedorComponent } from './pages/fornecedor/fornecedor.component';
import { FuncionarioComponent } from './pages/funcionario/funcionario.component';
import { HomeComponent } from './pages/home/home.component';
import { PedidoComponent } from './pages/pedido/pedido.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { ErroComponent } from './components/erro/erro.component';
import { NavComponent } from './components/nav/nav.component';
import { LoaderComponent } from './components/loader/loader.component';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { NovoClienteComponent } from './pages/cliente/modais/novo-cliente/novo-cliente.component';
import { ClientePedidosComponent } from './pages/cliente/modais/cliente-pedidos/cliente-pedidos.component';
import { NovoContatoComponent } from './pages/cliente/modais/novo-contato/novo-contato.component';
import { NovoEnderecoComponent } from './pages/cliente/modais/novo-endereco/novo-endereco.component';
import { HistoricoComprasComponent } from './pages/produto/modais/historico-compras/historico-compras.component';
import { NovoProdutoComponent } from './pages/produto/modais/novo-produto/novo-produto.component';
import { NovoFornecedorComponent } from './pages/fornecedor/modais/novo-fornecedor/novo-fornecedor.component';
import { HistoricoFornecedorComponent } from './pages/fornecedor/modais/historico-fornecedor/historico-fornecedor.component';
import { ProdutoFornecedorComponent } from './pages/fornecedor/modais/produto-fornecedor/produto-fornecedor.component';
import { NovoProdutoFornecedorComponent } from './pages/fornecedor/modais/novo-produto-fornecedor/novo-produto-fornecedor.component';
import { NovoFuncionarioComponent } from './pages/funcionario/modais/novo-funcionario/novo-funcionario.component';
import { AdvertenciaIconePipe } from './components/AdvertenciaIconePipe ';
import { FeriasFuncionarioComponent } from './pages/funcionario/modais/ferias-funcionario/ferias-funcionario.component';

@NgModule({
  declarations: [
    HomeComponent,
    ClienteComponent,
    FornecedorComponent,
    ProdutoComponent,
    EntregaComponent,
    FuncionarioComponent,
    PedidoComponent,
    HeaderComponent,
    NavComponent,
    ErroComponent,
    LoaderComponent,
    DefaultLayoutComponent,
    FooterComponent,
    NovoClienteComponent,
    ClientePedidosComponent,
    NovoContatoComponent,
    NovoEnderecoComponent,
    HistoricoComprasComponent,
    NovoProdutoComponent,
    NovoFornecedorComponent,
    HistoricoFornecedorComponent,
    ProdutoFornecedorComponent,
    NovoEnderecoComponent,
    NovoContatoComponent,
    NovoProdutoFornecedorComponent,
    NovoFuncionarioComponent, AdvertenciaIconePipe, FeriasFuncionarioComponent
  ],
  exports: [
    HeaderComponent,
    NavComponent,
    ErroComponent,
    LoaderComponent,
    DefaultLayoutComponent,
    FooterComponent,     NovoEnderecoComponent,
    NovoContatoComponent, AdvertenciaIconePipe  ],

  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxLoadingModule.forRoot({
      fullScreenBackdrop: true
    }),
    AppRoutingModule
  ]
})
export class PageComponentsModule { }
