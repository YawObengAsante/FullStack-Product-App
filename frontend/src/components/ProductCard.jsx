import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Input,
} from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import { toaster, Toaster } from "./ui/toaster";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useProductStore } from "../store/product";

function ProductCard({ product }) {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct } = useProductStore();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    console.log("success: ", success);
    console.log("message: ", message);
    toaster.create({
      title: success ? "Success" : "Error",
      description: message,
      type: success ? "success" : "error",
    });
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"transform 0.3s"}
      _hover={{ transform: "translateY(-10px)", shadow: "xl" }}
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

        <HStack spacing={2}>
          <IconButton
            colorPalette={"blue"}
            aria-label="Edit product"

            //   onClick={onOpen}
          >
            <FaRegEdit />
          </IconButton>
          <IconButton
            colorPalette={"red"}
            aria-label="Delete product"
            onClick={() => handleDeleteProduct(product._id)}
          >
            <MdOutlineDelete />
          </IconButton>
        </HStack>
      </Box>
      <Toaster />
      <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Input placeholder="Product Name" name="name" />
                <Input placeholder="Price" name="price" type="number" />
                <Input placeholder="Image URL" name="image" />
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
    </Box>
  );
}

export default ProductCard;
