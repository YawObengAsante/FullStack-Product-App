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
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster, toaster } from "../components/ui/toaster";
function EditProductPage() {
  const [form, setForm] = useState({ name: "", price: "", image: "" });
  const { updateProduct, products } = useProductStore();
  const { id } = useParams();
  const navigate = useNavigate();

  const findProduct = (products, id) => {
    for (let product of products) {
      if (product._id === id) {
        return product;
      }
    }
    return null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    const product = findProduct(products, id);
    if (product) {
      setForm({
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  }, [id, products]);

  const handleUpdateProduct = async (id, form) => {
    try {
      if (form.name && form.price && form.image) {
        const { success, message } = await updateProduct(id, form);
        toaster.create({
          title: success ? "Success" : "Error",
          description: message,
          type: success ? "success" : "error",
        });
      } else {
        toaster.create({
          title: "Warning",
          description: "Plase fill all fields",
          type: "warning",
        });
      }
      setForm({ name: "", price: "", image: "" });
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/");
    }
  };
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
            <Input
              placeholder="Product Name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Price"
              name="price"
              value={form.price}
              type="number"
              onChange={handleInputChange}
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={form.image}
              onChange={handleInputChange}
            />
            <Button
              colorPalette={"blue"}
              onClick={() => handleUpdateProduct(id, form)}
            >
              Edit Product
            </Button>
          </VStack>
        </Box>
      </VStack>
      <Toaster />
    </Container>
  );
}

export default EditProductPage;
