import { Button, Card, Image } from "react-bootstrap";

export interface FoodCardProps {
  // date: string
  title: string;
  price: number;
  image?: string; //enter path, or create upload image function
  // day: string;
  // id: string;
}

const FoodCard = ({ title, price, image }: FoodCardProps) => {
  return (
    <Card className="shadow mb-5 mx-3 rounded" style={{ width: "14rem" }}>
      <Image className="mx-auto" src={image} width="100px" />
      <Card.Body className="text-center">
        <Card.Title>
          {title}
        </Card.Title>
        <Card.Text style={{ color: "green" }}>RM {price}</Card.Text>
        <Button
          style={{ background: "#fccd4c", color: "black", border: "none" }}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FoodCard;