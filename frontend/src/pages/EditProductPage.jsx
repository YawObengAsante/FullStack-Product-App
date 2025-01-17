import {
  Box,
  Container,
  Heading,
  VStack,
  Input,
  Button,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { useProductStore } from "../store/product";
import { useParams } from "react-router-dom";
import { useState } from "react";
function EditProductPage() {
  const [form, setForm] = useState({});
  const { editProduct, products } = useProductStore();
  const { id } = useParams();

  const findProduct = (products, id) => {
    for (let product of products) {
      if (product._id === id) {
        return product;
      }
    }
    return null;
  };

  const product = findProduct(products, id);
  setForm({product});

  const handleEditProduct = () => {};
  return (
    <Container maxW={"sm"}>
      <VStack spaceY={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Edit Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spaceY={8}>
            <Input placeholder="Product Name" name="name"  value={product.name}/>
            <Input placeholder="Price" name="price" type="number" />
            <Input placeholder="Image URL" name="image" />
            <Button colorPalette={"blue"} onClick={handleEditProduct}>
              Edit Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default EditProductPage;
