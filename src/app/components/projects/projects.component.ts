import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 


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
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

   allProjects: Project[] = [
   {
      id: 1,
      title: 'Residencia Urbana',
      location: 'Ilheus - 2025',
      imageUrl: 'https://static.photos/indoor/640x360/166.webp',
      fullDescription: 'Um projeto residencial moderno que otimiza o espaço urbano com design minimalista e funcionalidade. Foco em iluminação natural e áreas de convivência integradas.',
      client: 'Família Veloso',
      year: 2025,
      category: 'residencial',
      images: ['https://static.photos/indoor/640x360/166.webp', 'https://static.photos/estate/640x360/187.webp', 'https://static.photos/estate/640x360/193.webp']
    },
    {
      id: 2,
      title: 'Expografia',
      location: 'Salvador - 2024',
      imageUrl: 'https://static.photos/indoor/640x360/106.webp',
      fullDescription: '',
      client: 'MUNCAB',
      year: 2024,
      category: 'institucional',
      images: ['https://static.photos/indoor/640x360/106.webp', 'https://static.photos/minimal/640x360/192.webp', 'https://static.photos/minimal/640x360/165.webp']
    },
    {
      id: 3,
      title: 'Cozinha Residencial',
      location: 'Belo Horizonte - 2023',
      imageUrl: 'https://static.photos/indoor/640x360/172.webp',
      fullDescription: 'Design de interiores para um restaurante contemporâneo, combinando elementos rústicos e modernos. Iluminação estratégica para criar um ambiente acolhedor e sofisticado.',
      client: 'Cheff  Paola Carossela',
      year: 2023,
      category: 'residencial',
      images: ['https://static.photos/indoor/640x360/172.webp', 'https://static.photos/indoor/640x360/151.webp', 'https://static.photos/indoor/640x360/102.webp']
    },
    // Novos projetos que serão mostrados ao clicar em "Ver todos"
    {
      id: 4,
      title: 'Biblioteca Residencial',
      location: 'Salvador - 2022',
      imageUrl: 'https://static.photos/indoor/640x360/142.webp',
      fullDescription: 'Projeto de interior com conceito moderno e convidativo. Espaços para descanço, com design que remete intelectualidade e tranquilidade.',
      client: 'Dra. Odete Roitmamm',
      year: 2022,
      category: 'institucional',
      images: ['https://static.photos/indoor/640x360/142.webp', 'https://static.photos/indoor/640x360/104.webp', 'https://static.photos/textures/640x360/143.webp']
    },
    {
      id: 5,
      title: 'Apartamento Compacto',
      location: 'Porto Alegre - 2021',
      imageUrl: 'https://static.photos/indoor/640x360/144.webp',
      fullDescription: 'Solução inteligente para apartamento compacto, maximizando o espaço e a funcionalidade. Móveis planejados e design multifuncional.',
      client: 'Srta. Cris Silva',
      year: 2021,
      category: 'residencial',
      images: ['https://static.photos/indoor/640x360/144.webp', 'https://static.photos/workspace/640x360/170.webp', 'https://static.photos/workspace/640x360/182.webp']
    },
    {
      id: 6,
      title: 'Residência Moderna',
      location: 'Fortaleza - 2021',
      imageUrl: 'https://static.photos/indoor/640x360/194.webp',
      fullDescription: 'Criação de ambiente com conceito moderno e convidativo. Espaços para descanço, com design que remete a tranquilidade.',
      client: 'Dra. Carla Perez',
      year: 2021,
      category: 'residencial',
       images: ['https://static.photos/indoor/640x360/194.webp', 'https://static.photos/indoor/640x360/159.webp', 'https://static.photos/indoor/640x360/192.webp']
    }
  ];

  // Projetos atualmente visíveis na tela
  visibleProjects: Project[] = [];
  initialProjectsCount: number = 3; // Quantos projetos mostrar inicialmente
  showAllProjects: boolean = false; // Flag para controlar se todos estão visíveis

  ngOnInit(): void {
    this.loadInitialProjects();
  }

  // Carrega os projetos iniciais
  loadInitialProjects(): void {
    this.visibleProjects = this.allProjects.slice(0, this.initialProjectsCount);
  }

  // Alterna entre mostrar todos os projetos ou apenas os iniciais
  toggleShowAllProjects(): void {
    this.showAllProjects = !this.showAllProjects;
    if (this.showAllProjects) {
      this.visibleProjects = this.allProjects;
    } else {
      this.loadInitialProjects();
    }
  }
}