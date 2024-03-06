import "./home.css"
import CarouseImages from "../../common/carouseImages/CarouseImages";
import { Navigation } from "../../common/nav/Navigation";
import imageCupBoard from "../../../assets/images/alacena.jpg"
import imageDesktop from "../../../assets/images/escritorio.jpg"
import imageTable from "../../../assets/images/comedor.jpg"
import imageLaptop from "../../../assets/images/pantalla.jpg"
import imageArmChair from "../../../assets/images/sillon.jpg"
import imageMattress from "../../../assets/images/colchon.jpg"


export const Home = () => {
  

  

  return (
    <main>
      <Navigation />
      
      
      <CarouseImages
      firstImage={imageCupBoard}
      secondImage={imageDesktop}
      ThirdImage={imageTable}
      />
          <h1 className="title-gallery" >Productos mas vendidos</h1>
      <section className="gallery-products-container" >
        <div className="gallery-products" >
          <div className="image-1" >
          <img src={imageCupBoard} />
           <p>Alacena completa</p>
          </div>
          <div className="image-2" >
          <img src={imageDesktop} />
        <p>Escritorio</p>
          </div>
          <div className="image-3" >
          <img src={imageTable} />
           <p>Comedor</p>
          </div>
          <div className="image-4" >
          <img src={imageLaptop} />
          <p>Dispositivos electronicos</p>
          </div>
          <div className="image-5" >
          <img src={imageArmChair} />
         <p>Juego de sillones</p>
          </div>
          <div className="image-6" >
          <img src={imageMattress} />
          <p>Colchon</p>
          </div>
        </div>
      </section>


      
      
    </main>
  );
};
