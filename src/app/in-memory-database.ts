import { InMemoryDbService } from 'angular-in-memory-web-api';

import { category } from './pages/categories/shared/category.model';

export class InMemoryDatabase implements InMemoryDbService {
    createdDb() {
        const categories = [
           { id : 1, name: 'Lazer', description: 'Volei, cinema, praia, etc' }, 
           { id : 2, name: 'Saúde', description: 'Exercícios, alimentação saudável, etc' },
           { id : 3, name: 'Trabalho', description: 'Reuniões, prazos, etc'},
           { id : 4, name: 'Família', description: 'Almoço de domingo, aniversário, etc' },
           { id : 5, name: 'Amigos', description: 'Encontro, viagem, etc' },
        ];
        return { categories };
    }
}