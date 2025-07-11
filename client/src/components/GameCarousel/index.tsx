import Carousel from "react-material-ui-carousel";
import { HOME_BANNER_CAROUSEL } from "../../constants/carousel";
import { Box } from "@mui/system";

export const GameCarousel = () => {
  return (
    <Carousel
      swipe
      indicators={false}
      navButtonsAlwaysInvisible
      animation="slide"
    >
      {HOME_BANNER_CAROUSEL.map((banner, index) => (
        <Box
          key={`home-banner-${index}`}
          component="img"
          src={banner.image}
          alt={`Banner ${index + 1}`}
          style={{ width: "100%", borderRadius: "5px" }}
        />
      ))}
    </Carousel>
  );
};
