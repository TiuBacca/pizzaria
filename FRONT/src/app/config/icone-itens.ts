export function getIconByItem(item: number): string {
  switch (item) {
    case 1:
      return '🍕'; // pizza
    case 2:
      return '🥤'; // refrigerante
    case 3:
      return '🍺'; // cerveja
    case 4:
      return '🍟'; // batata frita
    case 5:
      return '🥗'; // salada
    case 6:
      return '🍔'; // hambúrguer
    case 7:
      return '🌭'; // cachorro-quente
    case 8:
      return '🍨'; // sorvete
    case 9:
      return '🍰'; // bolo / sobremesa
    case 10:
      return '🧃'; // suco
    case 11:
      return '🥖'; // pão de alho
    case 12:
      return '🧀'; // porção de queijo
    case 13:
      return '🍗'; // frango frito
    case 14:
      return '🥤'; // milkshake
    case 15:
      return '🥟'; // porção salgados
    default:
      return '❓'; // ícone padrão
  }
}
