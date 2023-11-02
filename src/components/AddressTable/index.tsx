import { formatDate, getFulfillmentStatus } from "@/utils";
import { COLORS } from "@/utils/constants";
import {
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { BsHouseAddFill } from "react-icons/bs";
import { FaHouseUser } from "react-icons/fa";
import { TbTrash } from "react-icons/tb";

interface IAddressTableProps {
  addresses: {
    formatted: string[];
    formattedArea: string;
    address1: string;
    address2: string;
    city: string;
    company: string;
    country: string;
    firstName: string;
    lastName: string;
    id: string;
  }[];
}

const AddressTable = ({ addresses }: IAddressTableProps) => {
  console.log(addresses);
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th pl={0}># Direcciones</Th>
            <Th> </Th>
            <Th> </Th>
            <Th> </Th>
          </Tr>
        </Thead>
        <Tbody>
          {addresses?.map((address) => (
            <Tr key={address.id}>
              <Td pl={0}>
                <FaHouseUser size={20} color={COLORS.GREEN} />
              </Td>
              <Td>
                <Text maxW="400px" noOfLines={1}>
                  {address.formatted.join(" ")}
                </Text>
              </Td>
              <Td></Td>
              <Td></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default AddressTable;
