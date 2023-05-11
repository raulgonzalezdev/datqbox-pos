import React, { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import {
  Flex,
  Text,
  Box,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { SearchIcon } from "@chakra-ui/icons";

const DataTable = ({ title, columns, data, onAdd, onSelect, refetchData }) => {
  const [searchValue, setSearchValue] = useState("");
  const [rows, setRows] = useState(data);


  // useEffect(() => {
  //   setRows(data);
  // }, [data]);


  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    if (event.target.value === "") {
      refetchData();
      setRows(data);
    } else {
      const filteredData = data.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
      setRows(filteredData);
    }
  };

  const tableInstance = useTable({
    columns,
    data: rows,
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows: tableRows,
    prepareRow,
  } = tableInstance;

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Flex justifyContent="space-between" alignItems="center" w="100%">
            <Text fontSize="lg" color="#fff" fontWeight="bold" flex="1">
              {title}
            </Text>
            <InputGroup w="100%" flex="2">
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={handleSearch}
                color="white"
                borderColor="gray.300"
                _placeholder={{ color: "gray.300" }}
              />
            </InputGroup>
            <Button colorScheme="teal" onClick={onAdd} flex="1" ml={8}>
              Add New
            </Button>
          </Flex>
        </CardHeader>
        <CardBody>
          <Box sx={{ width: "100%" }}>
            <table
              {...getTableProps()}
              style={{ width: "100%", borderCollapse: "collapse" }}
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        style={{
                          borderBottom: "solid 3px teal",
                          background: "#374151",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {tableRows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      onClick={() => onSelect(row.original)}
                      style={{
                        cursor: "pointer",
                        borderBottom: "1px solid #e5e4a5",
                      }}
                    >
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            style={{
                              padding: "10px",
                              textAlign: "left",
                              verticalAlign: "middle",
                            }}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Box>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default DataTable;
