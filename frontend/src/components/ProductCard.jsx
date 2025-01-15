import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import { toaster, Toaster } from "./ui/toaster";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useProductStore } from "../store/product";

function ProductCard({ product }) {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
 
  const {deleteProduct} = useProductStore()

  const handleDeleteProduct = async (pid) => {
    const {success, message} = deleteProduct(pid)
    console.log("success: ", success);
    console.log("message: ", message);
    toaster.create({
        title: success ? "Success" : "Error",
        description: message,
        type: success ? "success" : "error",
      });
  }
  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transition: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={"full"}
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor}>
          ${product.price}
        </Text>

        <HStack spaceX={2}>
          <IconButton colorPalette={"blue"} ><FaRegEdit/></IconButton>
          <IconButton colorPalette={"red"} onClick={()=>handleDeleteProduct(product._id)} ><MdOutlineDelete/></IconButton>
        </HStack>
      </Box>
      <Toaster/>
    </Box>
  );
}

export default ProductCard;
