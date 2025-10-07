import { Component, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common'; // Adicione isPlatformBrowser

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {


  private platformId = inject(PLATFORM_ID);

  images: string[] = [
    
    'https://images.adsttc.com/media/images/68cd/b38f/67a7/a401/899d/979b/slideshow/casa-passiva-mareines-arquitetura_6.jpg?1758311325',
    'https://images.adsttc.com/media/images/68cf/3c51/67a7/a401/899d/97f9/slideshow/residencia-ams-jacobsen-arquitetura_20.jpg?1758411871',
    'https://images.adsttc.com/media/images/68de/92dd/54d0/5d01/88d4/455d/slideshow/belalu-dome-villa-pablo-luna-studio_1.jpg?1759417070'
    
/* 
    'https://picsum.photos/id/1043/1920/1080',
    'https://picsum.photos/id/1015/1920/1080',
    'https://picsum.photos/id/10/1920/1080' */
  ];

  currentIndex = 0;
  private intervalId: any;

  ngOnInit(): void {
    // 2. Executa o carrossel SOMENTE se o código estiver rodando no navegador
    if (isPlatformBrowser(this.platformId)) {
      this.startCarousel();
    }
  }

  ngOnDestroy(): void {
    // 3. Limpa o intervalo (também uma operação de navegador)
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.goToNext();
    }, 5000);
  }

  goToNext(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
}