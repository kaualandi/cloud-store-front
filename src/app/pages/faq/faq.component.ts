import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent {
  questions = [
    {
      title: 'Como faço para devolver um produto?',
      answer:
        'Você pode conferir nossa política de devolução clicando no link abaixo:<br><a href="/exchange">Política de devolução</a>.',
    },

    {
      title: 'Como faço para trocar um produto?',
      answer:
        'Você pode conferir nossa política de troca clicando no link abaixo:<br><a href="/exchange">Política de troca</a>.',
    },

    {
      title: 'Como faço para cancelar um pedido?',
      answer:
        'Você pode conferir nossa política de cancelamento clicando no link abaixo:<br><a href="/exchange">Política de cancelamento</a>.',
    },

    {
      title: 'Como faço para rastrear meu pedido?',
      answer:
        'Você pode rastrear seu pedido através da sua conta (<a href="/account/orders">Minhas compras</a>) e escolher o pedido desejado, se já estiver disponível para rastreio, clique em "Rastrear pedido". Ou caso tenha o número do pedido ou código de rastreio, você pode acessar o link abaixo:<br><a href="/tracking">Rastrear pedido</a>.',
    },
  ];
}
