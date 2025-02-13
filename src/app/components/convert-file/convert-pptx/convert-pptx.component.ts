import { Component } from '@angular/core';
import { ConvertService } from '../../../services/convert.service';

@Component({
  selector: 'app-convert-pptx',
  templateUrl: './convert-pptx.component.html',
  styleUrls: ['./convert-pptx.component.css']
})
export class ConvertPptxComponent {
  fileName: string = '';
  fileContent: File | null = null;
  public uploading = false;
  public error = '';
  public imageList: string[] = [];
  isDraggingOver = false;

   imageList1 = [
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",


  ];
  imagesToShow: number = this.imageList1.length; 

    getRange(n: number): number[] {
      return Array(n).fill(0).map((_, i) => i);
    }
    imagesPerRow: number = 4; // Valeur initiale
  imageWidth: number = 150; // Largeur initiale des images
  imageHeight: number = 150; // Hauteur initiale des images
  selectedImages: boolean[] = new Array(this.imageList1.length).fill(false);
  selectedImageList: string[] = [];
  defaultNumber: number = 1;
  displayPercentage: number = 50; // Valeur initiale
  downloaded: boolean = false;
  constructor(private convertService: ConvertService) {}

  ngOnInit() {
    this.selectedImages = new Array(this.imageList1.length).fill(false);
  }

  updateFileName(): void {
    console.log("Nom du fichier mis à jour :", this.fileName);
  }

  downloadSelectedImages(): void {
    if (this.selectedImageList.length === 0) {
      alert("Veuillez sélectionner au moins une image à télécharger.");
      return;
    }

    this.selectedImageList.forEach((image, index) => {
      const link = document.createElement('a');
      link.href = image;
      link.download = `${this.fileName}_${index + 1}.jpg`; // Utilisation du nom personnalisé
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.downloaded = true;

      setTimeout(() => {
        this.downloaded = false;
        this.selectedImages.fill(false);
        this.selectedImageList=[];
      }, 5000);
    });
     // Après le téléchargement, change le symbole
  


  }
  selectAllImages(): void {
    const allSelected = this.selectedImages.every(selected => selected);
    
    if (allSelected) {
      // Si toutes les images sont déjà sélectionnées, les désélectionner
      this.selectedImages.fill(false);
      this.selectedImageList = [];
    } else {
      // Sinon, sélectionner toutes les images
      this.selectedImages.fill(true);
      this.selectedImageList = [...this.imageList1];
    }
  }

  toggleSelection(i: number): void {
    this.selectedImages[i] = !this.selectedImages[i];
    this.updateSelectedImages();
  }

  updateSelectedImages(): void {
    this.selectedImageList = this.imageList1.filter((_, index) => this.selectedImages[index]);
  }
  
  onRangeChange(event: Event) { 
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
  
    // Conserver la logique de calcul
    this.imagesPerRow = 7 - (value - 1);
    this.imageWidth = 300 - (this.imagesPerRow * 30);
    this.imageHeight = 300 - (this.imagesPerRow * 30);
  
    if (this.imageWidth < 50) {
      this.imageWidth = 80;
      this.imageHeight = 80;
    }
  
    if (this.imagesPerRow < 3) {
      this.imagesPerRow = 3;
    } else if (this.imagesPerRow > 5) {
      this.imagesPerRow = 5;
    }
  
    // Mise à jour du pourcentage sans afficher le nombre d'images
    if (this.imagesPerRow === 3) {
      this.displayPercentage = 100;
    } else if (this.imagesPerRow === 4) {
      this.displayPercentage = 50;
    } else if (this.imagesPerRow === 5) {
      this.displayPercentage = 0;
    } else {
      this.displayPercentage = 0; // Par défaut
    }
  }
  
 
  
  onDragOver(event: any): void {
    event.preventDefault();
    this.isDraggingOver = true;
  }
 onDrop(event:any): void {
   event.preventDefault();
   const file = event.dataTransfer.files[0];
   
   if(file && file.name.endsWith('.pptx')) {
     this.fileName = file.name;
     this.fileContent = file;
     this.isDraggingOver = false; // Désactive l'état "survol".
   } else {
     alert('Veuillez sélectionner un fichier PPTX.');
     this.fileName = '';
     this.fileContent = null; 
     this.isDraggingOver = false; // Désactive l'état "survol".
   }
 }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && file.name.endsWith('.pptx')) {
      this.fileName = file.name;
      this.fileContent = file;
    } else {
      alert('Veuillez sélectionner un fichier PPTX.');
      this.fileName = '';
      this.fileContent = null;
    }
  }

  onUpload(apiUrl: string): void {
    if (this.fileContent) {
      this.uploading = true;  
      const formData = new FormData();
      formData.append('file', this.fileContent);
  
      this.convertService.postData(apiUrl, formData).subscribe(
        (response: { url?: string }) => { 
          console.log('Réponse de l\'API:', response);
          if (response && response.url) {
            alert(`Fichier ajouté avec succès ! Voici le lien : ${response.url}`);
            this.imageList.push(response.url);  
          } else {
            alert('Aucune URL générée.');
          }
        },
        (error: unknown) => {
          console.error('Erreur lors de l\'upload:', error);
          alert('Échec de l\'ajout du fichier.');
        }
      );
    } else {
      alert('Veuillez sélectionner un fichier avant de l\'ajouter.');
    }
  }
  convertAndDisplayUrl(): void {
    const apiUrl = 'http://localhost/api/convert-pptx'; 
    this.onUpload(apiUrl);
  }
  

  onReset(): void {
    this.fileName = '';
    this.fileContent = null;
    this.imageList = [];  // Réinitialisation de la liste des images
    
  }

  onResetimage(): void {
  

    this.selectedImages.fill(false);
    this.selectedImageList=[];
  }

  

 
 
 
 
 



}
