import React, { useState, useEffect } from "react";
import Button from "../../components/UI/Button/Button";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import classes from "../../components/category/FieldView.module.css";
import Aux from "../../hoc/Aux/aux";

const ViewCategory = (props) => {
  return (
    <Aux>
      <section className={classes.FieldData}>
        <h4>Fetched Categories</h4>
        <Table>
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>Category Id</Th>
              <Th>Category Name</Th>
              <Th>Parent Id</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.passedCategories.map((category, count) => (
              <Tr key={category.id}>
                <Td>{count + 1}</Td>
                <Td>{category.id}</Td>
                <Td>{category.categoryName}</Td>
                <Td>{category.parentId}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </section>
    </Aux>
  );
};

export default ViewCategory;
