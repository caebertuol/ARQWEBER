import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Adicione Router para redirecionamento
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';


// Copie a interface Project de projects.component.ts para cá
interface Project {
  id: number;
  title: string;
  location: string;
  imageUrl: string;
  fullDescription: string;
  client?: string;
  year?: number;
  category: 'residencial' | 'comercial' | 'institucional';
  images?: string[];
}

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FeatherModule], // Adicione RouterModule para o botão voltar
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router); // Injetar o Router

  project: Project | undefined; // O projeto a ser exibido

  // IMPORTANTE: Esta é uma cópia **temporária** da lista de projetos.
  // Em uma aplicação real, você faria uma requisição para um serviço/API.
  allProjects: Project[] = [
    {
      id: 1,
      title: 'Residência Urbana',
      location: 'São Paulo - 2023',
      imageUrl: 'http://static.photos/indoor/640x360/2',
      fullDescription: 'Um projeto residencial moderno que otimiza o espaço urbano com design minimalista e funcionalidade. Foco em iluminação natural e áreas de convivência integradas.',
      client: 'Família Silva',
      year: 2023,
      category: 'residencial',
      images: ['http://static.photos/indoor/640x360/2', 'https://picsum.photos/id/1025/800/600', 'https://picsum.photos/id/1018/800/600']
    },
    {
      id: 2,
      title: 'Escritório Criativo',
      location: 'Rio de Janeiro - 2022',
      imageUrl: 'http://static.photos/office/640x360/3',
      fullDescription: 'Reforma de um escritório corporativo para uma startup de tecnologia, criando um ambiente colaborativo e inspirador. Uso de cores vibrantes e mobiliário flexível.',
      client: 'Tech Solutions S.A.',
      year: 2022,
      category: 'comercial',
      images: ['http://static.photos/office/640x360/3', 'https://picsum.photos/id/1063/800/600', 'https://picsum.photos/id/1065/800/600']
    },
    {
      id: 3,
      title: 'Restaurante Sabor',
      location: 'Belo Horizonte - 2021',
      imageUrl: 'http://static.photos/restaurant/640x360/4',
      fullDescription: 'Design de interiores para um restaurante contemporâneo, combinando elementos rústicos e modernos. Iluminação estratégica para criar um ambiente acolhedor e sofisticado.',
      client: 'Sabor Gourmet Ltda.',
      year: 2021,
      category: 'comercial',
      images: ['http://static.photos/restaurant/640x360/4', 'https://picsum.photos/id/1083/800/600', 'https://picsum.photos/id/1084/800/600']
    },
    {
      id: 4,
      title: 'Clínica Odontológica',
      location: 'São Paulo - 2022',
      imageUrl: 'https://picsum.photos/id/20/640/360',
      fullDescription: 'Projeto de interior para clínica odontológica com foco em conforto do paciente e ambiente clean. Design funcional e uso de materiais de fácil higienização.',
      client: 'Dra. Ana Paula',
      year: 2022,
      category: 'institucional',
      images: ['https://picsum.photos/id/20/640/360', 'https://picsum.photos/id/21/800/600', 'https://picsum.photos/id/22/800/600']
    },
    {
      id: 5,
      title: 'Apartamento Compacto',
      location: 'Curitiba - 2023',
      imageUrl: 'https://picsum.photos/id/25/640/360',
      fullDescription: 'Solução inteligente para apartamento compacto, maximizando o espaço e a funcionalidade. Móveis planejados e design multifuncional.',
      client: 'Sr. João Silva',
      year: 2023,
      category: 'residencial',
      images: ['https://picsum.photos/id/25/640/360', 'https://picsum.photos/id/26/800/600', 'https://picsum.photos/id/27/800/600']
    },
    {
      id: 6,
      title: 'Livraria Conceitual',
      location: 'Porto Alegre - 2021',
      imageUrl: 'https://picsum.photos/id/28/640/360',
      fullDescription: 'Criação de ambiente para livraria com conceito moderno e convidativo. Espaços para leitura e eventos, com design que remete ao conhecimento e tranquilidade.',
      client: 'Livraria Saberes',
      year: 2021,
      category: 'comercial',
      images: ['https://picsum.photos/id/28/640/360', 'https://picsum.photos/id/29/800/600', 'https://picsum.photos/id/30/800/600']
    }
  ];


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const projectId = params.get('id');
      if (projectId) {
        this.project = this.allProjects.find(p => p.id === +projectId); // O '+' converte string para number
        if (!this.project) {
          this.router.navigate(['/']); // Redireciona para a home se o projeto não for encontrado
        }
      }
    });
  }
}