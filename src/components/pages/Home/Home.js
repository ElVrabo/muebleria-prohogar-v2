
import CarouseImages from "../../common/carouseImages/CarouseImages";
import { Navigation } from "../../common/nav/Navigation";
import imageCupBoard from "../../../assets/images/alacena.jpg"
import imageDesktop from "../../../assets/images/escritorio.jpg"
import imageTable from "../../../assets/images/comedor.jpg"




export const Home = () => {
  

  

  return (
    <>
      <Navigation />
      
      
      <CarouseImages
      firstImage={imageCupBoard}
      secondImage={imageDesktop}
      ThirdImage={imageTable}
      />
      
      
    </>
  );
};
