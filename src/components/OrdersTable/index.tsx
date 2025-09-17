import {
  formatCurrencyMXN,
  formatDate,
  getFulfillmentStatus,
  normalizeShopifyAmount,
} from "@/utils";
import {
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

interface IOrdersTableProps {
  orders: {
    nodes: {
      id: string;
      name: string;
      processedAt: string;
      paymentGatewayNames: string[];
      displayFulfillmentStatus: string;
      totalPriceSet: {
        shopMoney: {
          amount: number;
        };
      };
    }[];
  };
}

const OrdersTable = ({ orders }: IOrdersTableProps) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th pl={0}># Orden</Th>
            <Th>Fecha</Th>
            <Th>Estado</Th>
            <Th>Pago</Th>
            <Th>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders?.nodes?.map((order) => (
            <Tr key={order.id}>
              <Td pl={0}>{order.name}</Td>
              <Td>{formatDate(order.processedAt)}</Td>
              <Td>{getFulfillmentStatus(order.displayFulfillmentStatus)}</Td>
              <Td>
                {order.paymentGatewayNames[0][0].toUpperCase() +
                  order.paymentGatewayNames[0].slice(1)}
              </Td>
              <Td>
                {formatCurrencyMXN(
                  normalizeShopifyAmount(order.totalPriceSet.shopMoney.amount),
                  "MXN"
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default OrdersTable;
